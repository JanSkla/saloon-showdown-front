import React, { useContext, useEffect, useRef, useState } from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import { WebsocketContext } from '../utilComponents/WebsocketProvider';
import { RoomContext } from '../utilComponents/RoomDataProvider';
import Sound from './Sound';
import { Canvas } from '@react-three/fiber';

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
const POV_SOUNDS = [
  undefined,
  "/sounds/reload-self.mp3",
  "/sounds/shield.wav",
  "/sounds/shot-shield.wav",
  "/sounds/shooting-player.wav",
  "/sounds/drink-self.wav",
  "/sounds/drink-self-shot.wav",
  "/sounds/whistle.wav",

]

const POVCanvas = () => {

  const { data } = useContext(WebsocketContext);
  const { thisPID } = useContext(RoomContext);
  
  const [variant, setVariant] = useState(POV.none);
  const [soundVariant, setSoundVariant] = useState(POV_SOUNDS.none)

  const spritesheetRef = useRef(new Array(POV_SPRITE_SHEETS.length + 1));
  const soundsRef = useRef(new Array(POV_SOUNDS.length))

  const audio = new Audio(POV_SOUNDS[variant])

  const ammoCountRef = useRef(0);

  const playVariant = type => {
    setVariant(type);
  };

  useEffect(()=> {
    if(spritesheetRef.current[variant] === undefined) return;
    if(variant === POV.ammo){
      spritesheetRef.current[POV.ammo].goToAndPlay(1);
      if(ammoCountRef.current > 1){
        setTimeout(() => {
          spritesheetRef.current[8].setEndAt((ammoCountRef.current - 1) * 11);
          spritesheetRef.current[8].goToAndPlay(2 + (ammoCountRef.current - 2) * 11);
          setTimeout(() => {
            spritesheetRef.current[8].goToAndPause('0');
          }, 1000/12*11);
        }, 1000/12*2);
      }
      return;
    }
    spritesheetRef.current[variant].goToAndPlay(1);
  }, [variant])
  
  useEffect(()=> {
    if(POV_SOUNDS[variant]){   audio.play()}
  }, [variant])
  
  useEffect(() => {
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
              playVariant(POV.blockShoot);
              return;
          }
        }
        else if(action.user == thisPID){
          switch (action.type) {
            case "ammo":
              ammoCountRef.current++;
              playVariant(POV.ammo);
              break;
            case "block":
              playVariant(POV.block);
              break;
            case "shoot-damage":
            case "shoot-death":
            case "shoot-block":
              ammoCountRef.current--;
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
  
  return <div className='full-screen' style={{ position: "absolute", pointerEvents: "none"}}>
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
      style={{position: 'absolute', bottom: 0, left: '50%',transform: 'translate(-50%)', width: '99%', height: 675}}
    />)}
    <Spritesheet
    key={"reload_variants"}
    getInstance={spritesheet => {
      spritesheetRef.current[8] = spritesheet;
    }}
    autoplay={false}
    image={"/images/cowboy/pov/reload_variants-Sheet.png"}
    heightFrame={900}
    widthFrame={1600}
    fps={12}
    style={{position: 'absolute', bottom: 0, left: '50%',transform: 'translate(-50%)', width: '99%', height: 675}}
  />
    </div>
{/* { POV_SOUNDS[variant] &&   <mesh>
      <Canvas>
      <Sound url={POV_SOUNDS[variant]} isPlayer={true}/>
      </Canvas>
    </mesh>} */}
  </div>
}

export default POVCanvas;