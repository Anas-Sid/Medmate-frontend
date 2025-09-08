import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorImage from '../../assets/DoctorImage.svg';

export default function DoctorList({ searchQuery = "", onDoctorClick }) {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://medmate-backend-ou7e.onrender.com/api/doctor/all')
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error('Failed to fetch doctors:', err));
  }, []);

  const capitalize = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';

  // ✅ Filter by name or specialization
  const filteredDoctors = doctors.filter((doctor) => {
  const fullName = `${doctor.firstName || ''} ${doctor.lastName || ''}`.toLowerCase();
  const specialization = (doctor.specialization || '').toLowerCase();
  return (
    fullName.includes(searchQuery.toLowerCase()) ||
    specialization.includes(searchQuery.toLowerCase())
  );
});

  return (
    <div className="bg-white w-[485px] h-full rounded-4xl p-4 shadow-md ml-10 mt-10">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-black">Doctors</h2>
        <button className="text-xl font-light">≡</button>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-gray-300">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => onDoctorClick(doctor)}
            className="cursor-pointer flex items-center justify-between p-3 rounded-xl text-black"
            style={{
              background:
                'linear-gradient(90deg, #B2E6FD 0%, #9BD8F1 39%, #2D0CFF 100%)',
            }}
          >
            <div>
              <p className="font-bold text-[15px]">
                {capitalize(doctor.firstName)} {capitalize(doctor.lastName)}
              </p>
              <p className="text-[12px]">{doctor.specialization}</p>
              <p className="text-[14px] font-bold mt-3">Appointment Fee</p>
              <p className="text-[11px] font-semibold">PKR 1500</p>
            </div>
            <img
              src={DoctorImage}
              alt="Doctor"
              className="w-25 h-25 object-cover -mb-3 rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

