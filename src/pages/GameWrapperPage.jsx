import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams, useSearchParams } from "../../node_modules/react-router-dom/dist/index";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";

const GameWrapperPage = () =>{

    const navigate= useNavigate();

    const { exists } = useContext(WebsocketContext);
    const { roomCode }= useContext(RoomContext);

    useEffect(() => {
        if (!roomCode) navigate('/');
    },[]);

    return <>
        {exists && <Outlet />}
    </>
}

export default GameWrapperPage;