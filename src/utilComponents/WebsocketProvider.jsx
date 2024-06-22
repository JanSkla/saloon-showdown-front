import { createContext, useRef, useState } from "react"
import { wssAddress } from "../config"

export const WebsocketContext = createContext([false, null, () => {}, () => {}, () => {}])
//                                            ready, value, send

export const WebsocketProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setVal] = useState(null)

  const ws = useRef(null)

  const openConnection = () => {

    if(isOpen) return;

    const socket = new WebSocket(wssAddress)

    socket.onopen = () => {
        console.log("open")
        setIsOpen(true)
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

  const sendMessage = (value) => {
    if (ws.current?.readyState === 1)
        ws.current?.send(value);
  }

  return (
    <WebsocketContext.Provider value={[isOpen, value, sendMessage, openConnection, closeConnection]}>
      {children}
    </WebsocketContext.Provider>
  )
}