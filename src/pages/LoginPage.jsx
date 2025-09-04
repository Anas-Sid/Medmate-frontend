import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

// ✅ Moved outside main component to prevent re-render issues
const InputField = ({ icon: Icon, type, value, onChange, placeholder }) => (
  <div className="relative">
    <Icon className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="pl-10 w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      required
    />
  </div>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      role === 'doctor'
        ? 'http://localhost:5000/api/doctor/login'
        : 'http://localhost:5000/api/patient/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const storageKey = role === 'doctor' ? 'doctor' : 'patient';
        localStorage.setItem(storageKey, JSON.stringify(data[storageKey]));
        localStorage.setItem('token', data.token);
        navigate(role === 'doctor' ? '/dashboard' : '/patient');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <div className="bg-white rounded-3xl shadow-lg p-10 w-[400px] text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#3E36B0]">Login As</h2>
          <button
            onClick={() => setRole('doctor')}
            className="w-full flex items-center justify-center gap-2 bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all cursor-pointer"
          >
            <FaUserMd />
            Doctor
          </button>
          <button
            onClick={() => setRole('patient')}
            className="w-full flex items-center justify-center gap-2 bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all cursor-pointer"
          >
            <FaUser />
            Patient
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-[#3E36B0] text-center mb-2">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={FaEnvelope}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <InputField
            icon={FaLock}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <button
            type="submit"
            className="w-full bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-all cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
