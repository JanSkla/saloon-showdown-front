import { useContext, useEffect, useRef, useState } from "react"
import { WebsocketContext } from "../utilComponents/WebsocketProvider"
import { MAX_HEALTH } from "./models/Player";
import { RoomContext } from "../utilComponents/RoomDataProvider";

export const ThisPlayerHealth = () => {

  const { data } = useContext(WebsocketContext);
  const { thisPID } = useContext(RoomContext);

  const [health, _setHealth] = useState(MAX_HEALTH);

  const healthRef = useRef(MAX_HEALTH);

  const setHealth = newVal => {
    healthRef.current = newVal;
    _setHealth(newVal);
  }

  useEffect(() => {
    if(data?.type === "start-countdown"){
      setHealth(MAX_HEALTH);
    }
    else if(data?.type === "round-actions" && data?.data){

      const sdb = data.data.find(action => action.type == "shoot-drinking-beer" && action.target == thisPID);
      if(sdb){
        console.log("AA", healthRef.current-1)
          
          const timeoutId = setTimeout(() => {
            console.log("AAa", healthRef.current)
            setHealth(healthRef.current + 1);
          }, 1000);
      }

      let tempHealth = healthRef.current;

      data.data.forEach(action => {
        if(action.user == thisPID && !sdb){
          switch (action.type) {
            case "finished-beer":
              tempHealth += 1;
              break;
          }
        }
        else if(action.target == thisPID){
          
          switch (action.type) {
            case "shoot-drinking-beer":
              tempHealth  -= 1;
              console.log("HAHAA",tempHealth)
              break;
            case "shoot-damage":
              tempHealth = action.targetHealth;
              break;
            case "shoot-death":
              tempHealth = 0;
          }
        }
      })
      console.log(healthRef.current, tempHealth, 'tempHealth')
      setHealth(tempHealth);
    }
  }, [data]);

  return <div>
    {Array.from({ length: health }, (_, i) => i).map(el => (
        <img key={el} height={80} src="/images/heart.png"/>
    ))}
  </div>
}