import React from 'react'
import { Sphere, useScroll } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import FakeGlowMaterial from './FakeGlowMaterial'
import { useSpring, animated } from '@react-spring/three'

export function Flies() {
    const numFlies = 6; // Number of flies to render
    
    return (
        <>
            {Array.from({ length: numFlies }).map((_, i) => (
                <FlyMesh key={i} seed={i} />
            ))}
        </>
    )
}
export default Flies;

const FlyMesh = ({ seed }) => {
    // Use seed for pseudo-random but deterministic values
    const random = (index) => {
        const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
        return x - Math.floor(x);
    };

    // Randomize starting position
    const startX = (random(0) - 0.5) * 1;
    const startY = 6.8 + (random(1) - 0.5) * 1.2;
    const startZ = (random(2) - 0.5) * 1;

    // Randomize animation path
    const positions = [
        [startX, startY, startZ],
        [startX + (random(3) - 0.5) * 0.7, startY + (random(4) - 0.5) * 0.6, startZ + (random(5) - 0.5) * 0.7],
        [startX + (random(6) - 0.5) * 0.7, startY + (random(7) - 0.5) * 0.6, startZ + (random(8) - 0.5) * 0.7],
        [startX + (random(9) - 0.5) * 0.7, startY + (random(10) - 0.5) * 0.6, startZ + (random(11) - 0.5) * 0.7],
        [startX, startY, startZ], // Return to start
    ];

    // Randomize animation speed
    const speed = 80 + random(12) * 60;

    const { position, scale } = useSpring({
        from: { position: positions[0], scale: 1 },
        to: async (next) => {
            for (let pos of positions) {
                await next({
                    position: pos,
                    scale: 0.6 + Math.sin(Date.now() / 800 + seed) * 0.4,
                });
            }
        },
        loop: true,
        config: {
            friction: 25,
            tension: speed,
        },
    });

    return (
        <animated.mesh position={position} scale={scale}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <FakeGlowMaterial
                falloff={2}
                glowInternalRadius={5}
                glowColor='yellow'
                glowSharpness={0.5}
                opacity={0.8}
            />
        </animated.mesh>
    );
};