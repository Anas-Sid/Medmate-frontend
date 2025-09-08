import React, { useEffect, useState } from 'react';

export default function AvailabilityList({ refreshTrigger }) {
  useEffect(() => {
    fetchAvailability();
  }, [refreshTrigger]); // Now will run again when refreshTrigger changes

  const [availability, setAvailability] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    date: '',
    fromTime: '',
    toTime: '',
    appointmentDuration: '',
  });

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    if (!doctor?.id) return;

    try {
      const response = await fetch(
        `https://medmate-backend-ou7e.onrender.com/api/availability?doctorId=${doctor.id}`
      );
      const data = await response.json();

      const today = new Date();
      const upcoming = [];
      const expired = [];

      data.forEach((item) => {
        const availabilityDate = new Date(item.date);
        if (availabilityDate >= today) {
          upcoming.push(item);
        } else {
          expired.push(item._id);
        }
      });

      // Auto-delete expired
      for (const id of expired) {
        try {
          await fetch(`https://medmate-backend-ou7e.onrender.com/api/availability/${id}`, {
            method: 'DELETE',
          });
        } catch {
          console.warn(`Failed to auto-delete expired availability ${id}`);
        }
      }

      setAvailability(upcoming);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this availability?')) {
      return;
    }

    try {
      const response = await fetch(`https://medmate-backend-ou7e.onrender.com/api/availability/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        alert('Availability deleted!');
        fetchAvailability();
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  const isEditable = (dateString) => {
    const today = new Date();
    const availabilityDate = new Date(dateString);

    const diffDays = Math.floor(
      (availabilityDate - today) / (1000 * 60 * 60 * 24)
    );

    return diffDays >= 3;
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditForm({
      date: item.date.split('T')[0],
      fromTime: item.fromTime,
      toTime: item.toTime,
      appointmentDuration: item.appointmentDuration,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://medmate-backend-ou7e.onrender.com/api/availability/${editingItem._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Availability updated!');
        setEditingItem(null);
        fetchAvailability();
      } else {
        alert(data.message || 'Failed to update');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      <h2 className="text-2xl font-semibold text-black mb-4">Your Availability</h2>

      {availability.length === 0 ? (
        <p className="text-gray-600">No availability set.</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">From</th>
              <th className="p-2 border">To</th>
              <th className="p-2 border">Duration</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {availability.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="p-2 border">{item.fromTime}</td>
                <td className="p-2 border">{item.toTime}</td>
                <td className="p-2 border">{item.appointmentDuration} min</td>
                <td className="p-2 border">
                  {isEditable(item.date) ? (
                    <>
                      <button
                        className="text-blue-500 hover:underline mr-2 cursor-pointer"
                        onClick={() => openEditModal(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400">Locked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-md p-6 w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Edit Availability</h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                  className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">From Time</label>
                <input
                  type="time"
                  name="fromTime"
                  value={editForm.fromTime}
                  onChange={handleEditChange}
                  className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">To Time</label>
                <input
                  type="time"
                  name="toTime"
                  value={editForm.toTime}
                  onChange={handleEditChange}
                  className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">
                  Appointment Duration (minutes)
                </label>
                <select
                  name="appointmentDuration"
                  value={editForm.appointmentDuration}
                  onChange={handleEditChange}
                  className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="15">15 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3E36B0] text-white rounded hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
