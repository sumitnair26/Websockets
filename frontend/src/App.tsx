import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessages] = useState([]);
  //const [inputText, setInputText] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
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
      <input ></input>
      <button onClick={()=>{
        socket.send("Sending message from Frontend");
      }}>Send</button>
      {message}
    </>
  )
}

export default App