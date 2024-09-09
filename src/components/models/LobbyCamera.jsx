import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from 'jotai';
import { radioHoverAtom } from '../../atoms/atoms';

const states = [
  {m: 0.025, f: 32.5},
  {m: 0.03, f: 10.5},
  {m: 0.001, f: 5.5}
]

const ZOOM = {
  default: 0,
  mid: 1,
  max: 2
}

const LobbyCamera = () => {
  const { scene } = useThree();

  const [radioHover, setRadioHover] = useAtom(radioHoverAtom);// Ref to store the current value of radioHover
  const radioHoverRef = useRef(radioHover);

  // Keep the ref updated with the latest value
  useEffect(() => {
    radioHoverRef.current = radioHover;
  }, [radioHover]);

  const [zoom, _setZoom] = useState(ZOOM.default);

  const zoomRef = useRef(zoom);

  const cameraRef = useRef();
  const cameraParentRef = useRef()

  const raycaster = useRef(new THREE.Raycaster());

  const setZoom = val => {
    const pointer = new THREE.Vector2(cursor.current.x, -cursor.current.y);
    const prev = zoomRef.current;
    zoomRef.current = val;
    _setZoom(val);
    if (cameraRef.current) {
      raycaster.current.setFromCamera(pointer, cameraRef.current);
      const intersects = raycaster.current.intersectObjects(scene.children);
      if(prev === ZOOM.default && intersects[0]){
        const to = intersects[0].point;
        cameraParentRef.current.lookAt(to);
      }
      else if (val === ZOOM.default) {
        cameraParentRef.current.rotation.x = 0
        cameraParentRef.current.rotation.y = 1.95 + Math.PI
        cameraParentRef.current.rotation.z = 0
      }
    }
  }

  const cursor = useRef({x:0, y:0});
  const MULTIPLIER = states[zoom].m;

  const onMouseDown = () => {
    if (radioHoverRef.current) return;
    setZoom(ZOOM.mid);
    document.body.style.cursor = 'none';
  }

  useEffect(() => {
    document.addEventListener('mousemove', event => {
      cursor.current = {x:event.clientX/window.innerWidth*2 - 1, y:event.clientY/window.innerHeight*2 - 1}
    })
    document.getElementById("saloon_canvas").addEventListener("mousedown", onMouseDown)

    document.getElementById("saloon_canvas").addEventListener("mouseup", () => {
      if(zoomRef.current === ZOOM.default) return;
      setZoom(ZOOM.default);
      document.body.style.cursor = 'auto';
    })
    document.addEventListener("mousewheel", e =>  {
      if(e.wheelDelta > 0) {
        if(zoomRef.current === ZOOM.mid) setZoom(ZOOM.max);
      }
      else {
        if(zoomRef.current === ZOOM.max) setZoom(ZOOM.mid);
      }
    });
  //return () => document.removeEventListener("mousewheel", wheel);
  }, [])


  //zoom image
  const zoomMap = useLoader(THREE.TextureLoader, "/images/zoom0001.png");
  const zoomImgRef = useRef();
  //--


  useFrame(({ clock }) => {
    if (!cameraRef.current) return;

    const x = (-Math.sign(cursor.current.y) + Math.sign(cursor.current.y) * Math.pow(cursor.current.y - Math.sign(cursor.current.y), 2));
    const y = (-Math.sign(cursor.current.x) + Math.sign(cursor.current.x) * Math.pow(cursor.current.x - Math.sign(cursor.current.x), 2));

    cameraRef.current.rotation.x = -x * MULTIPLIER;
    cameraRef.current.rotation.y = Math.PI + y * MULTIPLIER;

    zoomImgRef.current.rotation.x = -x * MULTIPLIER/2;
    zoomImgRef.current.rotation.y = y * 2 *MULTIPLIER;
  })

  return <>
  <mesh ref={cameraParentRef} position={[42, 5.9, -12.1]} rotation={[0, 1.95 + Math.PI, 0]}>
    <mesh
    ref={zoomImgRef}>
  <mesh
    position={[0,0,zoom === ZOOM.mid ? 2 : 5]}
    renderOrder={1}
    visible={zoom !== ZOOM.default}
  >
      <planeGeometry args={[1.6, 0.9]} />
      <meshStandardMaterial 
          map
          side={THREE.DoubleSide}
          map={zoomMap}
          transparent
          alphaTest={0.1}
          depthWrite={false} // Disable depth writing
          depthTest={false} // Disable depth testing
          />
  </mesh>
    </mesh>
    <PerspectiveCamera ref={cameraRef} makeDefault={true} far={1000} near={0.1} fov={states[zoom].f} scale={1.241} rotation={[0,Math.PI,0]}/>
  </mesh>
  </>
  }
export default LobbyCamera;