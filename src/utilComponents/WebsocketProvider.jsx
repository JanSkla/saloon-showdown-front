import { createContext, useEffect, useRef, useState } from "react"
import { wssAddress } from "../config"

export const WebsocketContext = createContext([false, null, () => {}, () => {}, () => {}])
//                                            ready, value, send

export const WebsocketProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setVal] = useState(null)

  const ws = useRef(null)

  const setOpen = () => {
    
    setIsOpen(true);

    waitingMessagesForConnection.forEach(message => ws.current?.send(message)); //send messages buffered before connection established
    waitingMessagesForConnection.length = 0; //delete sent messages
  }

  const openConnection = () => {

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
        console.log(event.data)
        setVal(event.data);
    }

    ws.current = socket
  }

  const closeConnection = () => {
    if(!isOpen) return;

    ws.current?.close();
  }

  const waitingMessagesForConnection = []

  const sendMessage = (value) => {
    console.log(ws.current?.readyState)
    if (ws.current?.readyState === 1)
        ws.current?.send(value);
    else if (ws.current?.readyState === 0){
        waitingMessagesForConnection.push(value);
    }
  }

  return (
    <WebsocketContext.Provider value={[isOpen, value, sendMessage, openConnection, closeConnection]}>
      {children}
    </WebsocketContext.Provider>
  )
}