/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 .\models\room\room.gltf 
*/

import React, { useRef } from 'react'
import { PerspectiveCamera, useGLTF } from '@react-three/drei'

export default function Room(props) {
  const { nodes, materials } = useGLTF('/models/room/room.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.table.geometry} material={materials['Material.001']} position={[-0.02, 5.898, -0.027]} rotation={[0, -0.413, 0]} scale={3.502} />
      <mesh geometry={nodes.walls.geometry} material={materials['Material.004']} position={[4.152, 0, 1.114]} scale={9.98} />
      <mesh geometry={nodes.floor.geometry} material={materials['Material.002']} position={[4.152, 0, 1.114]} scale={9.98} />
      <mesh geometry={nodes.ceiling.geometry} material={materials['Material.003']} position={[4.152, 11.426, 1.114]} scale={9.98} />
      <mesh geometry={nodes.walls001.geometry} material={materials['Material.004']} position={[4.152, 0, 1.114]} scale={9.98} />
      <mesh geometry={nodes.walls002.geometry} material={materials['Material.004']} position={[4.152, 0, 1.114]} scale={9.98} />
      <mesh geometry={nodes.walls003.geometry} material={materials['Material.004']} position={[4.152, 0, 1.114]} scale={9.98} />
      <mesh geometry={nodes.Cube.geometry} material={materials['Material.005']} position={[23.692, 0, -8.017]} />
      <mesh geometry={nodes.Cube001.geometry} material={materials['Material.005']} position={[4.152, 0, -8.017]} />
      <mesh geometry={nodes.Cube002.geometry} material={materials['Material.005']} position={[23.692, 0, 11.566]} />
      <mesh geometry={nodes.Cube003.geometry} material={materials['Material.005']} position={[4.156, 0, 11.575]} />
      <mesh geometry={nodes.Cube004.geometry} material={materials['Material.005']} position={[14.659, 11.895, 1.114]} />
      <mesh geometry={nodes.Cube005.geometry} material={materials['Material.005']} position={[-4.9, 11.895, 1.114]} />
      <mesh geometry={nodes.Cube006.geometry} material={materials['Material.005']} position={[4.116, 11.895, -9.396]} rotation={[0, 1.571, 0]} />
      <mesh geometry={nodes.Cube007.geometry} material={materials['Material.005']} position={[4.116, 11.895, 10.168]} rotation={[0, 1.571, 0]} />
      <mesh geometry={nodes.Cube008.geometry} material={materials['Material.005']} position={[4.156, 9.445, 11.106]} />
      <mesh geometry={nodes.Cube010.geometry} material={materials['Material.005']} position={[12.905, 10.163, 10.91]} rotation={[0, 1.571, 0]} />
      <mesh geometry={nodes.Cube011.geometry} material={materials['Material.005']} position={[23.668, 9.445, 11.106]} />
      <mesh geometry={nodes.Cube012.geometry} material={materials['Material.005']} position={[12.905, 10.163, -8.623]} rotation={[0, 1.571, 0]} />
      <mesh geometry={nodes.Cube013.geometry} material={materials['Material.005']} position={[13.926, 10.163, -7.636]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh geometry={nodes.Cube014.geometry} material={materials['Material.005']} position={[-5.631, 10.163, -7.636]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh geometry={nodes.Cube015.geometry} material={materials['Material.005']} position={[-4.63, 10.163, -8.643]} rotation={[0, -Math.PI / 2, 0]} />
      <mesh geometry={nodes.Cube016.geometry} material={materials['Material.005']} position={[-4.63, 10.163, 10.91]} rotation={[0, -Math.PI / 2, 0]} />
      <mesh geometry={nodes.Cube009.geometry} material={materials['Material.005']} position={[7.967, 5.699, 11.106]} />
      <mesh geometry={nodes.Cube017.geometry} material={materials['Material.005']} position={[4.838, 5.699, 11.106]} />
      <mesh geometry={nodes.Cube018.geometry} material={materials['Material.005']} position={[7.799, 4.27, 11.106]} rotation={[0, 0, 2.652]} />
      <mesh geometry={nodes.Cube019.geometry} material={materials['Material.005']} position={[4.838, 5.699, 11.106]} />
    </group>
  )
}

useGLTF.preload('/room.gltf')
