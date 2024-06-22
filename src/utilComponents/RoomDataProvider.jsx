import React, { createContext, useState, useContext, useEffect } from 'react';
import { WebsocketContext } from './WebsocketProvider';

export const RoomContext = createContext();

export const RoomDataProvider = ({ children }) => {

  const [isOpen, data, send, open, close] = useContext(WebsocketContext);

  const [ players, setPlayers ] = useState([]);

  useEffect(() => {
    if (data?.type === "create-room" || data?.type === "join-room"){
      setPlayers(data?.players);
      console.log("room players loaded", data?.players)
    }
    else if(data?.type === "player-join" && data?.player){
      const updatedPlayers = [...players, data?.player];
      setPlayers(updatedPlayers);
      console.log("player joined", updatedPlayers)
    }
    else if(data?.type === "player-disconnect" && data?.player){
      const updatedPlayers = players.filter(player => player.id !== data?.player);

      setPlayers(updatedPlayers);
      console.log("player disconnected", updatedPlayers)
    }
  }, [data]);

  return (
    <RoomContext.Provider value={{ players, setPlayers }}>
      {children}
    </RoomContext.Provider>
  );
};