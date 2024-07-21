import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from 'react';
import { WebsocketContext } from '../../utilComponents/WebsocketProvider';
import { useSpring, animated } from '@react-spring/three'

export default function ThrowingCard() {
    const texture =  useLoader(THREE.TextureLoader, '/images/cards/back.png')
    const cardScale = 0.05;


    const [Zrotation, setZrotation] = useState(0);

    const {position} = useSpring({
        from: {
          position: [-1, 3.2, -4],
        },
        to: [{
          position: [0, 2.6, 0]
        }],
        config: {
            friction: 30,
            tension: 120,
        },
        reset: false
      })

      const {rotation} = useSpring({
        from: {
          rotation: 0,
        },
        to: {
          rotation: 10,
        },
        config: {
            friction: 40,
            tension:200,
        },
        
      })

      //init pos [-1, 2.8, -4]
      //after pos [0, 2.6. 0]
      
    return (
        <animated.mesh
        position={position}
          renderOrder={1}
          rotation-x={4.75}
          rotation-z={rotation}
        ><>
        <planeGeometry args={[5 * cardScale, 7* cardScale]} />   
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