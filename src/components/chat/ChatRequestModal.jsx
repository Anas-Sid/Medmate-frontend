import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ChatRequestModal({ userId, role, onClose }) {
  const [requests, setRequests] = useState([]);

  const userModel = role === 'doctor' ? 'Doctor' : 'Patient';

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/requests/${userId}?userModel=${userModel}`);
      setRequests(res.data);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  const handleResponse = async (requestId, action) => {
    try {
      await axios.put(`http://localhost:5000/api/chat/respond/${requestId}`, { action });
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Pending Requests</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">×</button>
        </div>

        {requests.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No pending requests</p>
        ) : (
          requests.map((req) => {
            const sender = req.senderId;
            const name = `${sender.firstName} ${sender.lastName}`;
            const email = sender.email;
            const initials = sender.firstName[0].toUpperCase() + sender.lastName[0].toUpperCase();

            return (
              <div key={req._id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                    {initials}
                  </div>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-gray-500">{email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleResponse(req._id, 'accepted')}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleResponse(req._id, 'rejected')}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
