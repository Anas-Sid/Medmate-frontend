import React from 'react';
import AppointmentImage from '../../assets/Appointments.svg'; // replace with correct image path

export default function YourAppointmentsBanner() {
  return (
    <div
      className="flex items-center justify-between w-[486px] h-[120px] rounded-4xl px-4 py-3 shadow mt-[30px] ml-10"
      style={{
        background: 'linear-gradient(to right, #e7ecff, #c8d4f9)',
      }}
    >
      <div>
        <p className="text-black font-bold leading-tight text-[30px]">
          Your <br /> Appointments
        </p>
      </div>
      <img
        src={AppointmentImage}
        alt="Appointments"
        className="w-[150px] h-[150px] object-contain -mt-12 ml-12"
      />
    </div>
  );
}
