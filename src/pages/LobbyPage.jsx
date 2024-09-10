import { useContext, useEffect } from "react";
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

    const { players, thisPID } = useContext(RoomContext);

    const { data, send } = useContext(WebsocketContext);

    useEffect(() => {
        if (data?.type === "load-game"){
            navigate(`/game/${id}/play`);
        }
    }, [data])

    const thisPlayer = players.find(player => player.pId === thisPID);

    const {setOpacityThenCall} = useContext(FadeContext);

    const onStartGameClick = () => {
        setOpacityThenCall(0 , () => send('{"type": "start-game"}'));
    }

    return <div>
        <div className="full-screen" style={{position: "absolute"}}>
        <SaloonCanvas/>
            <div style={{position: "absolute", top: 0, left:40}}>
        <BackButton willSetOpacity onClick={()=>navigate("/")}/>
        </div>
            {thisPlayer?.isLeadPlayer ? <Button onClick={onStartGameClick} style={{position: "absolute", bottom: 3}}>Start game</Button>:
                <div style={{position: "absolute", bottom: 24, right: 40, color: 'white', textShadow: '1px 1px 4px #282c34'}}>Waiting for SHERIFF to start the game...</div>}
        </div>
    </div>
}

export default LobbyPage;