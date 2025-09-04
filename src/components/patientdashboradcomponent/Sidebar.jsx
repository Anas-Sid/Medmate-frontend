import { Home, CalendarDays, MessageCircle, PieChart, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/Logo.svg';

export default function RightSidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('patient');
    localStorage.removeItem('doctor');
    navigate('/');
  };

  return (
    <>
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-16 bg-gradient-to-r from-[#B4C1FF] via-[#8097E9] to-[#3E36B0] shadow-md flex flex-col items-center pt-6 rounded-4xl z-50">
        {/* Logo */}
        <div className="mb-6">
          <img src={Logo} alt="MedMate Logo" className="h-10 w-auto cursor-pointer rotate-90" />
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-6 mt-[50px]">
          <Link to="/patient">
            <SidebarIcon icon={<Home />} />
          </Link>
          <Link to="/apointmentbook">
            <SidebarIcon icon={<CalendarDays />} />
          </Link>
          <Link to="/patient/chat">
            <SidebarIcon icon={<MessageCircle />} />
          </Link>
          <SidebarIcon icon={<PieChart />} />
          <SidebarIcon icon={<Settings />} />
        </div>

        {/* Logout Button */}
        <div className="mt-auto mb-6">
          <button onClick={() => setShowLogoutModal(true)}>
            <SidebarIcon icon={<LogOut />} />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to log out?
            </h2>
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

function SidebarIcon({ icon }) {
  return (
    <div className="bg-transparent hover:bg-[#f0f0ff] p-2 rounded-xl cursor-pointer transition-all">
      {icon}
    </div>
  );
}
