import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
const socket = io.connect('http://localhost:3000');
const App = () => {
  const [message, setMessage] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [msgRecieve, setMsgRecieve] = useState('');
  const sendMessage = () => {
    socket.emit('send-message', {message, roomNo});
    setMsgRecieve(message)
    setMessage('');
  };
  const joinRoom = () => {
    if (roomNo !== '') {
      socket.emit('room_join', roomNo);
    }
  };
  useEffect(() => {
    socket.on('recieved-msg', (msg) => {
      setMsgRecieve(msg);
    });
  }, [socket]);
  return (
    <div className='message-container'>
      <input
        type='text'
        onChange={(e) => setMessage(e.target.value)}
        id='messageInput'
        value={message}
        placeholder='Type your message...'
      />
      <button onClick={sendMessage}>Send</button>
      <input
        type='text'
        onChange={(e) => setRoomNo(e.target.value)}
        id='messageInput'
        value={roomNo}
        placeholder='Room No'
      />
      <button onClick={joinRoom}>Join</button>
      {<p>{msgRecieve}</p>}
    </div>
  );
};

export default App;
