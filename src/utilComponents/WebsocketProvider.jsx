import { createContext, useEffect, useRef, useState } from "react"
import { wssAddress } from "../config"
import useStateWithQueue from "../utils/useStateWithQueue";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { Button } from "../components/Button";

export const WebsocketContext = createContext({
  isOpen: false,
  data: null,
  send: () => {},
  open: () => {},
  close: () => {}
});

export const WebsocketProvider = ({ children }) => {
  const isOpenRef = useRef(false);
  const [isOpen, _setIsOpen] = useState(isOpenRef.current)
  const [data, setData] = useStateWithQueue(null)
  const [error, setError] = useState('')

  const setIsOpen = (value) => {
    isOpenRef.current = value;
    _setIsOpen(value);
  }

  const ws = useRef(null) 

  const setOpen = () => {
    
    setIsOpen(true);

    waitingMessagesForConnection.forEach(message => {
      ws.current?.send(message);
      console.log("sent:", message)
    }); //send messages buffered before connection established
    waitingMessagesForConnection.length = 0; //delete sent messages
  }

  const navigate = useNavigate()

  const open = () => {

    if(isOpen) return;

    const socket = new WebSocket(wssAddress)

    socket.onopen = () => {
        console.log("open")
        setOpen()
    }
    socket.onclose = () => {
        console.log("closed");
        
        if(isOpenRef.current) setError('disconnected');;
        setIsOpen(false);
        navigate('/');
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
    if(!isOpenRef.current) return;

    setIsOpen(false);
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
      {error && <div style={{position: 'absolute', backgroundColor: '#FF0000AA', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'left'}}>
        <Button style={{position: 'absolute', fontSize: '0.8em', top: '0.6em'}} onClick={() => setError('')}>X</Button>
        <div style={{padding: '0.5em', paddingInline: '1.5em'}}>
          {error}
        </div>
      </div>}
    </WebsocketContext.Provider>
  )
}