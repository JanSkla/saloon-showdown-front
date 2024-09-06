import * as THREE from 'three';
import { useContext, useEffect, useRef, useState } from "react";
import { useLoader } from '@react-three/fiber';
import { WebsocketContext } from '../../utilComponents/WebsocketProvider';
import Shot from './Shot';
import { Text } from '@react-three/drei';
import { TARGET, TargetFrame } from './TargetFrame';
import Sound from '../Sound';

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
  dead: 10,
  disconnected: 11,
};


export const MAX_HEALTH = 3;

const poss = [
  [0.5, -0.15, 0.0],
  [0.3, 0.2, 0.0],
  [0.0, 0.0, 0.0],
  [-0.05, 0.3, 0.0],
  [0.3, 0.2, 0.0],
  [0.0, 0.0, 0.0],
  [0.4, -0.1, 0.0],
  [0.1, 0.1, 0.0],
  [0.2, 0.2, 0.0],
  [0.1, -0.1, 0.04]
]

export default function Player({pId, position, onClick, name, targetState}) {
  
  const disconnected = useRef(false);

  const textureLocation = '/images/cowboy/';
  const defaultTexture = useLoader(THREE.TextureLoader, textureLocation + 'cowboy_cards2.png');

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
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_dead.png'), top: undefined},
    {main: useLoader(THREE.TextureLoader, textureLocation + 'cowboy_disconnected.png'), top: undefined},
  ]

  const sounds = [
    undefined,
    undefined,
    "/sounds/reload-other.wav",
    "/sounds/shield.wav",
    "/sounds/shooting-other.wav",
    "/sounds/drink-other.wav",
    "/sounds/drink-other-shot.wav",
    "/sounds/whistle.wav",
    undefined,
    "/sounds/drink-other-shot.wav",
    undefined,
    undefined

  ]


  const [playerState, setPlayerState] = useState(PLAYER.idle);
  
  const [health, _setHealth] = useState(MAX_HEALTH);

  const healthRef = useRef(MAX_HEALTH);

  const setHealth = newVal => {
    healthRef.current = newVal;
    _setHealth(newVal);
  }

  const planeRef = useRef();
  const planeTopRef = useRef();

  const refreshLookAt = () => {
    if (planeRef.current) {
      planeRef.current.lookAt(0, position[1], 0);
      planeTopRef.current.lookAt(0, position[1], 0);
    }
  }

  useEffect(() => {
    refreshLookAt();
  }, [planeRef])

  const scale = 1.3;

  const shotsOffset = [-0.1, -0.6, 0.3];
  
  const { data } = useContext(WebsocketContext);

  useEffect(() => {
    if(data?.type === "player-disconnect" && data?.player === pId){
      disconnected.current = true;
      setPlayerState(PLAYER.disconnected)
    }
    else if(data?.type === "start-countdown"){
      setHealth(MAX_HEALTH);
      setPlayerState(PLAYER.cards);
      refreshLookAt();
      disconnected.current = false;
    }
    if(disconnected.current) return;
    if(data?.type === "player-ready" && data?.player === pId){
      setPlayerState(PLAYER.cards)
    }
    if(health <= 0) return;
    else if(data?.type === "round-actions" && data?.data){
      let dead = false;
      let hp = health;

      const sdb = data.data.find(action => action.type == "shoot-drinking-beer" && action.target == pId);
      if(sdb){
          
          const timeoutId = setTimeout(() => {
            setPlayerState(PLAYER.shootBeer2);
            setHealth(healthRef.current + 1);
          }, 1000);
      }

      data.data.forEach(action => {
        if(dead) return;
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
            case "finished-beer":
              setPlayerState(PLAYER.drinkBeer);
              setHealth(healthRef.current + 1);
              break;
            default:
              break;
          }

        }

        if(action.target == pId){
          switch (action.type) {
            case "shoot-drinking-beer":
              setHealth(healthRef.current-1);
              break;
            case "shoot-damage":
              setHealth(action.targetHealth);
              break;
            case "shoot-death":
              console.log("DEATH")
              setPlayerState(PLAYER.dead);
              setHealth(0);
              dead = true;
              break;
            default:
              break;
          }
        }
  
      })
    }
    else if(data?.type === "choose"){
      setPlayerState(PLAYER.cards)
    }
    else if(data?.type === "stop-choice"){
      setPlayerState(PLAYER.playCard)
    }
    
  }, [data])

  const HealthDisplay = () => {
    const rows = []

    if(health>3){
      for (let hp = 4; hp <= health; hp++){
        rows.push(<Shot shield position={poss[hp-1].map((a, i) => a + shotsOffset[i])} lookAt={[0, position[1], 0]}/>)
      }
    }
    else if (health<3){
      for (let hp = health; hp < 3; hp++){
        rows.push(<Shot position={poss[hp].map((a, i) => a + shotsOffset[i])} lookAt={[0, position[1], 0]}/>)
      }
    }

    return rows;
  }
  
  return <>
    <mesh
      position={position} // Position it at the origin
      ref={planeRef}
      onClick={targetState == TARGET.choosing && health > 0 && onClick}
    >
      <planeGeometry args={[3 * scale, 4 * scale]} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        map={variants[playerState].main}
        transparent
        alphaTest={0.1}
      >
        {sounds[playerState] && <Sound url={sounds[playerState]} isPlayer={false}/>}
      </meshStandardMaterial>
      <Text position={[0.3,1.7,0.1]} color="white" anchorX="center" anchorY="middle" fontSize={0.2} material={new THREE.MeshBasicMaterial({toneMapped: false, fog: false})}>
        {name}
      </Text>
      {health > 0 && playerState != PLAYER.idle && <TargetFrame position={[0.4,0,0.3]} targetState={targetState}/>}
    
      <HealthDisplay />
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
          transparent
          alphaTest={0.1}
          />
      </>}
    </mesh>
  </>
}