import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";

const GamePage = () => {
    const { data, send } = useContext(WebsocketContext);
    const { players, thisPID } = useContext(RoomContext);

    const [logs,  setLogs] = useState([]);

    const [options, setOptions] = useState([]);
    
    const [gameState, setGameState] = useState([]);

    useEffect(() => {
        if (data?.type === "choose"){
            setOptions(data?.options);
            setGameState(data?.type);
        }
        else if (data?.type === "stop-choice"){
            setOptions([]);
            setGameState(data?.type);
        }
        else if (data?.type === "processing"){
            setGameState(data?.type);
        }
        else if (data?.type === "game-over"){
            setGameState(data?.type);
        }
        setLogs([...logs, JSON.stringify(data)])
    }, [data])

    const sendChoice = (choice) => {
        if (choice == "shoot"){
            console.log("shotting has not been implemented yet :]");
            return;
        }
        send(JSON.stringify({"type": "choose-card", "choice": choice}))
    }

    const playAgain = () => {
        setGameState("loading");
        send('{"type": "start-game"}');
    }

    return <div>
        game page
        <br/>
        game state: {gameState}
        <br/>
        {options.map((option, index) => <button key={index} onClick={() => sendChoice(option)}>{option}</button>)}
        <br/>
        logs:
        <br/>
        {logs.map((log, index) => <div key={index}>{log}</div>)}
        {gameState === "game-over" && players.find(player => player.pId === thisPID).isLeadPlayer && <button onClick={playAgain}>play again</button>}
    </div>
}

export default GamePage;