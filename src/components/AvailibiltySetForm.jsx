import React, { useState, useEffect } from 'react';

export default function AvailibiltySetForm({ onAvailabilityAdded }) {
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentDuration, setAppointmentDuration] = useState('30'); // default 30 min

  // Automatically update the 'toTime' when 'fromTime' is set
  useEffect(() => {
    if (fromTime) {
      const [hours, minutes] = fromTime.split(':');
      const fromDate = new Date();
      fromDate.setHours(hours, minutes);

      // Calculate the minimum 'toTime' which should be at least 1 hour after 'fromTime'
      const toDate = new Date(fromDate.getTime() + 60 * 60 * 1000); // 1 hour later

      const formattedToTime = `${String(toDate.getHours()).padStart(2, '0')}:${String(toDate.getMinutes()).padStart(2, '0')}`;

      // If 'toTime' isn't set or if it's less than the calculated 'toTime', update it
      if (!toTime || toTime < formattedToTime) {
        setToTime(formattedToTime);
      }
    }
  }, [fromTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctor = JSON.parse(localStorage.getItem('doctor'));

    if (!doctor) {
      alert('Doctor not logged in');
      return;
    }

    // Calculate the difference in minutes between 'fromTime' and 'toTime'
    const [fromHours, fromMinutes] = fromTime.split(':').map((num) => parseInt(num, 10));
    const [toHours, toMinutes] = toTime.split(':').map((num) => parseInt(num, 10));

    const fromDate = new Date();
    fromDate.setHours(fromHours, fromMinutes);
    const toDate = new Date();
    toDate.setHours(toHours, toMinutes);

    const timeDifference = (toDate - fromDate) / (1000 * 60); // Convert to minutes

    // If the time difference is less than 60 minutes, show an error
    if (timeDifference < 60) {
      alert('The availability duration must be at least one hour.');
      return;
    }

    try {
      const response = await fetch('https://medmate-backend-ou7e.onrender.com/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctor.id,
          date: selectedDate,
          fromTime: fromTime,
          toTime: toTime,
          appointmentDuration: parseInt(appointmentDuration),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Availability saved successfully!');
        // Optional → reset form
        setSelectedDate('');
        setFromTime('');
        setToTime('');
        setAppointmentDuration('30');
      }

      if (typeof onAvailabilityAdded === 'function') {
        onAvailabilityAdded(); // 👈 THIS MUST BE CALLED to trigger refresh
      } else {
        alert(data.message || 'Failed to save availability');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-[400px]">
      <h2 className="text-2xl font-semibold text-black mb-4">Set Availability</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date Picker */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
            required
          />
        </div>

        {/* Time Range */}
        <div className="flex justify-between space-x-4">
          {/* From */}
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-600 mb-1">From</label>
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
              required
            />
          </div>

          {/* To */}
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-600 mb-1">To</label>
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              min={fromTime} // Ensures the 'To' time is not earlier than 'From' time
              className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Appointment Duration */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Appointment Duration (minutes)</label>
          <select
            value={appointmentDuration}
            onChange={(e) => setAppointmentDuration(e.target.value)}
            className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
            required
          >
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#3E36B0] text-white font-semibold px-6 py-2 rounded shadow hover:bg-indigo-700 transition-all cursor-pointer"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
