import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StartChatButton({ currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  const isDoctor = currentUser?.pmdcNumber !== undefined;
  const fetchURL = isDoctor ? '/api/patient/all' : '/api/doctor/all';

  useEffect(() => {
    if (showModal) {
      axios.get(fetchURL).then((res) => {
        setUsers(res.data);
      });
    }
  }, [showModal]);

  const sendRequest = async (receiverId) => {
    try {
      await axios.post('/api/chat/request', {
        senderId: currentUser._id,
        senderModel: isDoctor ? 'Doctor' : 'Patient',
        receiverId,
        receiverModel: isDoctor ? 'Patient' : 'Doctor',
      });

      alert('Chat request sent');
    } catch (err) {
      alert('Request already sent or failed');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-[#3E36B0] text-white px-4 py-2 rounded-md hover:bg-indigo-600"
      >
        Start New Chat
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[400px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              {isDoctor ? 'Patients' : 'Doctors'}
            </h2>
            <ul>
              {users.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p className="font-semibold">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => sendRequest(user._id)}
                  >
                    Send Request
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 text-sm text-gray-700 hover:underline"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
