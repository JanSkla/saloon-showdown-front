import * as THREE from 'three';
import { Canvas } from "@react-three/fiber"
import Room from "./models/Room"
import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei"
import Player from "./models/Player"
import { useContext, useEffect, useRef, useState } from "react"
import { RoomContext } from "../utilComponents/RoomDataProvider"
import Beer from "./models/Beer"
import { WebsocketContext } from '../utilComponents/WebsocketProvider';
import { TARGET } from './models/TargetFrame';
import Card from './models/Card';

const GameCanvas = ({chooseTarget, choosing, target, OnLoaded, cardOptions}) => {
  // SETTINGS //
  const angleRange = 160;

  const radius = 3.8;
  const beerRadius = 2.8;
  // --- //

  const { thisPID } = useContext(RoomContext);

  const [playingPlayers, setPlayingPlayers] = useState();

  const enemies = useRef([]);

  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  const [positions, setPositions] = useState([]);

  const recalculatePlayers = (players) => {
    if(!players) return;

    enemies.current = players.filter(player => player.pId !== thisPID).map(enemy => ({
      pId: enemy.pId,
      name: enemy.name,
    }));

    const offset = -(enemies.current.length - 1.8)/2;

    const angleOffset = angleRange/enemies.current.length;

    const poss = enemies.current.map((enemy, i) => {
      const radians = toRadians(angleOffset * (i + offset));
      const pos = {
        a: radius * Math.sin(radians),
        b: radius * Math.cos(radians),
      };
        const radiansBeer = toRadians(angleOffset * (i + offset) - 12 - (enemies.current.length - 1 - i) * 12);
      const beerPos = {
        a: beerRadius * Math.sin(radiansBeer),
        b: beerRadius * Math.cos(radiansBeer),
      };
      return { pId: enemy.pId, pos, beerPos, name: enemy.name };
    });

    setPositions(poss);
  }

  const { data } = useContext(WebsocketContext);

  useEffect(() => {
    if(data?.type === "players-loaded"){

      setPlayingPlayers(data?.players);
    }
  }, [data])

  useEffect(() => {
    recalculatePlayers(playingPlayers);
  }, [playingPlayers])

  const getTargetState = (pId) => {
    if(!choosing) return TARGET.none;

    if(target === undefined) return TARGET.choosing;
    if(pId === target) return TARGET.chosen;
    return TARGET.unchosen
  }

  return <Canvas
  onCreated={({ gl, scene }) => {
    scene.fog = new THREE.FogExp2(0x120c0c, 0.08); // Fog color and density
  }}>
    {positions.map(({pId, pos, beerPos, name}) => <>
      <Player pId={pId} position={[pos.a, 3.55, pos.b]} onClick={() => chooseTarget(pId)} name={name} targetState={getTargetState(pId)}/>
      <Beer pId={pId} position={[beerPos.a, 2.8, beerPos.b]} lookAt={[-0.35, 2.8, -1.3]} />
    </>)}
    <Beer pId={thisPID} position={[-1.4, 2.8, -2]} lookAt={[-1.4, 2.8, -5.225]}/>
    {cardOptions.map((option, index) =>
    <Card lookAt={[-1.4, 3.9, -5.225]} key={option} cardOptions={option} cardNumber={index} cardsHeldNumber={cardOptions.length}/>
    )}
    <Room OnLoad={OnLoaded}/>
    <pointLight position={[0,5.5,0]} intensity={45} color={0xfebbbb}/>
    <pointLight position={[-1.4, 4.266, -5.225]} intensity={1.5} color={0xffffff}/>
    <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={53.702} position={[-1.4, 4.266, -5.225]} rotation={[-3.108, -0.271, -3.133]} scale={1.241} />
    {/* <OrbitControls/> */}
  </Canvas>
}

export default GameCanvas