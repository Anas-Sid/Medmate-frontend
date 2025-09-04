import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function ChatWindow({ currentUser, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (currentUser && selectedUser) {
      fetchMessages();
    }
  }, [currentUser, selectedUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/messages`, {
        params: {
          user1Id: currentUser.id,
          user2Id: selectedUser._id,
        },
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/chat/message`, {
        senderId: currentUser.id,
        receiverId: selectedUser._id,
        senderModel: currentUser.model,
        receiverModel: currentUser.model === 'doctor' ? 'patient' : 'doctor',
        content: newMessage,
      });

      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h3 className="text-lg font-semibold">
          {selectedUser.firstName} {selectedUser.lastName}
        </h3>
        <p className="text-sm">{selectedUser.specialization || selectedUser.email}</p>
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-3 flex ${
              msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.senderId === currentUser.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="flex p-4 border-t bg-white">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
