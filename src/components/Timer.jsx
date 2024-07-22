import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const Timer = ({timer}) => {
  
  const controls = useAnimation();

  const variants = {
    initial: { width: '100%', background: '#00ff00', height: '100%', borderRadius: 15 },
    final: { width: '100%', background: '#ff0000', height: '0%', borderRadius: 15 }
  }

  const play = (dur) => {
    controls.start({
      ...variants.initial,
      transition: { duration: 0.01, ease: 'anticipate' }
    }).then(() => {
      controls.start({
        ...variants.final,
        transition: { duration: dur/1000, ease: 'linear' }
      });
    });
  }

  useEffect(() => {
    console.log("AAAA", timer.duration)
    play(timer.duration);
  },[timer]);

  return <div style={{width: '100%', background: '#ffffff55', height: '100%', borderRadius: 15, overflow: 'hidden', alignContent: 'flex-end', padding: 2}}>
      <motion.div
          initial={variants.initial}
          animate={controls}
          variants={variants}
      />
  </div>
}

export default Timer;