import { createContext, useState } from 'react';

export const FadeContext = createContext();

export const FadeProvider = ({children}) => {

  const [opacity, setOpacity] = useState(0);
  
  const setOpacityThenCall = (value, callFunc) => {
    setOpacity(value);
    setTimeout(() => {
      callFunc();
    },800);
  }

  return <FadeContext.Provider value={{setOpacity, setOpacityThenCall}}>
     {opacity < 1 && <img src="/images/loading_t.gif" height={250} width={250} style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-55%, -50%)'}}/>}
    <div style={{opacity: opacity, transition: 'opacity 0.8s ease-in-out'}}>
     {children}
    </div>
  </FadeContext.Provider>
}