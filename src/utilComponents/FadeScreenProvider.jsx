import { createContext, useEffect, useState } from 'react';
import { isPhone } from '../utils/utils';

export const FadeContext = createContext();

export const FadeProvider = ({children}) => {

  const [rotatePhoneOpacity, setRotatePhoneOpacity] = useState(1);

  const checkPhoneRotation = () => {
    if(isPhone && window.innerWidth < window.innerHeight){
      setTimeout(() => setRotatePhoneOpacity(0), 4000)
    }
    else{
      setRotatePhoneOpacity(false)
    }
  };

  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (rotatePhoneOpacity === false) return;
    checkPhoneRotation();
  }, [opacity]);
  
  const setOpacityThenCall = (value, callFunc) => {
    setOpacity(value);
    setTimeout(() => {
      callFunc();
    },800);
  }

  return <FadeContext.Provider value={{setOpacity, setOpacityThenCall}}>
     {opacity < 1 && <img src="/images/loading_t.gif" height={250} width={250} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-55%, -50%)'}}/>}
    <div style={{opacity: opacity, transition: 'opacity 0.8s ease-in-out'}}>
      {rotatePhoneOpacity !== false && <div style={{position: 'absolute', height: '100%', width: '100%', background: '#000000cc', zIndex: 1, opacity: rotatePhoneOpacity, transition: 'opacity 1.6s ease-in-out', pointerEvents: 'none'}}>  
        <img src="/images/rotate_t.gif" height={280} width={280} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-55%, -50%)'}}/>
      </div>}
     {children}
    </div>
  </FadeContext.Provider>
}