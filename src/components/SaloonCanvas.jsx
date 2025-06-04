import { Saloon } from './models/Saloon';
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber"
import Room from "./models/Room"
import LobbyPositions from "./models/LobbyPositions"
import { Environment, PerspectiveCamera, OrbitControls, useProgress, Html } from "@react-three/drei"
import { useLoader } from "@react-three/fiber";
import LobbyCamera from './models/LobbyCamera';
import { Radio } from './models/Radio';
import { useRef, useState } from 'react';
import { WaitToLoad } from '../utils/waitToLoad';
import Sun from './models/Sun';

const SaloonCanvas = () => {
  const texture =  useLoader(THREE.TextureLoader, '/images/desert/mountains2.png')



  return <div className="canvas-container">        
    <Canvas id='saloon_canvas' style={{background: 'linear-gradient(rgb(212, 202, 166),rgb(174, 149, 107))'}} >
        <WaitToLoad/>
        <Environment preset="dawn" environmentIntensity={0.5} environmentRotation={[1,0,1]}/>
        <LobbyCamera/>
        <Saloon />
        <LobbyPositions />
        <Radio position={[13.5, 1.13, -3.1]} scale={2.5}/>
        <Sun/>
        <mesh
              position={[-100, 16, 0]}
              rotation-y={1.6}
              renderOrder={1}
            > 
              <planeGeometry args={[500, 62.5]}/>
              <meshStandardMaterial 
              side={THREE.DoubleSide}
              map={texture}
              transparent
              alphaTest={0.1}
              flatShading={true}/>
            </mesh>
            <pointLight position={[15,13.5,0]} intensity={5} color={0xfebbbb}/>

    </Canvas>
  </div>
}

export default SaloonCanvas;