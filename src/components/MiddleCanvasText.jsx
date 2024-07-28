export const MiddleCanvasText = ({children}) => {
  return <div className="full-screen" style={{position: "absolute", alignContent: "center", color: "white", pointerEvents: "none"}}>
  <span style={{background: "rgba(25, 0, 0, 0.5)", fontSize: "large"}}>{children}</span>
</div>
}