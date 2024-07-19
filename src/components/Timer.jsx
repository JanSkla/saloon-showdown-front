import { motion } from 'framer-motion';

const Timer = ({duration, onAnimationComplete}) => {

  return <div style={{width: '100%', background: 'lightgreen', height: '100%', borderRadius: 5, overflow: 'hidden', alignContent: 'flex-end'}}>
      <motion.div
          key={duration}
          initial={{ width: '100%', background: 'green', height: '100%', borderRadius: 5 }}
          animate={{ height: '0%'}}
          transition={{ duration: duration/1000, ease: 'linear' }}
          onAnimationComplete={onAnimationComplete}
      />
  </div>
}

export default Timer;