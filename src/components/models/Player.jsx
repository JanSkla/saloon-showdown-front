import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { useLoader } from '@react-three/fiber';

export const PLAYER = {
  cards: 0,
  playCard: 1,
  ammo: 2,
  block: 3,
  shoot: 4,
  drinkBeer: 5,
  shootBeer: 6,
  idle: 7,
};

export default function Player({position, playerState}) {

  const defaultTexture = useLoader(THREE.TextureLoader, '/cowboy/cowboy_cards.png');

  const variants = [
    {main: defaultTexture, top: useLoader(THREE.TextureLoader, '/cowboy/cowboy_cards_hand.png')},
    {main: defaultTexture, top: useLoader(THREE.TextureLoader, '/cowboy/cowboy_play_card_hand.png')},
    {main: defaultTexture, top: useLoader(THREE.TextureLoader, '/cowboy/cowboy_ammo_hand.png')},
    {main: useLoader(THREE.TextureLoader, '/cowboy/cowboy_block.png'), top: undefined},
    {main: useLoader(THREE.TextureLoader, '/cowboy/cowboy_hands_down.png'), top: useLoader(THREE.TextureLoader, '/cowboy/cowboy_shoot_hand.png')},
    {main: useLoader(THREE.TextureLoader, '/cowboy/cowboy_drink_beer0.png'), top: useLoader(THREE.TextureLoader, '/cowboy/cowboy_drink_beer0_hand.png')},
    {main: useLoader(THREE.TextureLoader, '/cowboy/cowboy_drink_beer1_shoot.png'), top: useLoader(THREE.TextureLoader, '/cowboy/cowboy_drink_beer1_shoot_hand.png')},
    {main: useLoader(THREE.TextureLoader, '/cowboy/cowboy_hands_down.png'), top: undefined},
  ]

  const planeRef = useRef();
  const planeTopRef = useRef();

  useEffect(() => {
    if (planeRef.current) {
      planeRef.current.lookAt(0, position[1], 0);
      planeTopRef.current.lookAt(0, position[1], 0);
    }
  }, [planeRef])

  const scale = 1.3;
  
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