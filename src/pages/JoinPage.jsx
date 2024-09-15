import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate, useOutletContext } from "react-router-dom";
import { WaitToLoad } from "../utils/waitToLoad";
import { BackButton } from "../components/BackButton";
import { FadeContext } from "../utilComponents/FadeScreenProvider";

const JoinPage = () => {
  const { isOpen, data, send, open } = useContext(WebsocketContext);
  
  const { roomCode, setRoomCode } = useContext(RoomContext);
  const { setOpacity, setOpacityThenCall } = useContext(FadeContext);

  const [name, setName] = useOutletContext();
  const navigate = useNavigate();
  
  const [hasSearched, setHasSearched] = useState(false);
  const [publicLobbies, setPublicLobies] = useState([]);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    console.log('AA')
    if (joining && (data?.type === "join-room") && data?.status === 200){
      setRoomCode(data?.code);
      setOpacityThenCall(0, () => navigate("/game"));
    }
    if ((data?.type === "public-lobbies")){
      setPublicLobies(data?.lobbies);
    }
  }, [data])

  const onJoinClick = () => {

    const code = codeInputRef?.current?.value;

    if(code){
      joinWithCode(code);
    }
  }

  const joinWithCode = code => {
    if(!isOpen && open) open();
    setJoining(true);
    send(`{"type": "join-room"${name ? `, "name": "${name}"` : ""}, "code": "${code}"}`);
  }

  const onLobbySearch = () => {
    if(open) open();
    setHasSearched(true);
    send(`{"type": "get-public-lobbies"}`);
  }

  const codeInputRef = useRef();
  return <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "25vh", backgroundColor: 'black', height: '75vh', opacity: 0.9}}>
    <WaitToLoad/>
    <div style={{position: "absolute", top: 0, left:40}}>
        <BackButton willSetOpacity onClick={()=>navigate("/")}/>
    </div>
    <Button disabled={!!isOpen} onClick={onJoinClick}>join</Button>
    <span>room code:</span>
    <input type="text" ref={codeInputRef} defaultValue={roomCode} autoFocus onBlur={e => e.target.focus()} maxLength={4} style={{textTransform: "uppercase", fontSize: "20vh", width: "60vh"}}></input>
    
    <Button onClick={onLobbySearch} style={{fontSize: '5vh'}}>{hasSearched ? "refresh lobby search" : "find public lobbies"}</Button>
    {publicLobbies[0] === undefined && hasSearched && <div style={{color: "white"}}>NO PUBLIC LOBBIES</div>}
    {publicLobbies.map(lobby => <Button style={{fontSize: '3vh', fontFamily: 'auto' }} onClick={() => joinWithCode(lobby.roomCode)}>{lobby.roomCode}, players: {lobby.playerCount}</Button>)}
  </div>
}

export default JoinPage