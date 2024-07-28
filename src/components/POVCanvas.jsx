import React, { useContext, useEffect, useRef, useState } from 'react';
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
  "/images/cowboy/pov/block_shoot-Sheet.png",
  "/images/cowboy/pov/shoot-Sheet.png",
  "/images/cowboy/pov/drink-Sheet.png",
  "/images/cowboy/pov/drink_break-Sheet.png",
  "/images/cowboy/pov/order_beer-Sheet.png",
]

const POVCanvas = () => {

  const { data } = useContext(WebsocketContext);
  const { thisPID } = useContext(RoomContext);
  
  const [variant, setVariant] = useState(POV.none);

  const spritesheetRef = useRef(new Array(POV_SPRITE_SHEETS.length));

  const playVariant = type => {
    setVariant(type);
  };

  useEffect(()=> {
    console.log(variant)
    if(spritesheetRef.current[variant] === undefined) return;
    spritesheetRef.current[variant].goToAndPlay(0);
  }, [variant])
  
  useEffect(() => {
    console.log(spritesheetRef)
    if(data?.type === "choose"){
      playVariant(POV.none);
    }
    else if(data?.type === "round-actions" && data?.data){
      data.data.every(action => {
        
        if(action.target == thisPID){
          
          switch (action.type) {
            case "shoot-drinking-beer":
              playVariant(POV.shootBeer);
              return;
            case "shoot-block":
              console.log("aaa")
              playVariant(POV.blockShoot);
              return;
          }
        }
        else if(action.user == thisPID){
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
            case "order-beer":
              playVariant(POV.orderBeer);
              break;
            case "finished-beer":
              playVariant(POV.drinkBeer);
              break;
          }
        }

        return true;
      })
    }
  }, [data]);
  
  return <div style={{width: '100vw', height: '80vh', position: "absolute", pointerEvents: "none"}}>
    <div style={{position: 'relative', height: '100%'}}>
    {POV_SPRITE_SHEETS.map((image, i) => image && <Spritesheet
      key={image}
      getInstance={spritesheet => {
        spritesheetRef.current[i] = spritesheet;
      }}
      autoplay={false}
      image={image}
      heightFrame={900}
      widthFrame={1600}
      steps={28}
      fps={12}
      style={{position: 'absolute', bottom: 0, left: '50%',transform: 'translate(-50%)', width: 1200, height: 675}}
    />)}
    </div>
  </div>
}

export default POVCanvas;