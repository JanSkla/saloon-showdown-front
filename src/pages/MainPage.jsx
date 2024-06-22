import { useContext, useEffect, useRef } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";

const MainPage = () => {

    const [isOpen, data, send, open, close] = useContext(WebsocketContext);

    const onCreateClick = () => {
        
        // @ts-ignore
        if(open) open();
        // @ts-ignore
        send('{"type": "create-room"}');
    }

    const onJoinClick = () => {

        // @ts-ignore
        const code = codeInputRef?.current?.value;

        if(!code) console.log("zadej kode pyco");
        else {
        
            // @ts-ignore
            if(open) open();
            // @ts-ignore
            send('{"type": "join-room", "code": "' + code + '"}');
        }
    }

    const codeInputRef = useRef();

    return <>
        main page
        <button disabled={!!isOpen} onClick={onCreateClick}>create</button>
        <button disabled={!!isOpen} onClick={onJoinClick}>join</button>
        <input type="text" ref={codeInputRef}></input>
    </>
}

export default MainPage;