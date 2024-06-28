import React, { createContext, useState, useContext, useEffect } from 'react';
import { WebsocketContext } from './WebsocketProvider';

export const RoomContext = createContext();

export const RoomDataProvider = ({ children }) => {

  const { data } = useContext(WebsocketContext);

  const [ players, setPlayers ] = useState([]);
  
  const [ thisPID, setThisPID ] = useState();
  
  const [ roomCode, setRoomCode ] = useState();

  useEffect(() => {
    if ((data?.type === "create-room" || data?.type === "join-room") && data?.status === 200){
      setPlayers(data?.players);
      setThisPID(data?.pId);
      console.log("room players loaded", data?.players)
    }
    else if(data?.type === "player-join"){
      const updatedPlayers = [...players, data?.player];
      setPlayers(updatedPlayers);
      console.log("player joined", updatedPlayers)
    }
    else if(data?.type === "player-disconnect" && data?.player){
      const updatedPlayers = players.filter(player => player.pId !== data?.player);

      setPlayers(updatedPlayers);
      console.log("player disconnected", updatedPlayers)
    }
    else if(data?.type === "new-leader" && data?.player){
      const updatedPlayers = players.map(player => {
        player.isLeadPlayer = player.pId === data?.player;
        return player
      });

      setPlayers(updatedPlayers);
      console.log("player disconnected", updatedPlayers)
    }
  }, [data]);

  return (
    <RoomContext.Provider value={{ players, thisPID, roomCode, setRoomCode }}>
      {children}
    </RoomContext.Provider>
  );
};