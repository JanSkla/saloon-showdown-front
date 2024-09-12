import React, { lazy, useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { Button } from "../components/Button";
//import GameCanvas from "../components/GameCanvas";
import { ThisPlayerHealth } from "../components/ThisPlayerHealth";
import { MiddleCanvasText } from "../components/MiddleCanvasText";
import Timer from "../components/Timer";
import POVCanvas from "../components/POVCanvas";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import Sound from "../components/Sound";
import { BackButton } from "../components/BackButton";
import { FadeContext } from "../utilComponents/FadeScreenProvider";
import { WaitToLoad } from "../utils/waitToLoad";

const LazyPOVCanvas = lazy(() => import("../components/POVCanvas"))

const LazyGameCanvas = lazy(() => import("../components/GameCanvas"))

const GamePage = () => {
    const { data, send } = useContext(WebsocketContext);
    const { players, thisPID } = useContext(RoomContext);
    const { setOpacityThenCall } = useContext(FadeContext);

    const thisPlayer = players.find(player => player.pId === thisPID);

    const [logs,  setLogs] = useState([]);

    const [options, setOptions] = useState([]);
    
    const [gameState, setGameState] = useState([]);
    
    const [choice, setChoice] = useState();
    
    const [target, setTarget] = useState([]);
    
    const [middleCanvasText, setMiddleCanvasText] = useState();

    const [timer, setTimer] = useState({duration: 0});

    const [death, setDeath] = useState(false);

    const [play, setPlay] = useState(false);

    const startCountdown = () => {
        audio.play();
        setMiddleCanvasText(<span style={{fontSize: '8vh'}}>3</span>);
        setTimeout(() => setMiddleCanvasText(<span style={{fontSize: '10vh'}}>2</span>), 1000);
        setTimeout(() => setMiddleCanvasText(<span style={{fontSize: '20vh'}}>1</span>), 2000);
        setTimeout(() => setMiddleCanvasText(<span style={{fontFamily: "Bevan", fontSize: '20vh', fontWeight: 400}}>SHOWDOWN!</span>), 3000);
        setTimeout(() => setMiddleCanvasText(), 4000);
    }

    const audio = new Audio("/sounds/countdown.wav");

    useEffect(() => {
        setLogs([JSON.stringify(data), ...logs])
        if (data?.type === "choose"){
            setTimer({duration: data?.time})
            setMiddleCanvasText();
            setOptions(data?.options);
            setGameState(data?.type);
            setChoice();
            setTarget(); 
        }
        else if (data?.type === "stop-choice"){
            setTimer({duration: data?.time})
            setOptions([]);
            setGameState(data?.type);
        }
        else if (data?.type === "processing"){
            setTimer({duration: data?.time})
            setGameState(data?.type);
        }
        else if (data?.type === "game-over"){
            setMiddleCanvasText(data?.winner != undefined ? `WINNER IS ${players.find(player => player.pId === data.winner).name}!!` : "DRAW")
            setGameState(data?.type);
        }
        else if (data?.type === "start-countdown"){
            startCountdown();
            //setLogs([]);
        }
        else if(data?.type === "round-actions" && data?.data){
            data.data.forEach(action => {
                if(action.target == thisPID){
                  switch (action.type) {
                    case "shoot-death":
                      setDeath(true);
                      break;
                  }
                }
            }
        )
        }
        else if(data?.type === "load-game"){
            setGameState("loading");
            setMiddleCanvasText('');
            setDeath(false);
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
        setMiddleCanvasText('');
        send('{"type": "start-game"}');
        setDeath(false);
        setPlay(false)
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

    const navigate = useNavigate();

    const [leaving, setLeaving] = useState(false);
    

    return <div>
        <div className="canvas-container">
            <WaitToLoad/>
            <LazyGameCanvas chooseTarget={chooseTarget} choosing={choice === "shoot"} target={target} cardOptions={options} sendChoice={sendChoice} gameState={gameState} OnLoaded={OnLoaded}/>
            <LazyPOVCanvas/>
            <div className="full-screen" style={{position: "absolute", display: 'flex', flexDirection: "column", justifyContent: "end", pointerEvents: "none"}}>
                <div style={{width: '1.5vw', height: '40vh', alignSelf: 'end', marginRight: '1vw'}}>
                    {timer?.duration !== undefined && <Timer timer={timer}/>}
                </div>
                <ThisPlayerHealth />
            </div>
            {death && <MiddleCanvasText className="deathScreen">
            </MiddleCanvasText>}
            <MiddleCanvasText>
                {death && gameState == "game-over" && <div>
                        <span className="bevan" style={{fontSize: '8vh', color: 'red', textShadow: 'none'}}>WASTED</span>
                        <img height={60} src="/images/exp_death.png"/>
                    </div>}
                {middleCanvasText}
                {gameState === "game-over" && thisPlayer?.isLeadPlayer && <div style={{pointerEvents: 'all'}}><Button onClick={playAgain}>play again</Button></div>}
            </MiddleCanvasText>
            <div style={{position: "absolute", top: 0, left:40}}>
                <BackButton onClick={()=>setLeaving(true)}/>
            </div>
            {leaving &&
            <MiddleCanvasText pointerEvents style={{backgroundColor: '#000000aa'}}>
                <div style={{display: "flex", flexDirection: "column", backgroundColor: "black", alignItems: "center", paddingTop: 25, paddingBottom: 8}}>
                    <div>Do you really want to leave the game?</div>
                    <div>
                        <Button red style={{ marginRight: 30, marginTop: 20}} onClick={()=>setOpacityThenCall(0,() => navigate("/"))}>LEAVE</Button>
                        <Button style={{}} onClick={()=>setLeaving(false)}>CANCEL</Button>
                    </div>
                </div>
            </MiddleCanvasText>}
        </div>
    </div>
}

export default GamePage;