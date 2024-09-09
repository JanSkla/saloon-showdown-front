import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber"
import Room from "./models/Room"
import { Environment, PerspectiveCamera, OrbitControls, useProgress, Html, Text } from "@react-three/drei"
import Player from "./models/Player"
import React, { lazy, useContext, useEffect, useRef, useState } from "react"
import { RoomContext } from "../utilComponents/RoomDataProvider"
import Beer from "./models/Beer"
import { WebsocketContext } from '../utilComponents/WebsocketProvider';
import { TARGET } from './models/TargetFrame';
import Card from './models/Card';
import Bartender from './models/Bartender';
import MainCamera from './models/MainCamera';
import ReadyText from './models/ReadyText';
import { Radio } from './models/Radio';

const EmptyLazy = lazy(() => import("../utilComponents/EmptyLazy"))


const GameCanvas = ({chooseTarget, choosing, target, cardOptions, sendChoice, gameState, OnLoaded}) => {
  // SETTINGS //
  const angleRange = 160;

  const radius = 3.8;
  const beerRadius = 2.8;
  // --- //

  const { thisPID } = useContext(RoomContext);

  const [playingPlayers, setPlayingPlayers] = useState([]);
  const enemies = useRef([]);

  const [chosen, setChosen] = useState();
  const cardChosen = (chosen) => {
    setChosen(chosen)
  }


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
    
    const rightPIDS = []

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
      const returnrightPIDS = [...rightPIDS];
      rightPIDS.push(enemy.pId);
      return { pId: enemy.pId, pos, beerPos, name: enemy.name, rightPIDS: returnrightPIDS};
    });

    setPositions(poss);
  }

  const { data, send } = useContext(WebsocketContext);

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if(data?.type === "loaded-data"){
      setPlayingPlayers(data?.players);
    }
    else if(data?.type === "load-game"){
      setPlayingPlayers(data?.players);
      setIsReady(false);
    }
  }, [data])

  useEffect(() => {
    console.log(playingPlayers)
    recalculatePlayers(playingPlayers);
  }, [playingPlayers])

  useEffect(() =>{
    if(gameState === "stop-choice") {
      setChosen(undefined)
    }
  }, [gameState])


  const getTargetState = (pId) => {
    if(!choosing) return TARGET.none;

    if(target === undefined) return TARGET.choosing;
    if(pId === target) return TARGET.chosen;
    return TARGET.unchosen
  }

  const Loader = () => {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };

  return <Canvas
  style={{backgroundColor: '#0d0a0a'}}
  onCreated={({ gl, scene }) => {
    scene.fog = new THREE.FogExp2(0x120c0c, 0.08); // Fog color and density
  }}>
    <React.Suspense fallback={<Loader />}>
    {positions.map(({pId, pos, beerPos, name, rightPIDS}) => <>
      <Player pId={pId} position={[pos.a, 3.55, pos.b]} onClick={() => chooseTarget(pId)} name={name} targetState={getTargetState(pId)} rightPIDS={rightPIDS}/>
      <Beer pId={pId} position={[beerPos.a, 2.8, beerPos.b]} lookAt={[-0.35, 2.8, -1.3]} />
    </>)}
    <Beer pId={thisPID} position={[-1.4, 2.8, -2]} lookAt={[-1.4, 2.8, -5.225]}/>
    {cardOptions.map((option, index) =>
    <Card lookAt={[-1.4, 3.9, -5.225]} key={option} cardOptions={option} cardNumber={index} cardsHeldNumber={cardOptions.length} sendChoice={sendChoice} cardChosen={cardChosen} isChosen={chosen}/>
    )}
    {!isReady && <ReadyText onClick={e => {
      send(JSON.stringify({type: "ready"}));
      setIsReady(true)
      document.body.style.cursor = 'auto';
    }}>Ready</ReadyText>}
    <Room rotation={[0, 3, 0]} position={[2.8, 0, 2]}/>
    <pointLight position={[0,5.5,0]} intensity={45} color={0xfebbbb}/>
    <pointLight position={[-1.4, 4.266, -5.225]} intensity={1.5} color={0xffffff}/>
    <pointLight position={[8,4.5,-3]} intensity={3} color={0xfebbbb}/>
    {/* <pointLight position={[6,6,9]} intensity={8} color={0xfebbbb}/> */}
    <Environment preset="dawn" environmentIntensity={0.1} environmentRotation={[0,3,1]}/>

    <MainCamera />
    <Bartender/>
    <EmptyLazy OnLoaded={OnLoaded}/>
    <Radio position={[11.8, 4.18, 4]} scale={1.7} rotation={[0,3,0]}/>
    </React.Suspense>
     {/* <OrbitControls/> */}
  </Canvas>
}

export default GameCanvas