// src/pages/ForumPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import Footer from '../components/Footer';
import { io } from 'socket.io-client';
import { useAuth } from '../context/useAuth';

const ForumPage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to backend Socket.io server, forcing WebSocket transport for stability
    socketRef.current = io("https://e-learningbackend-s24h.onrender.com", { transports: ['websocket'] });

    socketRef.current.on('connect', () => {
      console.log('Socket connected with id:', socketRef.current.id);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    // Emit join event with user name if logged in, otherwise "Anonymous"
    socketRef.current.emit('joinCourse', { 
      courseId: 'global', 
      userName: user && user.name ? user.name : 'Anonymous' 
    });
    console.log('Emitted joinCourse event for room "global"');

    // Listen for previous messages from the server
    socketRef.current.on('previousMessages', (prevMsgs) => {
      console.log('Received previous messages:', prevMsgs);
      setMessages(prevMsgs); // set them in state
    });

    // Listen for incoming new messages
    socketRef.current.on('message', (msg) => {
      console.log('Received message:', msg);
      setMessages(prev => [...prev, msg]);
    });

    socketRef.current.on('error', (err) => {
      console.error('Socket error:', err);
    });

    // Cleanup on unmount
    return () => {
      console.log('Disconnecting socket');
      socketRef.current.disconnect();
    };
  }, [user]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to send messages.");
      return;
    }
    if (message.trim()) {
      console.log('Sending message:', message);
      socketRef.current.emit('sendMessage', {
        room: 'global',
        userName: user.name, // Use logged-in user's name
        text: message,
      });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow flex items-center justify-center bg-gray-900 p-8">
        <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-md shadow-lg transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 text-center">Discussion Forum</h1>
          <div className="border border-gray-700 p-4 h-64 overflow-y-scroll rounded-md mb-6">
            {messages.length === 0 ? (
              <p className="text-center">No messages yet. Start the conversation!</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.user}: </strong> {msg.text}
                </div>
              ))
            )}
          </div>
          {user ? (
            <form onSubmit={handleSend} className="flex items-center">
              <input
                type="text"
                value={message}
                placeholder="Type your message..."
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                type="submit"
                className="ml-4 bg-white text-black px-4 py-2 rounded-md transition-colors duration-300 hover:bg-gray-200"
              >
                Send
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="mb-2">Log in to send a message.</p>
              <input
                type="text"
                value={message}
                placeholder="Read-only mode"
                disabled
                className="w-full px-4 py-2 rounded-md bg-gray-600 cursor-not-allowed"
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForumPage;
