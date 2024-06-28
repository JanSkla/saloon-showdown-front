import { useContext, useEffect, useRef } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { Button } from "../components/Button";
import { RoomContext } from "../utilComponents/RoomDataProvider";

const MainPage = () => {
    const navigate = useNavigate();

    const { isOpen, data, send, open } = useContext(WebsocketContext);
    const { roomCode } = useContext(RoomContext);

    const onCreateClick = () => {
        
        if(open) open();
        send('{"type": "create-room"}');
    }

    const onJoinClick = () => {

        const code = codeInputRef?.current?.value;

        if(!code) console.log("zadej kode pyco");
        else {
        
            if(open) open();
            send('{"type": "join-room", "code": "' + code + '"}');
        }
    }

    useEffect(() => {
        if ((data?.type === "create-room" || data?.type === "join-room") && data?.status === 200){
            navigate("game/" + data?.code)
        }
    }, [data])

    const codeInputRef = useRef();

    return <>
        main page
        <Button disabled={!!isOpen} onClick={onCreateClick}>create</Button>
        <button disabled={!!isOpen} onClick={onJoinClick}>join</button>
        <input type="text" ref={codeInputRef} value={roomCode}></input>
    </>
}

export default MainPage;