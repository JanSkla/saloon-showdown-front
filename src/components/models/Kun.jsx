import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from 'react';
import { WebsocketContext } from '../../utilComponents/WebsocketProvider';
import { useSpring, animated } from '@react-spring/three'

export default function Kun() {
    const texture =  useLoader(THREE.TextureLoader, '/images/desert/kun.png')
    const cardScale = 0.05;

    const {rotation} = useSpring({
        from: {
          rotation: -0.06,
        },
        to: 
        [{
          rotation: 0.06,
        },
        {
          rotation: -0.06,
        },],
        config: {
          friction: 80,
          tension: 1000,
        },
        loop: true
      })

      const {position} = useSpring({
        from: {
          position: [-20, -2.9, -30]
        },
        to: {
          position: [60, -2.9, -30]
        },
        config: {
          friction: 60,
          tension: 5,
          loop: true,
        },
      })

      //init pos [-1, 2.8, -4]
      //after pos [0, 2.6. 0]
      
    return (
        <animated.mesh
        position={position}
        rotation-x={rotation}
        ><>
        <planeGeometry args={[6, 5]} />   
        <meshStandardMaterial 
            side={THREE.DoubleSide}
            map={texture}
            transparent
            alphaTest={0.1}
            flatShading={true}
      
        />
            </>
        </animated.mesh>
        
      
      )
}