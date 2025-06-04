import * as THREE from 'three';
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera, OrbitControls, Html, PointerLockControls } from "@react-three/drei"
import { Teren } from './models/Teren';
import Kun from './models/Kun';
import { useSpring, animated } from '@react-spring/three'
import CowboyCloseup from './models/CowboyCloseup';
import React from 'react';
import { PositionalAudio } from '@react-three/drei';
import { WaitToLoad } from '../utils/waitToLoad';
import { useLoader } from "@react-three/fiber";
import Sun from './models/Sun';


const MainPageCanvas = () => {
    const texture =  useLoader(THREE.TextureLoader, '/images/desert/mountains2.png')

    const listener = new THREE.AudioListener();
      
    return (
        <div className="canvas-container">
        <Canvas style={{background: 'linear-gradient(rgb(212, 202, 166),rgb(174, 149, 107))'}}>
          <WaitToLoad/>
          <CowboyCloseup/>
          <animated.mesh         
            position={[0, 25, -120]}
            renderOrder={1}
          > 
            <planeGeometry args={[500, 62.5]}/>
            <meshStandardMaterial 
            side={THREE.DoubleSide}
            map={texture}
            transparent
            alphaTest={0.1}
            flatShading={true}/>
          </animated.mesh>
          <Environment preset="dawn" environmentIntensity={0.5} environmentRotation={[0,0,1]}/>
          <Teren position={[0,-6,-20]} rotation={[0,-1.5,0]}/>       
          <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={53.702} position={[0, 0.7, 0]} rotation={[0, 0, 0]} scale={1.241} add={listener}/>
          <Sun/>
          <Kun/>
        </Canvas>
        </div>
    )
}

export default MainPageCanvas;
