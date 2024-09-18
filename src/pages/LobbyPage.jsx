import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate, useParams } from "../../node_modules/react-router-dom/dist/index";
import { Button } from "../components/Button";
import SaloonCanvas from "../components/SaloonCanvas";
import { FadeContext } from "../utilComponents/FadeScreenProvider";
import { BackButton } from "../components/BackButton";

const LobbyPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const { players, thisPID, roomCode } = useContext(RoomContext);

    const { data, send } = useContext(WebsocketContext);

    useEffect(() => {
        if (data?.type === "load-game"){
            setOpacityThenCall(0 , () => navigate(`/game/play`));
        }
    }, [data])

    const thisPlayer = players.find(player => player.pId === thisPID);

    const {setOpacityThenCall} = useContext(FadeContext);

    const onStartGameClick = () => {
        setOpacityThenCall(0 , () => send('{"type": "start-game"}'));
    }


    const [codeVisible, setCodeVisible] = useState(false)

    return <div>
        <div className="full-screen" style={{position: "absolute"}}>
        <SaloonCanvas/>
            <div style={{position: "absolute", top: 0, left:40}}>
        <BackButton willSetOpacity onClick={()=>navigate("/")}/>
        </div>
            <div style={{position: "absolute", bottom: 0, left: '5vw'}}>
                <div style={{color: 'white', marginBottom: -10, fontSize: '3vh'}}>click code to copy link:</div>
                <Button onClick={() => navigator.clipboard.writeText("http://localhost:3000/game/" + roomCode)} style={{ width: 400 }}>{codeVisible ? roomCode: 'XXXX'}</Button>
                <div style={{backgroundColor: codeVisible ? "green" : "red", width: 'min-content', whiteSpace: 'nowrap', marginLeft: '50%' ,transform: 'translate(-50%, -80%)', fontSize: '3vh'}}><Button style={{fontSize: '3vh'}} onClick={() => setCodeVisible(!codeVisible)}>{codeVisible ? "hide code" : "show code"}</Button></div>
            </div>
            {thisPlayer?.isLeadPlayer ? <Button onClick={onStartGameClick} style={{position: "absolute", bottom: '5vh', right: '5vw'}}>Start game</Button>:
                <div style={{position: "absolute", bottom: 24, right: '5vw', color: 'white', textShadow: '1px 1px 4px #282c34'}}>Waiting for SHERIFF to start the game...</div>}
        </div>
    </div>
}

export default LobbyPage;