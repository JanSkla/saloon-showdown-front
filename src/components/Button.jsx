export const Button = ({children, onClick, selected, style, red = false}) => {
  return <button onClick={onClick} className={red ? "redButton" :"button"} style={{background: selected && "gray", ...style}}>
    {children}
  </button>
}