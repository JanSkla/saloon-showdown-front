import * as THREE from 'three';
import { Canvas } from "@react-three/fiber"
import { Environment, PerspectiveCamera, OrbitControls, useProgress, Html } from "@react-three/drei"
import { Teren } from './models/Teren';
import Kun from './models/Kun';
import { useLoader } from "@react-three/fiber";

const MainPageCanvas = () => {
    const texture =  useLoader(THREE.TextureLoader, '/images/desert/mountains.png')

    return (
        <div className="canvas-container">
        <Canvas style={{backgroundColor: '#8bc3e0'}}>
        <mesh         
        position={[-100, 25, 0]}
        rotation-y={1.6}
        renderOrder={1}
>
    <planeGeometry args={[500, 62.5]}/>   
    <meshStandardMaterial 
    side={THREE.DoubleSide}
    map={texture}
    transparent
    alphaTest={0.1}
    depthWrite={false} // Disable depth writing
    depthTest={false} // Disable depth testing
    flatShading={true}/>
    </mesh>
            <pointLight position={[10,100,0]} intensity={30000} color={0xffffff}/>
            <Teren position={[-30,-2,-90]}/>
            <Teren position={[-30,-2,140]}/>
            <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={53.702} position={[0, 0.7, 0]} rotation={[0, 1.5, 0]} scale={1.241} />
            {/* <OrbitControls/> */}
            <Kun></Kun>

            <pointLight position={[-3, 0.5, 0]} intensity={10} color={0xffffff}/>
        </Canvas>
        </div>
    )
}

export default MainPageCanvas;
