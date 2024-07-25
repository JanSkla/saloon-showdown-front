import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useContext, useEffect, useRef, useState } from "react";
import { WebsocketContext } from "../utilComponents/WebsocketProvider";
import { RoomContext } from "../utilComponents/RoomDataProvider";

const MainCamera = () => {
  const { data } = useContext(WebsocketContext);
  const { thisPID } = useContext(RoomContext);

  const originalRot = [-3.108, -0.271, -3.133];

  const currentPos = useRef(originalRot);

  const cursor = useRef({x:0, y:0});
  const MULTIPLIER = 0.05;

  useEffect(() => {
    document.addEventListener('mousemove', event => {
      cursor.current = {x:event.clientX/window.innerWidth*2 - 1, y:event.clientY/window.innerHeight*2 - 1}
  })
  }, [])

  useEffect(() => {
    if(data?.type === "round-actions" && data?.data){
    data.data.forEach(action => {
      if(action.user == thisPID){
        switch (action.type) {
          case "ammo":
          case "block":
          case "shoot-damage":
          case "shoot-death":
          case "shoot-block":
            break;
          case "finished-beer":
              
            const tId = setTimeout(() => {
              currentPos.current = [-3.308, -0.271, -3.133];
            }, 1200);
            const tId1 = setTimeout(() => {
              currentPos.current = originalRot;
            }, 2000);
        
            // Cleanup function to clear the timeout if the component unmounts
            return () => {
              clearTimeout(tId);
              clearTimeout(tId1);
            }
            break;
          case "order-beer":
              
            const tId2 = setTimeout(() => {
              currentPos.current = [-3.108, -1.271, -3.133];
            }, 500);
            const tId3 = setTimeout(() => {
              currentPos.current = originalRot;
            }, 2000);
        
            // Cleanup function to clear the timeout if the component unmounts
            return () => {
              clearTimeout(tId2);
              clearTimeout(tId3);
            }
            break;
        }
      }
      else if(action.target == thisPID){
        
        switch (action.type) {
          case "shoot-death":
          case "shoot-damage":
          case "shoot-block":
            break;
          case "shoot-drinking-beer":
              
            const tId2 = setTimeout(() => {
              currentPos.current = [-3.308, -0.271, -3.133];
            }, 1200);
            const tId3 = setTimeout(() => {
              currentPos.current = originalRot;
            }, 2000);
        
            // Cleanup function to clear the timeout if the component unmounts
            return () => {
              clearTimeout(tId2);
              clearTimeout(tId3);
            }
            break;
        }
      }
    })
  }
  }, [data]);

  const cameraRef = useRef();

  useFrame(({ clock }) => {
    if (!cameraRef.current) return;

    cameraRef.current.rotation.x = currentPos.current[0] - (-Math.sign(cursor.current.y) + Math.sign(cursor.current.y) * Math.pow(cursor.current.y - Math.sign(cursor.current.y), 2)) * MULTIPLIER;
    cameraRef.current.rotation.y = currentPos.current[1] - (-Math.sign(cursor.current.x) + Math.sign(cursor.current.x) * Math.pow(cursor.current.x - Math.sign(cursor.current.x), 2)) * MULTIPLIER;
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault={true} far={1000} near={0.1} fov={53.702} position={[-1.4, 4.266, -5.225]} rotation={[-3.108, -0.271, -3.133]} scale={1.241} />
}
export default MainCamera;