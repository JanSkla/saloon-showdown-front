export const Button = ({children, onClick, selected}) => {
  return <button onClick={onClick} style={{height: "20vh", width: "25vw", background: selected && "gray"}}>
    {children}
  </button>
}