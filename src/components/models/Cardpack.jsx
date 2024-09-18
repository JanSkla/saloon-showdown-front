/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 cardpack.gltf 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Cardpack(props) {
  const { nodes, materials } = useGLTF('/models/cardpack/cardpack.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.room001.geometry} material={materials['Material.010']} scale={8} />
    </group>
  )
}

useGLTF.preload('/cardpack.gltf')
