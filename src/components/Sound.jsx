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
      sound.current.setBuffer(buffer)
      sound.current.setRefDistance(1)
      sound.current.setLoop(false)
      sound.current.setDetune(isPlayer ? 0 : -400)
      sound.current.play()
      camera.add(listener)
      return () => camera.remove(listener)
    }, [])
    return <positionalAudio ref={sound} args={[listener]} />
}

export default Sound;
