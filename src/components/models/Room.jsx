/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 room.gltf 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Room(props) {
  const { nodes, materials } = useGLTF('/models/room/room.gltf', undefined, undefined)
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.stul.geometry} material={materials['Material.001']} position={[4.633, 1.423, 0.084]} scale={0.83} />
      <mesh geometry={nodes.Cube.geometry} material={materials['Material.002']} position={[0, 1.432, 0]} scale={5.719} />
      <mesh geometry={nodes.Cube014.geometry} material={materials['Material.001']} position={[-3.371, 8.517, 10.309]} rotation={[0, -Math.PI / 2, 0]} />
      <mesh geometry={nodes.Cube011.geometry} material={materials['Material.001']} position={[-4.983, 8.517, -0.504]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh geometry={nodes.Cube006.geometry} material={materials['Material.001']} position={[9.256, 7.496, 9.112]} rotation={[0, Math.PI / 2, 0]} />
      <mesh geometry={nodes.Cube005.geometry} material={materials['Material.001']} position={[9.256, 7.496, -9.124]} rotation={[Math.PI, 0, Math.PI]} />
      <mesh geometry={nodes.Cube004.geometry} material={materials['Material.001']} position={[-9.153, 7.496, -9.124]} rotation={[0, -Math.PI / 2, 0]} />
      <mesh geometry={nodes.Plane.geometry} material={materials['Material.003']} position={[-9.97, 1.433, -9.007]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Plane001.geometry} material={materials['Material.003']} position={[9.998, 1.433, -9.007]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Plane003.geometry} material={materials['Material.003']} position={[-8.944, 1.433, 9.917]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} />
      <mesh geometry={nodes.Cube002.geometry} material={materials['Material.001']} position={[-8.665, 8.517, 10.259]} rotation={[0, -Math.PI / 2, 0]} />
      <mesh geometry={nodes.Cube001.geometry} material={materials['Material.001']} position={[-0.524, 1.34, 10.733]} />
      <mesh geometry={nodes.Cube003.geometry} material={materials['Material.001']} position={[10.783, 1.34, 0.399]} rotation={[0, Math.PI / 2, 0]} />
      <group position={[0.657, 1.34, -10.74]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh geometry={nodes.Cube030_1.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Cube030_2.geometry} material={materials['Material.003']} />
      </group>
      <mesh geometry={nodes.Cube012.geometry} material={materials['Material.001']} position={[-10.735, 1.34, -0.211]} rotation={[0, -1.571, 0]} />
      <mesh geometry={nodes.Cube013.geometry} material={materials['Material.004']} position={[-3.825, 1.358, 4.384]} />
      <mesh geometry={nodes.Cube015.geometry} material={materials['Material.005']} position={[-3.825, 2.769, 4.384]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube016.geometry} material={materials['Material.006']} position={[-9.259, 4.684, 4.384]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube017.geometry} material={materials['Material.007']} position={[-9.315, 2.86, 4.384]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube018.geometry} material={materials['Material.009']} position={[-9.034, 1.358, -3.96]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube019.geometry} material={materials['Material.010']} position={[-5.924, 1.321, -9.628]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube020.geometry} material={materials['Material.011']} position={[-5.992, 1.321, -4.558]} rotation={[0, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube022.geometry} material={materials['Material.013']} position={[-8.795, -0.601, 1.235]} rotation={[0, 0, -Math.PI / 2]} />
      <group position={[-6.242, 3.742, -8.452]} rotation={[0, 0, -Math.PI / 2]} scale={1.542}>
        <mesh geometry={nodes.Cylinder003_1.geometry} material={materials['Material.002']} />
        <mesh geometry={nodes.Cylinder003_2.geometry} material={materials['Material.001']} />
      </group>
      <group position={[-6.242, 3.742, -5.37]} rotation={[0, 0, -Math.PI / 2]} scale={1.542}>
        <mesh geometry={nodes.Cylinder006_1.geometry} material={materials['Material.015']} />
        <mesh geometry={nodes.Cylinder006_2.geometry} material={materials['Material.016']} />
      </group>
      <mesh geometry={nodes.Cube021.geometry} material={materials['Material.017']} position={[-5.319, 3.509, -8.634]} scale={0.078} />
      <mesh geometry={nodes.Cube023.geometry} material={materials['Material.018']} position={[-5.319, 3.509, -5.336]} scale={0.078} />
      <mesh geometry={nodes.Cylinder002.geometry} material={materials['Material.020']} position={[-9.633, 5.893, 8.863]} scale={0.269} />
      <mesh geometry={nodes.Cylinder003.geometry} material={materials['Material.021']} position={[-9.633, 5.893, 7.483]} scale={0.269} />
      <mesh geometry={nodes.Cylinder004.geometry} material={materials['Material.022']} position={[-9.633, 5.893, 8.204]} scale={0.269} />
      <mesh geometry={nodes.Cylinder005.geometry} material={materials['Material.023']} position={[-4.289, 3.988, -0.39]} rotation={[Math.PI, -1.222, Math.PI]} scale={0.269} />
      <mesh geometry={nodes.Cylinder006.geometry} material={materials['Material.024']} position={[-9.633, 5.893, 6.145]} scale={0.269} />
      <mesh geometry={nodes.Cylinder007.geometry} material={materials['Material.025']} position={[-9.633, 5.893, 6.823]} scale={0.269} />
      <group position={[6.546, 6.112, -9.972]} rotation={[-Math.PI, 0, -Math.PI / 2]}>
        <mesh geometry={nodes.Cube004_1.geometry} material={materials['Material.031']} />
        <mesh geometry={nodes.Cube004_2.geometry} material={materials['Material.032']} />
        <mesh geometry={nodes.Cube004_3.geometry} material={materials['Material.033']} />
        <mesh geometry={nodes.Cube004_4.geometry} material={materials['Material.034']} />
      </group>
      <mesh geometry={nodes.Cube027.geometry} material={materials['Material.035']} position={[1.702, 2.858, -9.945]} rotation={[-Math.PI, 0, -Math.PI / 2]} />
      <group position={[-4.453, 6.112, -9.972]} rotation={[-Math.PI, 0, -Math.PI / 2]}>
        <mesh geometry={nodes.Cube010_1.geometry} material={materials['Material.036']} />
        <mesh geometry={nodes.Cube010_2.geometry} material={materials['Material.037']} />
        <mesh geometry={nodes.Cube010_3.geometry} material={materials['Material.038']} />
        <mesh geometry={nodes.Cube010_4.geometry} material={materials['Material.039']} />
      </group>
      <mesh geometry={nodes.Cube025.geometry} material={materials['Material.040']} position={[5.513, 6.112, -10.017]} rotation={[-Math.PI, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube026.geometry} material={materials['Material.041']} position={[6.87, 4.969, -10.017]} rotation={[-Math.PI, 0, 0]} />
      <mesh geometry={nodes.Cube028.geometry} material={materials['Material.042']} position={[-4.15, 4.969, -10.017]} rotation={[-Math.PI, 0, 0]} />
      <mesh geometry={nodes.Cube029.geometry} material={materials['Material.043']} position={[-5.507, 6.112, -10.017]} rotation={[-Math.PI, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube030.geometry} material={materials['Material.044']} position={[-1.493, 2.858, -9.945]} rotation={[-Math.PI, 0, -Math.PI / 2]} />
      <mesh geometry={nodes.Cube031.geometry} material={materials['Material.045']} position={[0.121, 5.573, -9.945]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Cube032.geometry} material={materials['Material.046']} position={[0.01, 10.831, 0]} scale={5.719} />
      <group position={[-9.688, 5.866, 0.656]} scale={0.196}>
        <mesh geometry={nodes.Cylinder005_1.geometry} material={materials['Material.047']} />
        <mesh geometry={nodes.Cylinder005_2.geometry} material={materials['Material.048']} />
      </group>
      <group position={[-9.688, 5.866, 0.193]} scale={0.196}>
        <mesh geometry={nodes.Cylinder014.geometry} material={materials['Material.049']} />
        <mesh geometry={nodes.Cylinder014_1.geometry} material={materials['Material.050']} />
      </group>
      <group position={[-9.688, 5.866, -0.244]} scale={0.196}>
        <mesh geometry={nodes.Cylinder015_1.geometry} material={materials['Material.051']} />
        <mesh geometry={nodes.Cylinder015_2.geometry} material={materials['Material.052']} />
      </group>
      <mesh geometry={nodes.Cube033.geometry} material={materials['Material.055']} position={[-4.534, 1.321, 4.346]} rotation={[0, 0, -Math.PI / 2]} />
      <group position={[-9.688, 5.866, -0.661]} scale={0.196}>
        <mesh geometry={nodes.Cylinder017.geometry} material={materials['Material.057']} />
        <mesh geometry={nodes.Cylinder017_1.geometry} material={materials['Material.058']} />
      </group>
      <group position={[3.376, 8.632, 1.521]} scale={0.057}>
        <mesh geometry={nodes.Cylinder022.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Cylinder022_1.geometry} material={materials['Material.060']} />
      </group>
    </group>
  )
}

useGLTF.preload('/room.gltf')
