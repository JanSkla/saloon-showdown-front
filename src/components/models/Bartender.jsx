import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from 'react';
import { WebsocketContext } from '../../utilComponents/WebsocketProvider';
import { useSpring, animated } from '@react-spring/three'


export default function Bartender() {
    const bartender =  useLoader(THREE.TextureLoader, '/images/bartender/bartender.png')
    const bartenderArm =  useLoader(THREE.TextureLoader, '/images/bartender/bartenderArm.png')
    const cardScale = 0.05;

    const {armRotation, armPosition} = useSpring({
        from: {
            armRotation: 0,
            armPosition: -3
          },
          to: 
          [{
            armRotation: 0.1,
            armPosition: -2.95

          },
          {
            armRotation: 0,
            armPosition: -3
          },],
          config: {
            friction: 80,
            tension: 1000,
          },
          loop: true
    })

      //init pos [-1, 2.8, -4]
      //after pos [0, 2.6. 0]
      
    return (
        <>

        <animated.mesh
        position={[9, 4.4, -3]}
        rotation={[0, 4.5, 0]}
        position-z={armPosition}
        ><>
        <planeGeometry args={[3, 5]} />   
        <meshStandardMaterial 
            side={THREE.DoubleSide}
            map={bartender}
            transparent
            alphaTest={0.1}
            flatShading={true}
            
            />
            </>
        </animated.mesh>
        
        <animated.mesh
        position={[9, 4.4, -3]}
        rotation={[0, 4.5, 0]}
        rotation-x={armRotation}
        position-z={armPosition}
        ><>
        <planeGeometry args={[3, 5]} />   
        <meshStandardMaterial 
            side={THREE.DoubleSide}
            map={bartenderArm}
            transparent
            alphaTest={0.1}
            flatShading={true}
            depthWrite={false} // Disable depth writing
            depthTest={false} // Disable depth testing
            />
            </>
        </animated.mesh>
      
        </>
      )
}