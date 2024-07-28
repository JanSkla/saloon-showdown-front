import { useContext, useEffect, useRef } from "react";
import { Button } from "../components/Button";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate, useOutletContext } from "react-router-dom";

const JoinPage = () => {
  const { isOpen, data, send, open } = useContext(WebsocketContext);
  
  const { roomCode } = useContext(RoomContext);

  const [name, setName] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
      if ((data?.type === "create-room" || data?.type === "join-room") && data?.status === 200){
          navigate("/game/" + data?.code)
      }
  }, [data])

  const onJoinClick = () => {

    const code = codeInputRef?.current?.value;

    if(!code) console.log("zadej kode pyco");
    else {
    
        if(open) open();
        send(`{"type": "join-room"${name ? `, "name": "${name}"` : ""}, "code": "${code}"}`);
    }
  }

  const codeInputRef = useRef();
  return <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "25vh"}}>
    <Button disabled={!!isOpen} onClick={onJoinClick}>join</Button>
    <span>room code:</span>
    <input type="text" ref={codeInputRef} defaultValue={roomCode} autoFocus onBlur={e => e.target.focus()} maxLength={4} style={{textTransform: "uppercase", fontSize: "20vh", width: "60vh"}}></input>
  </div>
}

export default JoinPage