import React, { useRef, useEffect, useState } from 'react';
import Spritesheet from 'react-responsive-spritesheet';

const PlayerSpritesheets = ({ positions, shootingPlayers }) => {
  const spritesheetRefs = useRef({});

  useEffect(() => {
    if (shootingPlayers && shootingPlayers.length > 0) {
      shootingPlayers.forEach(pId => {
        if (spritesheetRefs.current[pId]) {
          spritesheetRefs.current[pId].goToAndPlay(1);
        }
      });
    }
  }, [shootingPlayers]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
      {positions.map(({ pId }) => (
        <Spritesheet
          key={`spritesheet-${pId}`}
          getInstance={spritesheet => {
            spritesheetRefs.current[pId] = spritesheet;
          }}
          image="/images/cowboy/enemy/enemy-shoot-flare.png"
          widthFrame={300}
          heightFrame={450}
          startAt={30}
          fps={16}
          autoplay={false}
          loop={false}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            width: '150px',
            height: '225px',
            left: '680px',
            top: `420px`,
          }}
        />
      ))}
    </div>
  );
};

export default PlayerSpritesheets;