import { Canvas } from "@react-three/fiber"
import Room from "./models/Room"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import Player from "./models/Player"
import { useContext, useEffect, useState } from "react"
import { RoomContext } from "../utilComponents/RoomDataProvider"

const GameCanvas = () => {


  const { players, thisPID } = useContext(RoomContext);

  const enemies = [];

  players.filter(player => player.pId !== thisPID).forEach(enemy => {
    enemies.push({
      pId: enemy.pId,
      playerState: 0,
    })
  })

  const enemyCount = enemies.length;
  const angleRange = 180;

  const radius = 3.8;
  const offset = -(enemyCount - 1)/2;

  const angleOffset = angleRange/enemyCount;
  
  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  const [positions, setPositions] = useState([]);

  useEffect(() => {

    const poss = [];
    for (let i = 0 + offset; i < enemyCount + offset; i++){
      const pos = {
        a: radius * Math.sin(toRadians(angleOffset * i)),
        b: radius * Math.cos(toRadians(angleOffset * i)),
      };
      poss.push(pos);
    }
    setPositions(poss);
  }, [])

  return <Canvas>
    {positions.map(({a,b},index) => <Player pId={enemies[index].pId} position={[a, 3.55, b]}/>)}
    <Room />
    <ambientLight />
    <Environment preset='sunset'/>
    <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={53.702} position={[-1.4, 4.266, -5.225]} rotation={[-3.108, -0.271, -3.133]} scale={1.241} />
  </Canvas>
}

export default GameCanvas