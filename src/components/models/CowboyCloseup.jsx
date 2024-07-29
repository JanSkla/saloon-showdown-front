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

  const textureUp =  useLoader(THREE.TextureLoader, '/images/cowboy/closeup/cowboy-closeup2.png');
  const textureMid =  useLoader(THREE.TextureLoader, '/images/cowboy/closeup/cowboy-closeup1.png');
  const textureDown =  useLoader(THREE.TextureLoader, '/images/cowboy/closeup/cowboy-closeup0.png');

  const [variant, setVariant] = useState(textureMid)

  const MULTIPLIER = 0.1;

  useFrame(() => {
    if (planeRef.current == undefined) return;

    planeRef.current.rotation.x = originalRot[0] +(cursor.current.y*2 -1 -1.7)*MULTIPLIER;
    planeRef.current.rotation.y = originalRot[1] +(cursor.current.x*2 -1 +2.8)*MULTIPLIER;

    if(cursor.current.y > 1/3*2)
      setVariant(textureDown)
    else if(cursor.current.y > 1/4)
      setVariant(textureMid)
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