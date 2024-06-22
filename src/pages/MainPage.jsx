import { useContext, useEffect } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";

const MainPage = () => {

    const [isOpen, data, send, open, close] = useContext(WebsocketContext);

    useEffect(() => {
        console.log(open)
        // @ts-ignore
        if(open) open();
    },[])

    useEffect(() => {
        console.log(isOpen)
        // @ts-ignore
        if(isOpen) send('{"type": "create-room"}');
    }, [isOpen]);

    return <>
        main page {isOpen}
    </>
}

export default MainPage;