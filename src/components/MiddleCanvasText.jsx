export const MiddleCanvasText = ({children, pointerEvents = false, style}) => {
  return <div className="full-screen" style={{position: "absolute", alignContent: "center", color: "white", pointerEvents: !pointerEvents && "none", ...style}}>
  <span style={{background: "rgba(25, 0, 0, 0.5)", fontSize: "x-large"}}>{children}</span>
</div>
}