/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 .\radio.gltf 
*/
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { LoopOnce } from 'three'
import { WebsocketContext } from '../../utilComponents/WebsocketProvider'
import { useAtom } from 'jotai'
import { radioHoverAtom } from '../../atoms/atoms'

export function Radio(props) {
  const songs = ["/sounds/title-theme.mp3", "/sounds/soundtrack-2.wav", "/sounds/soundtrack-3.mp3", "/sounds/soundtrack-4.mp3"];

  const audioRef =[ useRef(new Audio("/sounds/title-theme.mp3")), useRef(new Audio("/sounds/soundtrack-2.wav")), useRef(new Audio("/sounds/soundtrack-3.mp3")), useRef(new Audio("/sounds/soundtrack-4.mp3"))];
  //const audioRef = songs.map(song => useRef(new Audio(song)));
  //const audioRef = useRef(songs.map(song => new Audio(song)));

  const [radioHover, setRadioHover] = useAtom(radioHoverAtom);
  
  const [songNum, setSongNum] = useState(1);
  const maxSongNum = songs.length;

  useEffect(() => {
    const audio = audioRef[songNum].current;
    audio.volume = 0.1;

    // Clean up audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset audio if necessary
    };
  }, [songNum]);

  const { data, send } = useContext(WebsocketContext);

  const randomTrack = () => {
    setSongNum(Math.floor(Math.random() * songs.length));
    console.log(songNum);
  }
 
  useEffect(() => {
    const audio = audioRef[songNum].current;
      if (data?.type === "join-room" && data?.radio){
        randomTrack();
        playOn();
      }
      else if (data?.type === "radio"){
        if (data?.state){
          randomTrack();
          playOn();
        }
        else{
          playOff();
          audio.pause();
          audio.currentTime = 0;
        }
      }
  }, [data])

  const group = React.useRef()
  const { scene, animations } = useGLTF('/models/radio/radio.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions, mixer } = useAnimations(animations, group)

  const [isOn, setIsOn] = useState(true);

const playOn = () => {
  console.log('playing on');
  const audio = audioRef[songNum].current;

  actions['off'].stop();
  actions['on'].setLoop(LoopOnce);
  actions['on'].clampWhenFinished = true;
  actions['on'].play();

  // Odstranit předchozí listener, kdyby tam náhodou zůstal
  audio.oncanplaythrough = null;

  // Pokud už je audio připravené, hraj rovnou
  if (audio.readyState >= 4) { // HAVE_ENOUGH_DATA
    audio.play().catch(e => console.warn("Chyba při přehrávání:", e));
  } else {
    // Jinak čekej na 'canplaythrough'
    audio.oncanplaythrough = () => {
      audio.play().catch(e => console.warn("Chyba při přehrávání:", e));
    };
    // Vynutit načtení, pokud se náhodou nespustil sám
    audio.load();
  }
};


const playOff = () => {
  const audio = audioRef[songNum].current;

  actions['on'].stop();
  actions['off'].setLoop(LoopOnce);
  actions['off'].clampWhenFinished = true;
  actions['off'].play();

  // Odstranit případný předchozí listener
  audio.oncanplaythrough = null;

  if (audio.readyState >= 2) { // HAVE_CURRENT_DATA nebo vyšší
    audio.pause();
    audio.currentTime = 0;
  } else {
    // Pokud není připraveno, počkej na načtení
    audio.oncanplaythrough = () => {
      audio.pause();
      audio.currentTime = 0;
    };
    audio.load(); // Pro jistotu vynutíme načtení
  }
};


const onClick = (event) => {
  event.stopPropagation(); // Prevents event bubbling

  const nextState = !isOn;
  setIsOn(nextState);

  if (nextState) {
    send('{"type": "radio-on"}');
    playOn();
  } else {
    send('{"type": "radio-off"}');
    playOff();
  }
}


  return (
    <group ref={group} {...props} dispose={null} onPointerDown={onClick} onPointerEnter={() => {
      document.body.style.cursor = 'pointer';
      setRadioHover(true);
    }} onPointerLeave={() => {
      document.body.style.cursor = 'auto';
      setRadioHover(false);
    }}>
        <group name="Armature" position={[-0.152, 0.162, -0.331]} rotation={[1.332, -0.041, 0.167]} scale={0.434} >
          <primitive object={nodes.Bone002} />
        </group>
    </group>
  )
}

useGLTF.preload('/radio.gltf')
