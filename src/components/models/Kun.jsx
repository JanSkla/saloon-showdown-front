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

        loop: true
      })

      //init pos [-1, 2.8, -4]
      //after pos [0, 2.6. 0]
      
    return (
        <animated.mesh
        position={[-5, 0.5, 0]}
        rotation-y={1.5}
        rotation-x={rotation}
          renderOrder={1}
        ><>
        <planeGeometry args={[4, 5]} />   
        <meshStandardMaterial 
            side={THREE.DoubleSide}
            map={texture}
            transparent
            alphaTest={0.1}
            depthWrite={false} // Disable depth writing
            depthTest={false} // Disable depth testing
            flatShading={true}
      
        />
            </>
        </animated.mesh>
        
      
      )
}