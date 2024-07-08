export const MiddleCanvasText = ({children}) => {
  return <div style={{width: '100vw', height: '50vh', position: "absolute", alignContent: "center", color: "white", pointerEvents: "none"}}>
  <span style={{background: "rgba(25, 0, 0, 0.5)", fontSize: "large"}}>{children}</span>
</div>
}