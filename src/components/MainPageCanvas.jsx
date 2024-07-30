import * as THREE from 'three';
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera, OrbitControls, useProgress, Html, PointerLockControls } from "@react-three/drei"
import { Teren } from './models/Teren';
import Kun from './models/Kun';
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three'
import CowboyCloseup from './models/CowboyCloseup';
import React from 'react';


const MainPageCanvas = () => {
    const texture =  useLoader(THREE.TextureLoader, '/images/desert/mountains.png')

      const Loader = () => {
        const { progress } = useProgress();
        return <Html center>{progress} % loaded</Html>;
      };

    return (
        <div className="canvas-container">
        <Canvas style={{backgroundColor: '#8bc3e0'}}>
          <React.Suspense fallback={<Loader />}>
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
            <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={53.702} position={[0, 0.7, 0]} rotation={[0, 0, 0]} scale={1.241} />
            <Kun></Kun>
          </React.Suspense>
        </Canvas>
        </div>
    )
}

export default MainPageCanvas;
