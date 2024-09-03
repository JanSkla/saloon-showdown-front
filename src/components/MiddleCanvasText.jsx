export const MiddleCanvasText = ({children, pointerEvents = false, style}) => {
  return <div className="full-screen" style={{position: "absolute", alignContent: "center", color: "white", pointerEvents: !pointerEvents && "none", ...style}}>
  <span style={{textShadow: '1px 1px 4px #282c34', fontSize: "x-large"}}>{children}</span>
</div>
}