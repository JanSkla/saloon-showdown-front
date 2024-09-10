
import React, { useContext, useEffect, useMemo } from 'react';
import { FadeContext } from '../utilComponents/FadeScreenProvider';
import { useProgress } from "@react-three/drei";

export const WaitToLoad = () => {

  const {loaded, total, progress} = useProgress();

  const {setOpacity} = useContext(FadeContext);

  const isLoaded = useMemo(() => loaded === total,[loaded, total])

  useEffect(() => {
    console.log(loaded, total,isLoaded)
    if(isLoaded)
      setTimeout(() => {
        setOpacity(1);
      }, 100);
  }, [isLoaded]);
  return <></>
}