import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useContext, useEffect, useRef, useState } from "react";
import { WebsocketContext } from "../../utilComponents/WebsocketProvider";
import { RoomContext } from "../../utilComponents/RoomDataProvider";
import { isPhone } from "../../utils/utils";

const MainCamera = () => {
  const { data } = useContext(WebsocketContext);
  const { thisPID } = useContext(RoomContext);

  const originalRot = [-3.108, -0.271, -3.133];

  const currentRot = useRef(originalRot);

  const cursor = useRef({x:0, y:0});
  const MULTIPLIER = 0.05;

  useEffect(() => {
    if(isPhone) return;
    document.addEventListener('mousemove', event => {
      cursor.current = {x:event.clientX/window.innerWidth*2 - 1, y:event.clientY/window.innerHeight*2 - 1}
  })
  }, [])

  useEffect(() => {
    if(data?.type === 'load-game'){
      currentRot.current = originalRot;
    }
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
              currentRot.current = [-3.308, -0.271, -3.133];
            }, 1200);
            const tId1 = setTimeout(() => {
              currentRot.current = originalRot;
            }, 2000);
        
            // Cleanup function to clear the timeout if the component unmounts
            return () => {
              clearTimeout(tId);
              clearTimeout(tId1);
            }
            break;
          case "order-beer":
              
            const tId2 = setTimeout(() => {
              currentRot.current = [-3.108, -1.271, -3.133];
            }, 500);
            const tId3 = setTimeout(() => {
              currentRot.current = originalRot;
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
            setTimeout(() => {
              currentRot.current = [-3.008, -0.23,-3];
            }, 1000);
            break
          case "shoot-damage":
          case "shoot-block":
              setTimeout(() => {
                currentRot.current[0] = -3.158;
              }, 1000);
              setTimeout(() => {
                currentRot.current[0] = -3.108;
              }, 1100);
            break;
          case "shoot-drinking-beer":

            
            setTimeout(() => {
              currentRot.current[0] = -3.358;
            }, 1300);
            break;
        }
      }
    })
  }
  }, [data]);

  const cameraRef = useRef();

  useFrame(({ clock }) => {
    if (!cameraRef.current) return;
    // cameraRef.current.rotation.x = -3.008
    // cameraRef.current.rotation.y = -0.23
    // cameraRef.current.rotation.z = -3
    cameraRef.current.rotation.x = currentRot.current[0]
     - (-Math.sign(cursor.current.y) + Math.sign(cursor.current.y) * Math.pow(cursor.current.y - Math.sign(cursor.current.y), 2)) * MULTIPLIER;
    cameraRef.current.rotation.y = currentRot.current[1]
     - (-Math.sign(cursor.current.x) + Math.sign(cursor.current.x) * Math.pow(cursor.current.x - Math.sign(cursor.current.x), 2)) * MULTIPLIER;
     cameraRef.current.rotation.z = currentRot.current[2]
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault={true} far={1000} near={0.1} fov={53.702} position={[-1.4, 4.266, -5.225]} rotation={[-3.108, -0.271, -3.133]} scale={1.241} />
}
export default MainCamera;