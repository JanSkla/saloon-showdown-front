import { createContext, useRef, useState } from "react"
import { wssAddress } from "../config"

export const WebsocketContext = createContext({
  isOpen: false,
  data: null,
  send: () => {},
  open: () => {},
  clcose: () => {}
});

export const WebsocketProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState(null)

  const ws = useRef(null)

  const setOpen = () => {
    
    setIsOpen(true);

    waitingMessagesForConnection.forEach(message => ws.current?.send(message)); //send messages buffered before connection established
    waitingMessagesForConnection.length = 0; //delete sent messages
  }

  const open = () => {

    if(isOpen) return;

    const socket = new WebSocket(wssAddress)

    socket.onopen = () => {
        console.log("open")
        setOpen()
    }
    socket.onclose = () => {
        console.log("closed")
        setIsOpen(false)
    }
    socket.onmessage = (event) => {
        console.log("recieved: ",event.data)
        setData(JSON.parse(event.data));
    }

    ws.current = socket
  }

  const close = () => {
    if(!isOpen) return;

    ws.current?.close();
  }

  const waitingMessagesForConnection = []

  const send = (value) => {
    console.log(ws.current?.readyState)
    if (ws.current?.readyState === 1)
        ws.current?.send(value);
    else if (ws.current?.readyState === 0){
        waitingMessagesForConnection.push(value);
    }
  }

  return (
    <WebsocketContext.Provider value={{isOpen, data, send, open, close}}>
      {children}
    </WebsocketContext.Provider>
  )
}