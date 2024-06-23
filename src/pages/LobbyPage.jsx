import { useContext, useEffect } from "react";
import { RoomContext } from "../utilComponents/RoomDataProvider";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { useNavigate, useParams } from "../../node_modules/react-router-dom/dist/index";

const LobbyPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const { players, thisPID } = useContext(RoomContext);

    const { data, send } = useContext(WebsocketContext);

    useEffect(() => {
        if (data?.type === "start-countdown"){
            navigate(`/game/${id}/play`);
        }
    }, [data])

    const thisPlayer = players.find(player => player.pId === thisPID);

    const onStartGameClick = () => {
        send('{"type": "start-game"}');
    }

    return <div>
        lobbyPage
        {players.map(player => <div key={player.pId}>id: {player.pId} name: {player.name} {player.isLeadPlayer && "🎖️"}, {player.pId == thisPID && "YOU"}</div>)}
        <br/>
        {thisPlayer?.isLeadPlayer && <button onClick={onStartGameClick}>Start game</button>}
    </div>
}

export default LobbyPage;