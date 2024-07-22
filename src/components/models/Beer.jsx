import * as THREE from 'three';
import { useLoader } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from 'react';
import { WebsocketContext } from '../../utilComponents/WebsocketProvider';

const BEER = {
  none: 0,
  full: 1,
  destroy: 2
}

export default function Beer({pId, position, lookAt}) {

  const textureLocation = '/images/beer/';

  const variants = [
    undefined,
    useLoader(THREE.TextureLoader, textureLocation + 'beer.png'),
    useLoader(THREE.TextureLoader, textureLocation + 'beer_shoot.png')
  ];
  
  const planeRef = useRef();
  
  const { data } = useContext(WebsocketContext);

  const [beerState, setBeerState] = useState(BEER.none);

  useEffect(() => {

    if(data?.type === "start-countdown"){
      setBeerState(BEER.none);
    }
    else if(data?.type === "round-actions" && data?.data){
      data.data.forEach(action => {
        
        if(action.target == pId){
          switch (action.type) {
            case "shoot-drinking-beer":
            case "shoot-beer":
              setBeerState(BEER.destroy);
              const timeoutId = setTimeout(() => {
                setBeerState(BEER.none);
              }, 500);
          
              // Cleanup function to clear the timeout if the component unmounts
              return () => clearTimeout(timeoutId);
              break;
          }
        }
        if(action.user == pId){
          switch (action.type) {
            case "recieved-beer":
              setBeerState(BEER.full);
              break;
            case "finished-beer":
            case "started-beer":
              setBeerState(BEER.none);
              break;
          }
        }
      })
    }
  }, [data]);

  useEffect(() => {
    if (planeRef.current) {
      planeRef.current.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    }
  }, [])

  // plane version
  return <mesh
    position={position} // Position it at the origin
    ref={planeRef}
    renderOrder={1}
  >
    {!!variants[beerState] && <>
      <planeGeometry args={[3.16/3.3, 5.12/3.3]} />
      <meshStandardMaterial 
          side={THREE.DoubleSide}
          map={variants[beerState]}
          transparent
          alphaTest={0.1}
          depthWrite={false} // Disable depth writing
          depthTest={false} // Disable depth testing
          />
      </>}
  </mesh>


  //sprite version (not affected by light, always faces camera)

  // return <sprite position={position}>
  //   <spriteMaterial attach="material" map={beerTexture} />
  // </sprite>
}