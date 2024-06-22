import { useContext } from "react";
import { RoomContext } from "../utilComponents/RoomDataProvider";

const LobbyPage = () => {

    const { players, thisPID } = useContext(RoomContext);

    const thisPlayer = players.find(player => player.pId == thisPID);

    const onStartGameClick = () => {
        
    }

    return <div>
        lobbyPage
        {players.map(player => <div key={player.pId}>id: {player.pId} name: {player.name} {player.isLeadPlayer && "🎖️"}, {player.pId == thisPID && "YOU"}</div>)}
        <br/>
        {thisPlayer.isLeadPlayer && <button onClick={onStartGameClick}>Start game</button>}
    </div>
}

export default LobbyPage;