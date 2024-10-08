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
  
  const audioRef = useRef(new Audio("/sounds/title-theme.mp3"));

  const [radioHover, setRadioHover] = useAtom(radioHoverAtom);
  
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.5;

    // Clean up audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset audio if necessary
    };
  }, []);

  const { data, send } = useContext(WebsocketContext);
 
  useEffect(() => {
      if (data?.type === "join-room" && data?.radio){
        playOn();
      }
      else if (data?.type === "radio"){
        if (data?.state){
          playOn();
        }
        else{
          playOff();
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
    actions['off'].stop();
    actions['on'].setLoop(LoopOnce);
    actions['on'].clampWhenFinished = true;
    actions['on'].play();
    audioRef.current.play();
  }

  const playOff = () => {
    actions['on'].stop();
    actions['off'].setLoop(LoopOnce);
    actions['off'].clampWhenFinished = true;
    actions['off'].play();
    audioRef.current.pause();
  }

  const onCLick = (event) => {
    event.stopPropagation(); // Prevents event bubbling
    setIsOn(!isOn);
    if (isOn){
      send('{"type": "radio-on"}');
      playOn();
    }
    else{
      send('{"type": "radio-off"}');
      playOff();
    }
  }

  return (
    <group ref={group} {...props} dispose={null} onPointerDown={onCLick} onPointerEnter={() => {
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
