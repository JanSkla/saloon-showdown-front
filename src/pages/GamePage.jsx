import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { Button } from "../components/Button";
import GameCanvas from "../components/GameCanvas";
import { ThisPlayerHealth } from "../components/ThisPlayerHealth";

const GamePage = () => {
    const { data, send } = useContext(WebsocketContext);
    const { players, thisPID } = useContext(RoomContext);

    const thisPlayer = players.find(player => player.pId === thisPID);

    const [logs,  setLogs] = useState([]);

    const [options, setOptions] = useState([]);
    
    const [gameState, setGameState] = useState([]);
    
    const [choice, setChoice] = useState();
    
    const [target, setTarget] = useState([]);

    useEffect(() => {
        setLogs([JSON.stringify(data), ...logs])
        if (data?.type === "choose"){
            setOptions(data?.options);
            setGameState(data?.type);
            setChoice();
            setTarget();
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
            //setLogs([]);
        }
    }, [data])

    const sendChoice = (choiceVal) => {
        setChoice(choiceVal)
        if (choiceVal === "shoot"){
            return;
        }
        send(JSON.stringify({"type": "choose-card", "choice": choiceVal}))
    }

    const playAgain = () => {
        //setLogs([]);
        setGameState("loading");
        send('{"type": "start-game"}');
    }

    const chooseTarget = (targetPID) => {
        setTarget(targetPID);
        if(targetPID !== undefined)
            send(JSON.stringify({"type": "choose-card", "choice": "shoot", "target": targetPID}))
        return;
    }
    

    const [loading, setLoading] = useState(true);

    const OnLoaded = () => {
        send(JSON.stringify({"type": "game-loaded"}))
        setLoading(false);
    }

    return <div>
        <div className="canvas-container">
            <GameCanvas chooseTarget={chooseTarget} choosing={choice === "shoot"} target={target} OnLoaded={OnLoaded}/>
            <div style={{background: "black"}}>
                <ThisPlayerHealth />
            </div>
            {loading && "LOADING SCENE..."}
        </div>
        {gameState === "game-over" && thisPlayer?.isLeadPlayer && <Button onClick={playAgain}>play again</Button>}
    
        {options.map((option, index) => <>
            <Button key={index} onClick={() => sendChoice(option)} selected={choice == option}>{option}</Button>
        </>)}
        <br/>
        game page
        <br/>
        game state: {gameState}
        <br/>
        logs:
        <br/>
        {logs.map((log, index) => <div key={index}>{log}</div>)}
    </div>
}

export default GamePage;