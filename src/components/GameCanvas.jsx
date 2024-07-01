import * as THREE from 'three';
import { Canvas } from "@react-three/fiber"
import Room from "./models/Room"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import Player from "./models/Player"
import { useContext, useEffect, useState } from "react"
import { RoomContext } from "../utilComponents/RoomDataProvider"
import Beer from "./models/Beer"

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
  const beerRadius = 2;
  const offset = -(enemyCount - 1)/2;

  const angleOffset = angleRange/enemyCount;
  
  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  const [positions, setPositions] = useState([]);

  useEffect(() => {

    const poss = [];
    for (let i = 0 + offset; i < enemyCount + offset; i++){
      const radians = toRadians(angleOffset * i);
      const pos = {
        a: radius * Math.sin(radians),
        b: radius * Math.cos(radians),
      };
      const radiansBeer = toRadians(angleOffset * i - 40);
      const beerPos = {
        a: beerRadius * Math.sin(radiansBeer),
        b: beerRadius * Math.cos(radiansBeer),
      };
      poss.push({pos: pos, beerPos: beerPos});
    }
    setPositions(poss);
  }, [])

  return <Canvas
  onCreated={({ gl, scene }) => {
    scene.fog = new THREE.FogExp2(0x120c0c, 0.05); // Fog color and density
  }}>
    {positions.map(({pos, beerPos},index) => <>
      <Player pId={enemies[index].pId} position={[pos.a, 3.55, pos.b]}/>
      <Beer pId={enemies[index].pId} position={[beerPos.a, 2.8, beerPos.b]} lookAt={[-0.35, 2.8, -1.3]}/>
    </>)}
    <Beer pId={thisPID} position={[-1.4, 2.8, -2]} lookAt={[-1.4, 2.8, -5.225]}/>
    <Room />
    <ambientLight />
    <Environment preset='apartment'/>
    <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={53.702} position={[-1.4, 4.266, -5.225]} rotation={[-3.108, -0.271, -3.133]} scale={1.241} />
  </Canvas>
}

export default GameCanvas