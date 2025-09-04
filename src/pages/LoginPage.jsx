import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaUser } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-[400px] text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#3E36B0]">Login As</h2>

        {/* Doctor button → Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center justify-center gap-2 bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all cursor-pointer"
        >
          <FaUserMd />
          Doctor
        </button>

        {/* Patient button → PatientDashboard */}
        <button
          onClick={() => navigate("/patient-dashboard")}
          className="w-full flex items-center justify-center gap-2 bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all cursor-pointer"
        >
          <FaUser />
          Patient
        </button>
      </div>
    </div>
  );
}
