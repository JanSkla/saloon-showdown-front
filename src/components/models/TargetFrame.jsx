import * as THREE from 'three';
import { useLoader } from "@react-three/fiber"

export const TARGET = {
  choosing: 0,
  unchosen: 1,
  chosen: 2,
  none: 3,
}

export const TargetFrame = ({position, targetState, visible}) => {

  const texture = useLoader(THREE.TextureLoader, targetState === TARGET.chosen ? '/images/frame/frame_target.png' : '/images/frame/frame.png');
  // Adjust texture filtering for a pixelated look
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  return <sprite position={position} scale={2} visible={visible && targetState !== TARGET.none} renderOrder={2}>
  <spriteMaterial
      attach="material"
      map={texture}
      depthTest={false}
      depthWrite={false}
      fog={false}
      toneMapped={false}
      opacity={targetState === TARGET.unchosen ? 0.5 : 1}
    />
  </sprite>
}