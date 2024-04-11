import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessages] = useState([]);
  const [inputTextMessage, setInputTextMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send(inputTextMessage);
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setMessages(m => [...m, message.data])
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  if(!socket){
  return (
    <>
      Connecting to socket server .......
    </>
  ) }
  return (
    <>
      <input onChange={(e)=>{
        setInputTextMessage(e.target.value)
      }} ></input>
      <button onClick={()=>{
        socket.send(inputTextMessage);
      }}>Send</button>
      
      <div>
      {message.map(msg => (  
          <li>  
            {msg}  
          </li>  
        ))} 
      </div> 
    </>
  )
}

export default App