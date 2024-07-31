import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";

const LobbyCamera = () => {
  const cursor = useRef({x:0, y:0});
  const MULTIPLIER = 0.02;

  useEffect(() => {
    document.addEventListener('mousemove', event => {
      cursor.current = {x:event.clientX/window.innerWidth*2 - 1, y:event.clientY/window.innerHeight*2 - 1}
  })
  }, [])

  const cameraRef = useRef();

  useFrame(({ clock }) => {
    if (!cameraRef.current) return;

    cameraRef.current.rotation.x = (-Math.sign(cursor.current.y) + Math.sign(cursor.current.y) * Math.pow(cursor.current.y - Math.sign(cursor.current.y), 2)) * MULTIPLIER;
    cameraRef.current.rotation.y = (-Math.sign(cursor.current.x) + Math.sign(cursor.current.x) * Math.pow(cursor.current.x - Math.sign(cursor.current.x), 2)) * MULTIPLIER;
  })

  return <mesh position={[42, 5.9, -12.1]}  rotation={[0, 1.95, 0]} >
    <PerspectiveCamera ref={cameraRef} makeDefault={true} far={1000} near={0.1} fov={30.5}scale={1.241}/>
  </mesh>
  }
export default LobbyCamera;