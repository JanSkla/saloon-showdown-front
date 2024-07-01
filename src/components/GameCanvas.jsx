import * as THREE from 'three';
import { Canvas } from "@react-three/fiber"
import Room from "./models/Room"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import Player from "./models/Player"
import { useContext, useEffect, useRef, useState } from "react"
import { RoomContext } from "../utilComponents/RoomDataProvider"
import Beer from "./models/Beer"
import { WebsocketContext } from '../utilComponents/WebsocketProvider';

const GameCanvas = ({chooseTarget}) => {

  // SETTINGS //
  const angleRange = 180;

  const radius = 3.8;
  const beerRadius = 2;
  // --- //

  const { players, thisPID } = useContext(RoomContext);

  const enemies = useRef([]);
  
  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  const [positions, setPositions] = useState([]);

  const recalculatePlayers = () => {

    enemies.current = [];

    players.filter(player => player.pId !== thisPID).forEach(enemy => {
      enemies.current.push({
        pId: enemy.pId,
        playerState: 0,
      })
    })
    
    console.log("enemies", enemies)
    const offset = -(enemies.current.length - 1)/2;
  
    const angleOffset = angleRange/enemies.current.length;

    const poss = [];
    for (let i = 0; i < enemies.current.length; i++){
      const radians = toRadians(angleOffset * (i + offset));
      const pos = {
        a: radius * Math.sin(radians),
        b: radius * Math.cos(radians),
      };
      const radiansBeer = toRadians(angleOffset * (i + offset) - 40);
      const beerPos = {
        a: beerRadius * Math.sin(radiansBeer),
        b: beerRadius * Math.cos(radiansBeer),
      };
      console.log(enemies, i, enemies.length, poss, pos)
      poss.push({pId: enemies.current[i].pId, pos: pos, beerPos: beerPos});
    }
    setPositions(poss);
  }
  
  const { data } = useContext(WebsocketContext);

  useEffect(() => {
    if(data?.type === "game-over" || data?.type === "start-countdown"){
      recalculatePlayers();
    }
  }, [data])

  useEffect(() => {
    recalculatePlayers();
  }, [])

  return <Canvas
  onCreated={({ gl, scene }) => {
    scene.fog = new THREE.FogExp2(0x120c0c, 0.05); // Fog color and density
  }}>
    {positions.map(({pId, pos, beerPos}) => <>
      <Player pId={pId} position={[pos.a, 3.55, pos.b]} onClick={() => chooseTarget(pId)}/>
      <Beer pId={pId} position={[beerPos.a, 2.8, beerPos.b]} lookAt={[-0.35, 2.8, -1.3]}/>
    </>)}
    <Beer pId={thisPID} position={[-1.4, 2.8, -2]} lookAt={[-1.4, 2.8, -5.225]}/>
    <Room />
    <ambientLight />
    <Environment preset='apartment'/>
    <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={53.702} position={[-1.4, 4.266, -5.225]} rotation={[-3.108, -0.271, -3.133]} scale={1.241} />
  </Canvas>
}

export default GameCanvas