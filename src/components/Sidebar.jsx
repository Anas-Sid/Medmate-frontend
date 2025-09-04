import Logo from '../assets/Logo.svg';
import { Settings, ClockPlus, MessageSquareMore, Calendar, LayoutDashboard, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('doctor');
    localStorage.removeItem('patient');
    navigate('/');
  };

  return (
    <>
      {/* Sidebar */}
      <div className="w-20 bg-[#3E36B0] text-white flex flex-col items-center py-6 space-y-8 min-h-screen rounded-l-4xl">
        {/* Logo */}
        <img src={Logo} alt="MedMate Logo" className="h-15 w-auto cursor-pointer rotate-90" />

        {/* Navigation Icons */}
        <div className="flex flex-col space-y-12 text-white text-center mt-[50px]">
          <Link to="/dashboard">
            <LayoutDashboard className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
          </Link>
          <Link to="/availibilty">
            <Calendar className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
          </Link>
          <Link to="/doctor/chat">
            <MessageSquareMore className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
          </Link>
          <ClockPlus className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
          <Settings className="w-6 h-6 hover:text-blue-300 cursor-pointer" />

          {/* Logout Trigger */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="bg-transparent hover:text-red-400 transition-colors"
          >
            <LogOut className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Are you sure you want to log out?</h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
