import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";

const CodeRedirectPage = () =>{

    const navigate = useNavigate();
    const {id} = useParams();

    const { exists } = useContext(WebsocketContext);

    const { setRoomCode } = useContext(RoomContext);

    
    useEffect(() => {
        if (exists) return;
        
        if(id.length == 4) setRoomCode(id);
            
        navigate("/join");
    }, [])

    return <>
        {exists && <Outlet />}
    </>
}

export default CodeRedirectPage;