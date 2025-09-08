import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserListModal({ userId, role, onClose }) {
  const [users, setUsers] = useState([]);

  const isDoctor = role?.toLowerCase() === 'doctor';
  const isPatient = role?.toLowerCase() === 'patient';

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      console.log("User role:", role);
      console.log("isDoctor:", isDoctor, "isPatient:", isPatient);
      console.log("Fetching from:", isDoctor ? '/api/patient/all' : '/api/doctor/all');
      const endpoint = isDoctor 
        ? 'https://medmate-backend-ou7e.onrender.com/api/patient/all' 
        : 'https://medmate-backend-ou7e.onrender.com/doctor/all';
      const res = await axios.get(endpoint);
      
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        console.error('Invalid response:', res.data);
        setUsers([]);
        console.log("Fetched users:", res.data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
     
      
    }
  };

  fetchUsers();
}, [isDoctor]);


  // const fetchUsers = async () => {
  //   try {
  //     const endpoint = isDoctor ? '/api/patient' : '/api/doctor/all';
  //     const res = await axios.get(endpoint);
  //     setUsers(Array.isArray(res.data) ? res.data : []);
  //   } catch (err) {
  //     console.error('Error fetching users for chat:', err);
  //     setUsers([]);
  //   }
  // };

  const sendChatRequest = async (receiverId) => {
  try {
    console.log("🟡 Sender ID:", userId);
    console.log("🟢 Receiver ID:", receiverId);
    console.log("🔵 Sender Model:", isDoctor ? 'Doctor' : 'Patient');
    console.log("🔴 Receiver Model:", isDoctor ? 'Patient' : 'Doctor');

    if (!userId) {
      alert("Sender ID is missing!");
      return;
    }

    await axios.post('https://medmate-backend-ou7e.onrender.com/api/chat/request', {
      senderId: userId,
      receiverId,
      senderModel: isDoctor ? 'Doctor' : 'Patient',
      receiverModel: isDoctor ? 'Patient' : 'Doctor',
    });

    alert('Request sent!');
  } catch (err) {
    console.error('Error sending request:', err);
    alert('Request already sent or failed.');
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px] max-h-[80vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4 text-[#3E36B0]">
          {isDoctor ? 'Patients' : 'Doctors'} List
        </h2>

        <button
          className="absolute top-2 right-4 text-gray-600 text-lg"
          onClick={onClose}
        >
          ✖
        </button>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  {user.specialization && (
                    <p className="text-sm text-blue-700">{user.specialization}</p>
                  )}
                </div>
                <button
                  className="bg-[#3E36B0] text-white px-3 py-1 rounded text-sm"
                  onClick={() => sendChatRequest(user._id)}
                >
                  Send Request
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
