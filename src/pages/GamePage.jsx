import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";

const GamePage = () => {
    const { data, send } = useContext(WebsocketContext);

    const [logs,  setLogs] = useState([]);

    useEffect(() => {
        if (data?.type === "start-countdown"){
        }
        setLogs([...logs, JSON.stringify(data)])
    }, [data])

    return <div>
        game page
        <br/>
        logs:
        <br/>
        {logs.map((log, index) => <div key={index}>{log}</div>)}
    </div>
}

export default GamePage;