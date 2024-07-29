export const Button = ({children, onClick, selected, style}) => {
  return <button onClick={onClick} className="button" style={{background: selected && "gray", ...style}}>
    {children}
  </button>
}