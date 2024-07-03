// import * as THREE from 'three';
// import { useLoader } from "@react-three/fiber"
// import { createRef, useEffect } from 'react';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

// export default function Text({position, value, lookAt}) {

//   const ref = createRef();

//   const font = useLoader(FontLoader, '/fonts/Exo 2_bold.json')

//   useEffect(() => {
//     if (ref.current) {
//       ref.current.lookAt(lookAt[0], lookAt[1], lookAt[2]);
//     }
//   }, [ref])

//   return <mesh
//     position={position} // Position it at the origin
//     ref={ref}
//   >
//     <textGeometry args={['test', {font, size:5, height: 1}]}/>
//     <meshStandardMaterial 
//         side={THREE.DoubleSide}
//         map={shotTexture}
//         transparent={true}/>
//   </mesh>
// }