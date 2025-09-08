import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

export default function DoctorBookingCard() {

  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
  const { state: doctor } = useLocation(); // doctor passed via navigation state
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const [availabilityData, setAvailabilityData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleBook = async () => {
  const patient = JSON.parse(localStorage.getItem('patient'));
  if (!patient || !selectedDate || !selectedTime) return alert('Missing data');

  try {
    const response = await fetch('https://medmate-backend-ou7e.onrender.com/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId: doctor._id,
        patientId: patient.id,
        date: selectedDate,
        time: selectedTime,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Appointment booked successfully!');
    } else {
      alert(result.message || 'Failed to book appointment');
    }
  } catch (err) {
    console.error(err);
    alert('Error booking appointment');
  }
};

useEffect(() => {
  if (!doctor || !selectedDate) return;

  fetch(`https://medmate-backend-ou7e.onrender.com/api/appointments/booked?doctorId=${doctor._id}&date=${selectedDate}`)
    .then((res) => res.json())
    .then((data) => setBookedAppointments(data))
    .catch((err) => console.error('Failed to load booked slots:', err));
}, [doctor, selectedDate]);

const bookedTimes = bookedAppointments.map((a) => a.time);

  // Utility: Generate next 6 days from today
  const nextSixDays = Array.from({ length: 6 }, (_, i) => {
    const date = dayjs().add(i, 'day');
    return {
      label: date.format('ddd'),
      date: date.format('YYYY-MM-DD'),
      shortDate: date.format('D'),
    };
  });

  useEffect(() => {
    if (!doctor || !doctor._id) return;

    fetch(`https://medmate-backend-ou7e.onrender.com/api/availability?doctorId=${doctor._id}`)
      .then((res) => res.json())
      .then((data) => setAvailabilityData(data))
      .catch((err) => console.error('Failed to load availability:', err));
  }, [doctor]);

  // Filter available slots for selected date
  const getTimeSlotsForDate = (date) => {
    const dayAvailability = availabilityData.find((a) => a.date === date);
    if (!dayAvailability) return [];

    const start = dayjs(`${dayAvailability.date} ${dayAvailability.fromTime}`);
    const end = dayjs(`${dayAvailability.date} ${dayAvailability.toTime}`);
    const duration = dayAvailability.appointmentDuration;

    const slots = [];
    let current = start;
    while (current.isBefore(end)) {
      slots.push(current.format('hh:mm A'));
      current = current.add(duration, 'minute');
    }

    return slots;
  };

  return (
    <div className="w-[450px] p-6 bg-gradient-to-br from-[#F0F3FF] to-[#B3C1EE] rounded-2xl shadow-lg text-black ml-[580px] -mt-[350px] h-full">
      <h2 className="text-2xl font-semibold">
  {capitalize(doctor?.firstName)} {capitalize(doctor?.lastName)}
</h2>
<p className="text-sm text-gray-600 mb-3">{doctor?.specialization}</p>

      <hr className="my-2 mt-4 border-gray-400" />

      <h3 className="font-semibold text-lg mb-1">About</h3>
      <div className="text-sm text-gray-700 leading-relaxed mb-6 mt-3">
        <p>• You can't cancel appointments on the same day.</p>
        <p>• If you book an appointment 3 or more days in advance, the doctor may update their availability.</p>
        <p>• In such cases, your appointment may be automatically cancelled.</p>
      </div>

      {/* Date Buttons */}
      <div className="flex justify-between mb-4">
        {nextSixDays.map(({ label, date, shortDate }) => (
          <button
            key={date}
            onClick={() => {
              setSelectedDate(date);
              setSelectedTime('');
            }}
            className={`text-sm px-3 py-3 rounded-2xl shadow-md flex flex-col items-center h-[65px] w-[55px] cursor-pointer ${
              selectedDate === date
                ? 'bg-[#4438CA] text-white font-bold'
                : 'bg-white text-gray-800'
            }`}
          >
            <span>{label}</span>
            <span>{shortDate}</span>
          </button>
        ))}
      </div>

      {/* Time Slot Buttons */}
      <div className="grid grid-cols-3 gap-4 mb-6 mt-8">
        {getTimeSlotsForDate(selectedDate).map((time) => {
  const isBooked = bookedTimes.includes(time);
  return (
    <button
      key={time}
      onClick={() => !isBooked && setSelectedTime(time)}
      disabled={isBooked}
      className={`text-sm py-2 rounded-lg shadow-sm transition-all duration-150 cursor-pointer ${
        isBooked
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : selectedTime === time
          ? 'bg-[#4438CA] text-white font-bold'
          : 'bg-white text-gray-800'
      }`}
    >
      {time}
    </button>
  );
})}
      </div>

      {/* Book Appointment */}
      <button
  onClick={handleBook}
  className="w-[250px] bg-[#4438CA] text-white font-medium py-2 rounded-full shadow hover:bg-[#2f24a1] transition duration-200 mt-3 ml-[80px] cursor-pointer"
>
  Book Appointment
</button>

    </div>
  );
}
