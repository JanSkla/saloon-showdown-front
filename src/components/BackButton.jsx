import { useContext } from "react"
import { FadeContext } from "../utilComponents/FadeScreenProvider"

export const BackButton = ({children, onClick, selected, style, red = false, willSetOpacity}) => {

  const {setOpacityThenCall} = useContext(FadeContext);

  const click = () => {
    if(willSetOpacity)
      setOpacityThenCall(0, onClick);
    else
      onClick();
  }

  return <button onClick={click} className={red ? "redButton" :"button"} style={{background: selected && "gray", ...style}}>
    {"<"}
  </button>
}