import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useRef, useEffect, useState } from 'react'
import {  useThree, useLoader } from '@react-three/fiber'

const Sound = ({url, isPlayer}) => {
    const sound = useRef()
    const { camera } = useThree()
    const [listener] = useState(() => new THREE.AudioListener())
    const buffer = useLoader(THREE.AudioLoader, url)
useEffect(() => {
  if (!sound.current || !buffer) return;

  sound.current.setBuffer(buffer);
  sound.current.setRefDistance(1);
  sound.current.setLoop(false);
  sound.current.setDetune(isPlayer ? 0 : -100);

  camera.add(listener);

  if (sound.current.buffer) {
    sound.current.play();
  }

  return () => {
    camera.remove(listener);
    if (sound.current && sound.current.isPlaying) {
      sound.current.stop();
    }
  };
}, [buffer]);

    return <positionalAudio ref={sound} args={[listener]} />
}

export default Sound;
