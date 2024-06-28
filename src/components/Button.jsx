export const Button = ({children, onClick}) => {
  return <button onClick={onClick} style={{height: "20vh", width: "20vw"}}>
    {children}
  </button>
}