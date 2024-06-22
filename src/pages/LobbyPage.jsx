import { useContext } from "react";
import { RoomContext } from "../utilComponents/RoomDataProvider";

const LobbyPage = () => {

    const { players, setPlayers } = useContext(RoomContext);

    return <div>
        lobbyPage
        {players.map(player => <div key={player.pId}>id: {player.pId} name: {player.name} {player.isLeadPlayer && "🎖️"}</div>)}
    </div>
}

export default LobbyPage;