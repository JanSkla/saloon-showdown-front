import { useContext, useEffect, useRef, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { Button } from "../components/Button";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import MainPageCanvas from "../components/MainPageCanvas";

const MAX_NAME_LENGTH = 16;

const MainPage = () => {
    const navigate = useNavigate();

    const { isOpen, data, send, open } = useContext(WebsocketContext);
    const { roomCode } = useContext(RoomContext);


    const [ name , setName ] = useState();

    const changeName = (value) => {

        if (value.length > MAX_NAME_LENGTH) return;

        setName(value);
    }

    const onCreateClick = () => {
        
        if(open) open();
        send(`{"type": "create-room"${name ? `, "name": "${name}"` : ""}}`);
    }

    const onJoinClick = () => {

        const code = codeInputRef?.current?.value;

        if(!code) console.log("zadej kode pyco");
        else {
        
            if(open) open();
            send(`{"type": "join-room"${name ? `, "name": "${name}"` : ""}, "code": "${code}"}`);
        }
    }

    useEffect(() => {
        if ((data?.type === "create-room" || data?.type === "join-room") && data?.status === 200){
            navigate("game/" + data?.code)
        }
    }, [data])

    const codeInputRef = useRef();

    return <div className="canvas-container" style={{justifyContent: "center"}}>
        <MainPageCanvas/>
        <div style={{position: "absolute", display: "flex", flexDirection: "column"}}>
            main page<br/><br/>
            name <br/>
            <input type="text" ref={codeInputRef} value={name} onChange={e => changeName(e.target.value)}></input><br/>
            <Button disabled={!!isOpen} onClick={onCreateClick}>create</Button><br/><br/>
            <Button disabled={!!isOpen} onClick={onJoinClick}>join</Button><br/><br/>
            <input type="text" ref={codeInputRef} defaultValue={roomCode}></input>
        </div>
    </div>
}

export default MainPage;