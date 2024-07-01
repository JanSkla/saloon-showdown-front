import * as THREE from 'three';
import { useContext, useEffect, useRef, useState } from "react";
import { useLoader } from '@react-three/fiber';
import { WebsocketContext } from '../../utilComponents/WebsocketProvider';

export const PLAYER = {
  cards: 0,
  playCard: 1,
  ammo: 2,
  block: 3,
  shoot: 4,
  drinkBeer: 5,
  shootBeer: 6,
  orderBeer: 7,
  idle: 8,
  shootBeer2: 9,
};

export default function Player({pId, position}) {

  const textureLocation = '/images/cowboy/';
  const defaultTexture = useLoader(THREE.TextureLoader, textureLocation + 'cowboy_cards.png');

  const variants = [
    {main: defaultTexture, top: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_cards_hand.png')},
    {main: defaultTexture, top: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_play_card_hand.png')},
    {main: defaultTexture, top: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_ammo_hand.png')},
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_block.png'), top: undefined},
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_hands_down.png'), top: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_shoot_hand.png')},
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_drink_beer0.png'), top: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_drink_beer0_hand.png')},
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_drink_beer1_shoot.png'), top: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_drink_beer1_shoot_hand.png')},
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_order_beer.png'), top: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_order_beer_hand.png')},
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_hands_down.png'), top: undefined},
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_drink_beer2.png'), top: undefined},
  ]

  const [playerState, setPlayerState] = useState(PLAYER.idle);

  const planeRef = useRef();
  const planeTopRef = useRef();

  useEffect(() => {
    if (planeRef.current) {
      planeRef.current.lookAt(0, position[1], 0);
      planeTopRef.current.lookAt(0, position[1], 0);
    }
  }, [planeRef])

  const scale = 1.3;


  
  const { data } = useContext(WebsocketContext);

  useEffect(() => {
    if(data?.type === "choose"){
      setPlayerState(PLAYER.cards)
    }
    else if(data?.type === "stop-choice"){
      setPlayerState(PLAYER.playCard)
    }
    if(data?.type === "round-actions" && data?.data){
      console.log(data?.data)
      data.data.forEach(action => {
        if(action.user == pId){
  
          switch (action.type) {
            case "ammo":
              setPlayerState(PLAYER.ammo);
              break;
            case "block":
              setPlayerState(PLAYER.block);
              break;
            case "shoot-damage":
            case "shoot-death":
            case "shoot-block":
              setPlayerState(PLAYER.shoot);
              break;
            case "order-beer":
              setPlayerState(PLAYER.orderBeer);
              break;
            case "started-beer":
              //dies while drinking
              break;
            case "finished-beer":
              setPlayerState(PLAYER.drinkBeer);
              break;
            default:
              break;
          }

        }

        if(action.target == pId){
          switch (action.type) {
            case "shoot-drinking-beer":
              setPlayerState(PLAYER.shootBeer);
              
              const timeoutId = setTimeout(() => {
                setPlayerState(PLAYER.shootBeer2);
              }, 500);
          
              // Cleanup function to clear the timeout if the component unmounts
              return () => clearTimeout(timeoutId);
              break;
            default:
              break;
          }
        }
  
      })
    }
    
  }, [data])
  
  return <>
    <mesh
      position={position} // Position it at the origin
      ref={planeRef}
    >
      <planeGeometry args={[3*scale, 4*scale]} />
      <meshStandardMaterial 
          side={THREE.DoubleSide}
          map={variants[playerState].main}
          transparent={true}/>
    </mesh>
    <mesh
      position={position} // Position it at the origin
      ref={planeTopRef}
    >
      {!!variants[playerState].top &&
      <>
      <planeGeometry args={[3*scale, 4*scale]} />
      <meshStandardMaterial 
          depthWrite={false} // Disable depth writing
          depthTest={false} // Disable depth testing
          side={THREE.DoubleSide}
          map={variants[playerState].top}
          transparent={true}/>
      </>}
    </mesh>
  </>
}