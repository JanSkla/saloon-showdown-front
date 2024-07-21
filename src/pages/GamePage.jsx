import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { Button } from "../components/Button";
import GameCanvas from "../components/GameCanvas";
import { ThisPlayerHealth } from "../components/ThisPlayerHealth";
import { MiddleCanvasText } from "../components/MiddleCanvasText";

const GamePage = () => {
    const { data, send } = useContext(WebsocketContext);
    const { players, thisPID } = useContext(RoomContext);

    const thisPlayer = players.find(player => player.pId === thisPID);

    const [logs,  setLogs] = useState([]);

    const [options, setOptions] = useState([]);
    
    const [gameState, setGameState] = useState([]);
    
    const [choice, setChoice] = useState();
    
    const [target, setTarget] = useState([]);
    
    const [middleCanvasText, setMiddleCanvasText] = useState();

    const startCountdown = () => {
        setMiddleCanvasText(3)
        setTimeout(() => setMiddleCanvasText(2), 1000)
        setTimeout(() => setMiddleCanvasText(1), 2000)
        setTimeout(() => setMiddleCanvasText(), 3000)
    }

    useEffect(() => {
        setLogs([JSON.stringify(data), ...logs])
        if (data?.type === "choose"){
            setMiddleCanvasText();
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
            setMiddleCanvasText(data?.winner != undefined ? `WINNER IS ${players.find(player => player.pId === data.winner).name}!!` : "DRAW")
            setGameState(data?.type);
        }
        if (data?.type === "start-countdown"){
            startCountdown();
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
            <GameCanvas chooseTarget={chooseTarget} choosing={choice === "shoot"} target={target} OnLoaded={OnLoaded} cardOptions={options} sendChoice={sendChoice} gameState={gameState}/>
            <div style={{width: '100vw', height: '70vh', position: "absolute", alignContent: "flex-end", pointerEvents: "none"}}>
                <ThisPlayerHealth />
            </div>
            <MiddleCanvasText>{middleCanvasText}</MiddleCanvasText>
            {loading && "LOADING SCENE..."}
        </div>
        {gameState === "game-over" && thisPlayer?.isLeadPlayer && <Button onClick={playAgain}>play again</Button>}
    
        <br/>
        game page
        <br/>
        game state: {gameState}
        {/* <br/>
        logs:
        <br/>
        {logs.map((log, index) => <div key={index}>{log}</div>)} */}
    </div>
}

export default GamePage;