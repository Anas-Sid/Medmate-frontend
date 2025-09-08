import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendar, FaIdCard } from 'react-icons/fa';
import { FaUserMd } from 'react-icons/fa';

export default function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    pmdcNumber: '',
    specialization: '',
    dob: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      role === 'doctor'
        ? 'https://medmate-backend-ou7e.onrender.com/api/doctor/signup'
        : 'https://medmate-backend-ou7e.onrender.com/api/patient/signup';

    const payload =
      role === 'doctor'
        ? {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            contactNumber: formData.contactNumber,
            pmdcNumber: formData.pmdcNumber,
            specialization: formData.specialization,
            dob: formData.dob,
          }
        : {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            contactNumber: formData.contactNumber,
          };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const storageKey = role === 'doctor' ? 'doctor' : 'patient';
        localStorage.setItem(storageKey, JSON.stringify(data[storageKey]));
        localStorage.setItem('token', data.token);

        navigate(role === 'doctor' ? '/dashboard' : '/patient');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!role) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-[400px] text-center">
        <h2 className="text-3xl font-bold text-[#3E36B0] mb-6">Signup As</h2>
        <div className="space-y-4">
          <button
            onClick={() => setRole('doctor')}
            className="w-full flex items-center justify-center gap-3 bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all cursor-pointer"
          >
            <FaUserMd className="text-xl" />
            Doctor
          </button>
          <button
            onClick={() => setRole('patient')}
            className="w-full flex items-center justify-center gap-3 bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all cursor-pointer"
          >
            <FaUser className="text-xl" />
            Patient
          </button>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-[#3E36B0] mb-6 text-center">
          Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex space-x-3">
            <div className="relative w-1/2">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="pl-10 border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div className="relative w-1/2">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="pl-10 border border-gray-300 rounded px-4 py-2 w-full focus:ring focus:ring-blue-200"
                required
              />
            </div>
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 border border-gray-300 w-full rounded px-4 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}"
              className="pl-10 border border-gray-300 w-full rounded px-4 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}"
              className="pl-10 border border-gray-300 w-full rounded px-4 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="relative">
            <FaPhone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number (11 digits)"
              value={formData.contactNumber}
              onChange={handleChange}
              pattern="\d{11}"
              maxLength="11"
              minLength="11"
              title="Contact number must be exactly 11 numeric digits"
              className="pl-10 border border-gray-300 w-full rounded px-4 py-2 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {role === 'doctor' && (
            <>
              <div className="relative">
                <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="pmdcNumber"
                  placeholder="PMDC Number"
                  value={formData.pmdcNumber}
                  onChange={handleChange}
                  className="pl-10 border border-gray-300 w-full rounded px-4 py-2 focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded px-4 py-2 focus:ring focus:ring-blue-200"
                required
              >
                <option value="">Select Specialization</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Neurology">Neurology</option>
                <option value="Neurosurgery">Neurosurgery</option>
                <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                <option value="Oncology">Oncology</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Otolaryngology (ENT)">ENT</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Plastic Surgery">Plastic Surgery</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Pulmonology">Pulmonology</option>
                <option value="Radiology">Radiology</option>
                <option value="Rheumatology">Rheumatology</option>
                <option value="Other">Other</option>
              </select>

              <div className="relative">
                <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="pl-10 border border-gray-300 w-full rounded px-4 py-2 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
