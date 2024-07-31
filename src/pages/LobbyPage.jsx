import { useContext, useEffect } from "react";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate, useParams } from "../../node_modules/react-router-dom/dist/index";
import { Button } from "../components/Button";
import SaloonCanvas from "../components/SaloonCanvas";

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

    const onStartGameClick = () => {
        send('{"type": "start-game"}');
    }

    return <div>
        <div className="full-screen" style={{position: "absolute"}}>
        <SaloonCanvas/>
            <div style={{position: "absolute", top: 0, left:40}}>
        <Button onClick={()=>navigate("/")}>{"<"}</Button>
        </div>
            {thisPlayer?.isLeadPlayer && <Button onClick={onStartGameClick} style={{position: "absolute", bottom: 3}}>Start game</Button>}

        </div>
    </div>
}

export default LobbyPage;