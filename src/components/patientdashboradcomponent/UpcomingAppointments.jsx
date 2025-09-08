import React, { useEffect, useState } from 'react';
import calendarimage from '../../assets/calendarIcon.svg';

export default function UpcomingAppointment() {
  const [appointments, setAppointments] = useState([]);
  let patient = {};

  try {
    patient = JSON.parse(localStorage.getItem('patient') || '{}');
  } catch {
    console.error('Invalid patient JSON in localStorage');
  }

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

  // Fetch appointments
  useEffect(() => {
    if (!patient?.id) return;

    fetch(`https://medmate-backend-ou7e.onrender.com/api/appointments/patient/${patient.id}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));
  }, [patient.id]);

  // Cancel a specific appointment
  const handleCancel = async (appointmentId) => {
    try {
      const res = await fetch(`https://medmate-backend-ou7e.onrender.com/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setAppointments(prev => prev.filter(app => app._id !== appointmentId));
      } else {
        alert('Failed to cancel appointment');
      }
    } catch (err) {
      console.error('Cancel error:', err);
    }
  };

  // Cancel all appointments for the patient
  const handleCancelAll = async () => {
    try {
      const res = await fetch(`https://medmate-backend-ou7e.onrender.com/api/appointments/patient/${patient.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setAppointments([]); // Clear appointments from state
      } else {
        alert('Failed to cancel all appointments');
      }
    } catch (err) {
      console.error('Cancel All error:', err);
    }
  };

  return (
    <div className="rounded-xl p-6 w-full max-w-md bg-gradient-to-br from-[#F0F3FF] to-[#B3C1EE] shadow-lg border border-gray-300 ml-[580px] -mt-[350px] h-full flex flex-col">
      <h2 className="text-3xl text-black mb-2 ml-10">Manage Appointments</h2>
      <hr className="border-t border-black mx-3 mt-6 mb-6" />

      {/* Scheduled Count */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#B4C1FF] via-[#8097E9] to-[#392aff] text-white px-4 py-3 rounded-lg mb-3">
        <span>Scheduled Meetings</span>
        <span className="text-2xl font-bold">{appointments.length}</span>
      </div>

      {/* Cancel All Button */}
      <div
        className="flex items-center justify-between bg-gradient-to-br from-[#FDB2B3] via-[#A54143] to-[#AF3D3F] text-white font-bold px-4 py-3 rounded-lg mb-4 shadow cursor-pointer"
        onClick={handleCancelAll} // Attach the Cancel All function here
      >
        <span>Cancel All</span>
        <img src={calendarimage} alt="calendar" className="w-15 h-13 -mt-7 -mb-3" />
      </div>

      {/* Appointment List */}
      <div className="text-sm flex-1 overflow-y-auto pr-1 scrollbar-hide">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Meeting List</h3>
          <select className="text-xs rounded px-2 py-1">
            <option>Today</option>
            <option>All</option>
          </select>
        </div>

        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No appointments scheduled yet.</p>
        ) : (
          appointments.map((app) => {
            const doctorName = `${capitalize(app.doctor?.firstName)} ${capitalize(app.doctor?.lastName)}`;
            return (
              <div
                key={app._id}
                className="flex justify-between items-center rounded-lg shadow-sm px-3 py-2 mb-2 bg-white"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-200 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black">
                    {doctorName?.charAt(0) || 'D'}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{doctorName || 'Doctor'}</p>
                    <p className="text-gray-500 text-xs">20 min</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className="bg-gray-400 text-blue-600 text-xs px-2 py-0.5 rounded-3xl">{app.time}</span>
                  <button
                    className="text-white bg-[#AF3D3F] text-xs px-4 py-0.5 mt-0.5 rounded-lg shadow-sm hover:shadow-md active:translate-y-[1px] transition-all duration-150 hover:bg-red-600 cursor-pointer"
                    onClick={() => handleCancel(app._id)} // Cancel the selected appointment
                  >
                    Cancel
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
