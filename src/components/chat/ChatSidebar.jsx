import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../../socket';

export default function ChatSidebar({ userId, userModel, onSelectChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (userId && userModel) {
      fetchAcceptedChats();
      socket.on('receive_message', handleIncomingMessage);
      return () => socket.off('receive_message', handleIncomingMessage);
    }
  }, [userId, userModel]);

  const handleIncomingMessage = (data) => {
    if (data.senderId === userId || data.receiverId === userId) {
      fetchAcceptedChats();
    }
  };

  const fetchAcceptedChats = async () => {
    try {
      const res = await axios.get(
        `https://medmate-backend-ou7e.onrender.com/api/chat/connections/${userId}?userModel=${userModel}`
      );
      setChats(res.data);
    } catch (err) {
      console.error('Error fetching accepted chats:', err);
    }
  };

  const getOtherUser = (chat) => {
    return chat.senderId._id === userId ? chat.receiverId : chat.senderId;
  };

  return (
    <div className="flex flex-col w-[300px] bg-white h-full ">
      {/* Header */}
      <div className="p-4 border-b text-[#3E36B0] text-center font-bold text-xl">
        Chats
      </div>

      {/* Scrollable chat list */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <p className="p-4 text-gray-500">No accepted chats</p>
        ) : (
          chats.map((chat) => {
            const other = getOtherUser(chat);
            const name = `${other.firstName} ${other.lastName}`;
            const initials =
              other.firstName?.[0]?.toUpperCase() +
              other.lastName?.[0]?.toUpperCase();

            return (
              <div
                key={chat._id}
                onClick={() => onSelectChat(other)}
                className="flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b"
              >
                <div className="bg-blue-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                  {initials}
                </div>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-600">
                    {other.specialization || other.email}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}