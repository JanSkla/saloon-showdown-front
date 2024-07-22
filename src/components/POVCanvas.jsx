import React, { useContext, useEffect, useState } from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import { WebsocketContext } from '../utilComponents/WebsocketProvider';
import { RoomContext } from '../utilComponents/RoomDataProvider';

export const POV = {
  none: 0,
  ammo: 1,
  block: 2,
  blockShoot: 3,
  shoot: 4,
  drinkBeer: 5,
  shootBeer: 6,
  orderBeer: 7
}

const POV_SPRITE_SHEETS = [
  undefined,
  "/images/cowboy/pov/reload-Sheet.png",
  "/images/cowboy/pov/block-Sheet.png",
  undefined,
  "/images/cowboy/pov/shoot-Sheet.png",
  "/images/cowboy/pov/drink-Sheet.png",
  "/images/cowboy/pov/drink_break-Sheet.png",
  undefined,
]

const POVCanvas = () => {

  const { data } = useContext(WebsocketContext);
  const { thisPID } = useContext(RoomContext);
  
  const [variant, setVariant] = useState(POV_SPRITE_SHEETS[POV.none]);

  const playVariant = type => setVariant(POV_SPRITE_SHEETS[type]);
  
  useEffect(() => {
    if(data?.type === "choose"){
      playVariant(POV.none);
    }
    else if(data?.type === "round-actions" && data?.data){
      data.data.forEach(action => {
        if(action.user == thisPID){
          switch (action.type) {
            case "ammo":
              playVariant(POV.ammo);
              break;
            case "block":
              playVariant(POV.block);
              break;
            case "shoot-damage":
            case "shoot-death":
            case "shoot-block":
              playVariant(POV.shoot);
              break;
            case "finished-beer":
              playVariant(POV.drinkBeer);
              break;
          }
        }
        else if(action.target == thisPID){
          
          switch (action.type) {
            case "shoot-drinking-beer":
              playVariant(POV.shootBeer);
              break;
          }
        }
      })
    }
  }, [data]);
  
  return <div style={{width: '100vw', height: '80vh', position: "absolute", pointerEvents: "none"}}>
    <div style={{position: 'relative', height: '100%'}}>
    {variant && <Spritesheet
      image={variant}
      heightFrame={900}
      widthFrame={1600}
      steps={28}
      fps={12}
      style={{position: 'absolute', bottom: 0, left: '50%',transform: 'translate(-50%)', width: 1200, height: 675}}
    />
    }
    </div>
  </div>
}

export default POVCanvas;