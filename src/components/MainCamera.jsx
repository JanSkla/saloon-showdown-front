import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";

const MainCamera = () => {

  const originalPos = [-3.108, -0.271, -3.133];
  const cursor = useRef({x:0, y:0});
  const MULTIPLIER = 0.05;

  useEffect(() => {
    document.addEventListener('mousemove', event => {
      cursor.current = {x:event.clientX/window.innerWidth*2 - 1, y:event.clientY/window.innerHeight*2 - 1}
      console.log(Math.sign(cursor.current.y) * Math.pow(cursor.current.y - Math.sign(cursor.current.y), 2)) // THIS should do what you want     
  })
  }, [])

  const cameraRef = useRef();

  useFrame(({ clock }) => {
    if (!cameraRef.current) return;

    cameraRef.current.rotation.x = originalPos[0] - (-Math.sign(cursor.current.y) + Math.sign(cursor.current.y) * Math.pow(cursor.current.y - Math.sign(cursor.current.y), 2)) * MULTIPLIER;
    cameraRef.current.rotation.y = originalPos[1] - (-Math.sign(cursor.current.x) + Math.sign(cursor.current.x) * Math.pow(cursor.current.x - Math.sign(cursor.current.x), 2)) * MULTIPLIER;
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault={true} far={1000} near={0.1} fov={53.702} position={[-1.4, 4.266, -5.225]} rotation={[-3.108, -0.271, -3.133]} scale={1.241} />
}
export default MainCamera;