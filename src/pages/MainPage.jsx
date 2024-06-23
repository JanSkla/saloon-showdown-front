import { useContext, useEffect, useRef } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";

const MainPage = () => {
    const navigate = useNavigate();

    const { isOpen, data, send, open } = useContext(WebsocketContext);

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
        if (data?.type === "create-room" || data?.type === "join-room"){
            navigate("game/" + data?.code)
        }
    }, [data])

    const codeInputRef = useRef();

    return <>
        main page
        <button disabled={!!isOpen} onClick={onCreateClick}>create</button>
        <button disabled={!!isOpen} onClick={onJoinClick}>join</button>
        <input type="text" ref={codeInputRef}></input>
    </>
}

export default MainPage;