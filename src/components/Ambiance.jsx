import React from "react";
import { useState, useEffect, useContext, useRef     } from "react";
import { useAtom } from 'jotai'
import { WebsocketContext } from '../utilComponents/WebsocketProvider'
import { firstShotAtom } from "../atoms/atoms";


const Ambiance = () =>{
    const [firstShot, setFirstShot] = useState(false);
    const [ambPlaying, setAmbPlaying] = useState(false)
    
    const { data, send } = useContext(WebsocketContext);
    
    const ambianceRef = useRef(new Audio('/sounds/ambiance.wav'));
    const screamRef = useRef(new Audio('/sounds/crowd-scream.wav'));
    const cricketsRef = useRef(new Audio('/sounds/ambiance-crickets.wav'))

    useEffect(() => {
        const amb = ambianceRef.current;
        const scr = screamRef.current;
        const crick = cricketsRef.current;
        amb.loop = true;
        crick.loop = true;
        // Clean up audio when component unmounts
        return () => {
          amb.pause();
          scr.pause();
          crick.pause();
          amb.currentTime = 0;
          amb.volume = 0.6;
          scr.currentTime = 0;
          scr.volume = 0.3;
          crick.currentTime = 0;
          crick.volume = 0.2;
        };
      }, []);

    useEffect(() => {
        if(!firstShot && data?.type === "round-actions" && data?.data)
        {

            data?.data.forEach(a => {
                switch (a.type) {
                    case "shoot-damage":
                    case "shoot-block":
                    case "shoot-death":
                        screamRef.current.play();
                        setFirstShot(true)
                        setTimeout(() => ambianceRef.current.pause(), 500);
                        setTimeout(() => cricketsRef.current.play(), 10000);
                        break;

                    default:
                        break;
                }
            });
        }
        if(!ambPlaying && data?.type === "player-loaded"){
            ambianceRef.current.play();
            setAmbPlaying(true);
        }
    }, [data])
    return; 
}

export default Ambiance;