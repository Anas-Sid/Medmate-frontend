// src/components/chat/ChatHeader.jsx
import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import UserListModal from './UserListModal';
import ChatRequestModal from './ChatRequestModal';
import { fetchPendingRequests } from '../../utils/api/chat';


export default function ChatHeader({ userId, role , }) {
  const [showModal, setShowModal] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
    const [showUserList, setShowUserList] = useState(false);

  // const fetchPendingRequests = async () => {
  //   const res = await fetch(`/api/chat/requests/${userId}`);
  //   const data = await res.json();
  //   console.log("API Response:", data); // Log entire response
  //   console.log("Pending count:", data.length);

  //   setRequestCount(data.length);
  // };

  useEffect(() => {
  const loadRequests = async () => {
    const requests = await fetchPendingRequests(userId, role);
    console.log("Pending Requests:", requests);
    setRequestCount(requests.length);
  };

  loadRequests();
}, []);

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-t-4xl">
      <h1 className="text-xl font-bold text-[#3E36B0]">MEDMATE Chat</h1>

       <button
          className="bg-[#3E36B0] text-white px-4 py-2 rounded hover:bg-[#5a52d6] text-sm"
          onClick={() => {
            console.log(userId);
            setShowUserList(true);
          }}
        >
          Start Chat
        </button>

      <div className="relative cursor-pointer" onClick={() => setShowModal(true)}>
        <FaBell size={24} />
        {requestCount > 0 && (
          <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs rounded-full px-1.5">
            {requestCount}
          </span>
        )}
      </div>

      {showModal && (
        <ChatRequestModal
          userId={userId}
          role={role}
          onClose={() => {
            setShowModal(false);
            fetchPendingRequests(); // refresh count after closing
          }}
        />
      )}
      {showUserList && (
        <UserListModal
          userId={userId}
          role={role}
          onClose={() => {
            setShowUserList(false);
             fetchPendingRequests();
          }}
        />
      )}
    </div>
  );
}
