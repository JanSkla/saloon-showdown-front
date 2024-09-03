import * as THREE from 'three';
import { Text } from "@react-three/drei"
import { useState } from 'react';

const ReadyText = ({onClick}) => {
  const whiteMaterial = new THREE.MeshBasicMaterial({toneMapped: false, fog: false, side: THREE.DoubleSide, depthTest: false});

  const [isHovered, setIsHovered] = useState();
  
  return <Text position={[0, 4, 0]} rotation={[-3.108, -0.271, Math.PI]} scale={isHovered ? 1.1 : 1} color="white" fontSize={0.5} fontWeight={790} outlineColor={'black'} outlineWidth={0.01} material={whiteMaterial} onClick={onClick} onPointerEnter={() => {
    setIsHovered(true)
    document.body.style.cursor = 'pointer';
  }} onPointerLeave={() => {
    setIsHovered(false)
    document.body.style.cursor = 'auto';
  }}>READY UP!</Text>
}

export default ReadyText;