import * as THREE from 'three';
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera, OrbitControls, useProgress, Html, PointerLockControls } from "@react-three/drei"
import { Teren } from './models/Teren';
import Kun from './models/Kun';
import { useLoader } from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three'
import CowboyCloseup from './models/CowboyCloseup';


const MainPageCanvas = () => {
    const texture =  useLoader(THREE.TextureLoader, '/images/desert/mountains.png')

    const {position} = useSpring({
        from: {
          position: [0, 0.7, 0]
        },
        to: {
          position: [0, 0.7, -142]
        },
        config: {
          friction: 200,
          tension: 5,
        },
      })

    return (
        <div className="canvas-container">
        <Canvas style={{backgroundColor: '#8bc3e0'}}>
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
            {/* <OrbitControls position={position} rotation={[0, 1.5, 0]} scale={1.241}/> */}
            <Kun></Kun>
        </Canvas>
        </div>
    )
}

export default MainPageCanvas;
