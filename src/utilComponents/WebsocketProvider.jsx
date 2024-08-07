import { createContext, useRef, useState } from "react"
import { wssAddress } from "../config"
import useStateWithQueue from "../utils/useStateWithQueue";

export const WebsocketContext = createContext({
  isOpen: false,
  data: null,
  send: () => {},
  open: () => {},
  close: () => {}
});

export const WebsocketProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useStateWithQueue(null)

  const ws = useRef(null)

  const setOpen = () => {
    
    setIsOpen(true);

    waitingMessagesForConnection.forEach(message => {
      ws.current?.send(message);
      console.log("sent:", message)
    }); //send messages buffered before connection established
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
        let data;
        try{
          data = JSON.parse(event.data);
        }
        catch{
          data = event.data
        }
        setData(data);
    }

    ws.current = socket
  }

  const close = () => {
    if(!isOpen) return;

    ws.current?.close();
  }

  const waitingMessagesForConnection = []

  const send = (value) => {
    if (ws.current?.readyState === WebSocket.OPEN)
      {
        ws.current?.send(value);
        console.log("sent:", value)
      }
    else if (ws.current?.readyState === WebSocket.CONNECTING){
        waitingMessagesForConnection.push(value);
    }
  }

  const exists = ws.current != undefined;

  return (
    <WebsocketContext.Provider value={{exists, isOpen, data, send, open, close}}>
      {children}
    </WebsocketContext.Provider>
  )
}