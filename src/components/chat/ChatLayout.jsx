import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatSidebar from './ChatSidebar';
import ChatBox from './ChatBox';

export default function ChatLayout({ currentUser: passedUser, role: passedRole }) {
  const localDoctor = JSON.parse(localStorage.getItem("doctor"));
  const localPatient = JSON.parse(localStorage.getItem("patient"));

  const currentUser = passedUser || localDoctor || localPatient;
  const role = passedRole || (localDoctor ? 'doctor' : 'patient');

  const [selectedChat, setSelectedChat] = useState(null);

  const userId = currentUser?.id;
  const userModel = role === 'doctor' ? 'Doctor' : 'Patient';

  return (
    <div className="flex flex-col h-screen rounded-4xl mt-6">
      {/* Top Chat Header */}
      <div className="h-[90px] border-b shadow-sm bg-white py-2  rounded-t-4xl">
        <ChatHeader userId={userId} role={role} />
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Chat Sidebar */}
        <div className="w-[313px] h-[460px] border-r bg-white overflow-y-auto rounded-bl-4xl">
          <ChatSidebar
            userId={userId}
            userModel={userModel}
            onSelectChat={setSelectedChat}
          />
        </div>

        {/* Right Chat Box */}
        <div className="flex-1 flex flex-col w-[680px] h-[460px] rounded-b-4xl">
          {selectedChat ? (
            <ChatBox
              currentUser={currentUser}
              selectedChat={selectedChat}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-br-4xl">
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
