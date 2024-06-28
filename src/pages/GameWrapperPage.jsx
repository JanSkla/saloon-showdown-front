import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams, useSearchParams } from "../../node_modules/react-router-dom/dist/index";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";

const GameWrapperPage = () =>{

    const navigate = useNavigate();
    const {id} = useParams();

    const { exists } = useContext(WebsocketContext);

    const { setRoomCode } = useContext(RoomContext);

    
    useEffect(() => {
        if (exists) return;
        
        if(id.length == 4) setRoomCode(id);
            
        navigate("/");
    })

    return <>
        game wrapper page
        <Outlet />
    </>
}

export default GameWrapperPage;