import { useContext, useEffect, useRef, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate, useOutletContext } from "../../node_modules/react-router-dom/dist/index";
import { Button } from "../components/Button";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import MainPageCanvas from "../components/MainPageCanvas";

const MAX_NAME_LENGTH = 16;

const MainPage = () => {
    const navigate = useNavigate();

    const { isOpen, data, send, open, close } = useContext(WebsocketContext);
    const { roomCode } = useContext(RoomContext);


    const [name, setName] = useOutletContext();

    const isMountingRef = useRef(false);

    const changeName = (value) => {

        if (value.length > MAX_NAME_LENGTH) return;

        setName(value);
    }

    const onCreateClick = () => {
        
        if(open) open();
        send(`{"type": "create-room"${name ? `, "name": "${name}"` : ""}}`);
    }

    const onJoinClick = () => {
        navigate("join")
    }

    useEffect(() => {
        if (isOpen) close()
        isMountingRef.current = true;
      }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            if ((data?.type === "create-room" || data?.type === "join-room") && data?.status === 200){
                navigate("game/" + data?.code)
            }
        } else {
        isMountingRef.current = false;
    }
    }, [data])

    const codeInputRef = useRef();

    return <div className="canvas-container" style={{justifyContent: "end"}}>
        <MainPageCanvas/>
        <div style={{position: "absolute", display: "flex", flexDirection: "column", right: 100, top: 100, alignItems: "center"}}>
            <span>name:</span>
            <input type="text" ref={codeInputRef} value={name} onChange={e => changeName(e.target.value)}></input><br/><br/>
            <Button disabled={!!isOpen} onClick={onCreateClick}>create</Button>
            <Button disabled={!!isOpen} onClick={onJoinClick}>join</Button>
        </div>
    </div>
}

export default MainPage;