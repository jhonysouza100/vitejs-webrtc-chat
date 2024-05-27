import { useState, useEffect } from "react";
import Output from "./Output";
import Input from "./Input";
import {config} from "../config";

export default function Chat({socket}) {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    
    e.preventDefault()

    const newMessage = {
      body: message,
      from: 'Me'
    }
    
    setMessages([...messages, newMessage]) // se agrega desde el elemento cliente
  
    socket.emit('message', message)

  }

  useEffect(() => {
    
    const receiveMessage = (data) => setMessages( state => [...state, data]) // estado anterios mas estado actual
       
    socket.on('message', receiveMessage)  // actualiza desde el backend
    
    return () => {
      socket.off('message')
    }
    
  }, [])
  
  return (
    <div className="bg-zinc-900 p-10">
      <p>{config.SOCKET}</p>
      <h2 className="text-2xl font-bold my-2"><span className="text-amber-500">Jacky</span> & <span className="text-indigo-500">Jhony</span> Chat</h2>
      <Input handleSubmit={handleSubmit} setMessage={setMessage} />
      <Output messages={messages} />
    </div>
  );
}
