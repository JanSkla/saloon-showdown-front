import { useContext, useEffect, useState } from "react"
import { WebsocketContext } from "../utilComponents/WebsocketProvider"
import { MAX_HEALTH } from "./models/Player";
import { RoomContext } from "../utilComponents/RoomDataProvider";

export const ThisPlayerHealth = () => {

  const { data } = useContext(WebsocketContext);
  const { thisPID } = useContext(RoomContext);

  const [health, setHealth] = useState(MAX_HEALTH);

  useEffect(() => {
    if(data?.type === "start-countdown"){
      setHealth(MAX_HEALTH);
    }
    else if(data?.type === "round-actions" && data?.data){
      data.data.forEach(action => {
        if(action.user == thisPID){
          switch (action.type) {
            case "finished-beer":
              setHealth(health + 1);
              break;
          }
        }
        else if(action.target == thisPID){
          
          switch (action.type) {
            case "shoot-damage":
              setHealth(action.targetHealth);
              break;
            case "shoot-death":
              setHealth(0);
          }
        }
      })
    }
  }, [data]);

  return <div>
    {Array.from({ length: health }, (_, i) => i).map(el => (
        <img key={el} src="/images/heart.png"/>
    ))}
  </div>
}