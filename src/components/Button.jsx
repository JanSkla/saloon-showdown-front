export const Button = ({children, onClick, selected}) => {
  return <button onClick={onClick} className="button" style={{background: selected && "gray"}}>
    {children}
  </button>
}