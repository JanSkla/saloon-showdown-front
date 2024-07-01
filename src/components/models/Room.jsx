/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 .\models\room\room.gltf 
*/

import React from 'react'
import {  useGLTF } from '@react-three/drei'

export default function Room(props) {
  
  const { nodes, materials } = useGLTF('/models/room/room.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.table.geometry} material={materials['Material.001']} position={[-0.02, 5.898, -0.027]} rotation={[0, -0.413, 0]} scale={3.502} />
      <group scale={9.98}>
        <mesh geometry={nodes.Plane007.geometry} material={materials['Material.006']} />
        <mesh geometry={nodes.Plane007_1.geometry} material={materials['Material.007']} />
        <mesh geometry={nodes.Plane007_2.geometry} material={materials['Material.008']} />
        <mesh geometry={nodes.Plane007_3.geometry} material={materials['Material.009']} />
      </group>
    </group>
  )
}

useGLTF.preload('/room.gltf')
