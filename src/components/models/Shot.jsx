import * as THREE from 'three';
import { useLoader } from "@react-three/fiber"
import { createRef, useEffect } from 'react';

export default function Shot({position, lookAt}) {

  const shotTexture = useLoader(THREE.TextureLoader, '/images/shot/shot.png');

  const planeRef = createRef();

  useEffect(() => {
    if (planeRef.current) {
      planeRef.current.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    }
  }, [planeRef])

  return <mesh
    position={position} // Position it at the origin
    ref={planeRef}
  >
    <planeGeometry args={[0.35, 0.35]} />
    <meshStandardMaterial 
        side={THREE.DoubleSide}
        map={shotTexture}
        transparent
        alphaTest={0.1}
        />
  </mesh>
}