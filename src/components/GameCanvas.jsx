import { Canvas } from "@react-three/fiber"
import Room from "./models/Room"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import Player, { PLAYER } from "./models/Player"

const GameCanvas = () => {


  const radius = 3.8;
  const offset = -0.5;

  const playerCount = 3;
  const angleRange = 210;

  const angleOffset = angleRange/playerCount;
  
  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  const positions = [];

  for (let i = 0 + offset; i < playerCount + offset; i++){
    const pos = {
      a: radius * Math.sin(toRadians(angleOffset * i)),
      b: radius * Math.cos(toRadians(angleOffset * i)),
    };
    console.log(pos);
    positions.push(pos);
  }

  return <Canvas>
    {positions.map(({a,b}) => <Player position={[a, 3.55, b]} playerState={PLAYER.shootBeer}/>)}
    <Room />
    <ambientLight />
    <Environment preset='sunset'/>
    <PerspectiveCamera makeDefault={true} far={1000} near={0.1} fov={53.702} position={[-1.4, 4.266, -5.225]} rotation={[-3.108, -0.271, -3.133]} scale={1.241} />
  </Canvas>
}

export default GameCanvas