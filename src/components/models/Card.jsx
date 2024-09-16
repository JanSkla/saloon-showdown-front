import * as THREE from 'three';
import { useFrame, useLoader } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from 'react';
import { WebsocketContext } from '../../utilComponents/WebsocketProvider';
import { useSpring, animated } from '@react-spring/three'
import ThrowingCard from './CardThrow';

const positions = [
    [[-1.18, 3.85, -4.425]],
    [[-1.08, 3.85, -4.620 ], [-1.36, 3.85, -4.535]],
    [[-1.18, 3.85, -4.425], [-1.45, 3.85, -4.435], [-0.94, 3.85, -4.55]],
    [[-1.08, 3.91, -4.6 ], [-1.36, 3.91, -4.535], [-0.7, 3.85, -4.6], [-1.66, 3.87, -4.45]]
];

const CARD = {
  ammo: 0,
  block: 1,
  order: 2,
  drink: 3,
  shoot: 4,
  back: 5
}

export default function Card({lookAt, cardNumber, cardsHeldNumber, cardOptions, sendChoice, cardChosen, isChosen}) {
  const textureLocation = '/images/cards/';

  const variants = [
    useLoader(THREE.TextureLoader, textureLocation + 'ammo.png'),
    useLoader(THREE.TextureLoader, textureLocation + 'shield.png'),
    useLoader(THREE.TextureLoader, textureLocation + 'beer-order.png'),
    useLoader(THREE.TextureLoader, textureLocation + 'beer-drink.png'),
    useLoader(THREE.TextureLoader, textureLocation + 'shoot.png')
  ];

  const planeRef1 = useRef();
  
  const { data } = useContext(WebsocketContext);
  const cardScale = 0.05;

  const [cardOption, setCardOption] = useState();
  // const [active, setActive] = useState(false);
  const cardPosition = positions[cardsHeldNumber - 1][cardNumber]
  const cardX = cardPosition[0];
  const [cardY, setCardY] = useState(cardPosition[1]);
  const cardZ = cardPosition[2];

  const {position} = useSpring({
    from: {
      position: cardY,
    },
    to: {
      position: cardY + 0.05,
    }
  })

  useEffect(() => {
    if( isChosen !== undefined && isChosen !== cardOptions) {
      setCardY(-1)
    } else if(isChosen !== undefined && isChosen === cardOptions) {
      setTimeout(() => {
        setCardY(cardY - 0.4)
      }, 150)
    }
  }, [isChosen])

  const [fireSize, setFireSize] = useState(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    switch (cardOptions) {
        case "ammo":
            setCardOption(CARD.ammo)
            break;
        case "block":
            setCardOption(CARD.block)
            break;
        case "order-beer":
            setCardOption(CARD.order)
            break;
        case "drink-beer":
            setCardOption(CARD.drink)
            break;
        case "shoot":
            setCardOption(CARD.shoot)
            break;
        case "back":
            setCardOption(CARD.back)
            break;
    }
    setFireSize(1);
    startTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (planeRef1.current) {
      planeRef1.current.lookAt(lookAt[0], lookAt[1], lookAt[2]);
    }
  }, [])

  // const positionX = positions[cardsHeldNumber - 1][cardNumber][0];
  // const { positionY } = useSpring({ positionY: active ? positions[cardsHeldNumber - 1][cardNumber].splice(1, 1, 3.95)[1] : positions[cardsHeldNumber - 1][cardNumber][1] })

  // const positionZ = positions[cardsHeldNumber - 1][cardNumber][2];
  // console.log([positionX, positionY, positionZ])
  //[-1.4, 2.8, -5.225]  view pozice
    // 1 karta [-1.18, 3.85, -4.425]
    // 2 karty [-1.08, 3.85, -4.620 ], [-1.36, 3.85, -4.535]
    // 3 karty [-1.18, 3.85, -4.425], [-1.45, 3.85, -4.435], [-0.94, 3.85, -4.55]
    // 4 karty [-1.08, 3.85, -4.620 ], [-1.36, 3.85, -4.535], [-0.7, 3.81, -4.6], [-1.65, 3.82, -4.5]

    const handleCardChosen = (option) => {
      sendChoice(option);
      cardChosen(option)
    }



    useFrame(({ clock }) => {
      if(clock.oldTime - startTimeRef.current < 3300) return;
      setFireSize(1 + Math.abs(Math.sin((clock.oldTime - startTimeRef.current - 3300)/500))/16)
      if(clock.oldTime - startTimeRef.current > 7900)
        setCardY(cardY - 0.1)
    });

  return (
    <>
  <animated.mesh
  position-x={cardX}
    position-y={position} // Position it at the origin
    position-z={cardZ}
    ref={planeRef1}
    renderOrder={1}
    onPointerEnter={(e) => setCardY(cardY + 0.1)} 
  onPointerLeave={(e) => {
    if (!isChosen)
      setCardY(cardPosition[1])
  }} 
  onClick={(e) => handleCardChosen(cardOptions)}
  >
          {!!variants[cardOption] && <>
      <mesh position={[0,0,0]} scale={fireSize} >
        <planeGeometry args={[5 * cardScale, 7 * cardScale]}/>
          
        <meshStandardMaterial
            alphaMap={variants[cardOption]}
            side={THREE.DoubleSide}
            transparent
            alphaTest={0.1}
            depthWrite={false} // Disable depth writing
            depthTest={false} // Disable depth testing
            flatShading={true}
            color={'red'}
            />
      </mesh>
      <planeGeometry args={[5 * cardScale, 7* cardScale]} />
          
      <meshStandardMaterial 
          side={THREE.DoubleSide}
          map={variants[cardOption]}
          transparent
          alphaTest={0.1}
          depthWrite={false} // Disable depth writing
          depthTest={false} // Disable depth testing
          flatShading={true}
          />
      </>}
  </animated.mesh>
  {isChosen !== undefined && isChosen === cardOptions ? <ThrowingCard/> : null}
  </>

)}