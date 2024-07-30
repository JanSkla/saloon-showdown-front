import { Saloon } from './models/Saloon';
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber"
import Room from "./models/Room"
import { Environment, PerspectiveCamera, OrbitControls, useProgress, Html } from "@react-three/drei"
import { useLoader } from "@react-three/fiber";



const SaloonCanvas = () => {
    const texture =  useLoader(THREE.TextureLoader, '/images/desert/mountains.png')

    return <div className="canvas-container">        
        <Canvas style={{backgroundColor: '#8bc3e0'}}>
        <Environment preset="dawn" environmentIntensity={0.5} environmentRotation={[1,0,1]}/>
        <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={38.702} position={[42, 5.5, -13]} rotation={[0, 1.95, 0]} scale={1.241}/>
        <Saloon></Saloon>
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