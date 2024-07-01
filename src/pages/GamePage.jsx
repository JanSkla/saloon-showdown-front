import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { Button } from "../components/Button";
import GameCanvas from "../components/GameCanvas";

const GamePage = () => {
    const { data, send } = useContext(WebsocketContext);
    const { players, thisPID } = useContext(RoomContext);

    const thisPlayer = players.find(player => player.pId === thisPID);

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
        if (data?.type === "start-countdown"){
            setLogs([]);
        }
        setLogs([JSON.stringify(data), ...logs])
    }, [data])
    const [target, setTarget] = useState([]);

    const sendChoice = (choice) => {
        if (choice === "shoot"){
            send(JSON.stringify({"type": "choose-card", "choice": choice, "target": target}))
            return;
        }
        send(JSON.stringify({"type": "choose-card", "choice": choice}))
    }

    const playAgain = () => {
        setLogs([]);
        setGameState("loading");
        send('{"type": "start-game"}');
    }

    return <div>
        <div className="canvas-container">
            <GameCanvas />
        </div>
        {options.map((option, index) => <>
            {option === "shoot" &&
                <select value={target} onChange={e => setTarget(e.target.value)}>
                    <option value="" disabled>Select a target</option>
                    {players.filter(player => player.pId !== thisPID).map(player => <option key={player.pId} value={player.pId}>{player.pId} - {player.name}</option>)}
                </select>
            }
            <Button key={index} onClick={() => sendChoice(option)}>{option}</Button>
        </>)}
        <br/>
        game page
        <br/>
        game state: {gameState}
        <br/>
        logs:
        <br/>
        {logs.map((log, index) => <div key={index}>{log}</div>)}
        {gameState === "game-over" && thisPlayer?.isLeadPlayer && <Button onClick={playAgain}>play again</Button>}
    </div>
}

export default GamePage;