import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three'
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';

const CowboyCloseup = () => {

  const cursor = useRef({x:0, y:0});
  const planeRef = useRef();

  const originalRot = [0,0,0];

  useEffect(() => {
    document.addEventListener('mousemove', event => {
      cursor.current = {x:event.clientX/window.innerWidth, y:event.clientY/window.innerHeight}
  })
  }, [])

  const textureUp =  useLoader(THREE.TextureLoader, '/images/cowboy/closeup/cowboy-closeup0004.png');
  const textureUpish =  useLoader(THREE.TextureLoader, '/images/cowboy/closeup/cowboy-closeup0003.png');
  const textureMid =  useLoader(THREE.TextureLoader, '/images/cowboy/closeup/cowboy-closeup0002.png');
  const textureDownish =  useLoader(THREE.TextureLoader, '/images/cowboy/closeup/cowboy-closeup0001.png');
  const textureDown =  useLoader(THREE.TextureLoader, '/images/cowboy/closeup/cowboy-closeup0000.png');

  const [variant, setVariant] = useState(textureMid)

  const MULTIPLIER = 0.1;

  useFrame(() => {
    if (planeRef.current == undefined) return;

    planeRef.current.rotation.x = originalRot[0] +(cursor.current.y*2 -1 -1.7)*MULTIPLIER;
    planeRef.current.rotation.y = originalRot[1] +(cursor.current.x*2 -1 +2.8)*MULTIPLIER;

    if(cursor.current.y > 5.5/6)
      setVariant(textureDown)
    else if(cursor.current.y > 5/6)
      setVariant(textureDownish)
    else if(cursor.current.y > 4/6)
      setVariant(textureMid)
    else if(cursor.current.y > 1/10)
      setVariant(textureUpish)
    else
      setVariant(textureUp)
  })

  return <mesh
    position={[-0.23,0.67,-1.2]}
    rotation={originalRot}
    ref={planeRef}>
      <planeGeometry args={[3, 1.1]}/>
      <meshStandardMaterial 
      side={THREE.DoubleSide}
      map={variant}
      transparent
      alphaTest={0.5}/>
  </mesh>
}

export default CowboyCloseup;