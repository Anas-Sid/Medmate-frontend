import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import socket from '../../socket';

export default function ChatBox({ currentUser, selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Create consistent room ID for both users
  const getRoomId = () => {
    if (!selectedChat || !currentUser) return null;
    const ids = [currentUser.id, selectedChat._id].sort();
    return ids.join('-');
  };

  const roomId = getRoomId();

  // Scroll to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Fetch old messages when chat is selected
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/messages`, {
          params: {
            user1Id: currentUser.id,
            user2Id: selectedChat._id,
          },
        });
        setMessages(res.data);
        scrollToBottom();
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };

    fetchMessages();
  }, [selectedChat, currentUser.id]);

  // Join room and listen for new incoming messages
  useEffect(() => {
    if (!roomId) return;

    console.log('Joining room:', roomId);
    socket.emit('join_room', roomId);

    const handleIncomingMessage = (msg) => {
      console.log('Received message:', msg);
      
      // Check if this message belongs to current chat
      const isCurrentChat = 
        (msg.senderId === selectedChat._id && msg.receiverId === currentUser.id) ||
        (msg.senderId === currentUser.id && msg.receiverId === selectedChat._id);

      if (isCurrentChat) {
        setMessages((prev) => {
          // Check if message already exists to avoid duplicates
          const messageExists = prev.some(existingMsg => 
            existingMsg._id === msg._id || 
            (existingMsg._id === msg._id && existingMsg.content === msg.content)
          );
          
          if (!messageExists) {
            console.log('Adding new message to chat');
            setTimeout(() => scrollToBottom(), 100);
            return [...prev, msg];
          }
          return prev;
        });
      }
    };

    socket.on('receive_message', handleIncomingMessage);

    return () => {
      console.log('Cleaning up socket listener');
      socket.off('receive_message', handleIncomingMessage);
    };
  }, [roomId, selectedChat, currentUser]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const payload = {
      senderId: currentUser.id,
      receiverId: selectedChat._id,
      senderModel: currentUser.role === 'doctor' ? 'Doctor' : 'Patient',
      receiverModel: currentUser.role === 'doctor' ? 'Patient' : 'Doctor',
      content: input,
    };

    try {
      // Send to server first to get proper _id
      const response = await axios.post('http://localhost:5000/api/chat/message', payload);
      
      // Emit to socket with the response data
      socket.emit('send_message', {
        ...response.data, // This should include the _id from database
        roomId,
      });

      setInput('');
      scrollToBottom();
    } catch (err) {
      console.error('Send message error:', err);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm">
        <h2 className="font-bold text-lg">
          Chat with {selectedChat?.firstName} {selectedChat?.lastName}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={msg._id || `${msg.senderId}-${index}`}
              className={`break-words whitespace-pre-wrap px-4 py-2 rounded-lg w-fit max-w-[70%] ${
                msg.senderId === currentUser.id
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-white text-gray-800 self-start mr-auto'
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center rounded-br-4xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none resize-none max-w-full"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}