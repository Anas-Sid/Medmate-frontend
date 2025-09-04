import { Bell, MessageCircle, Search } from 'lucide-react';
import ProfilePicture from '../assets/ProfilePicture.png';

export function DoctorHeader({ searchTerm, setSearchTerm }) {
  let doctor = null;
  try {
    const doctorString = localStorage.getItem('doctor');
    if (doctorString && doctorString !== 'undefined') {
      doctor = JSON.parse(doctorString);
    }
  } catch (err) {
    console.error('Error parsing doctor from localStorage:', err);
  }

  const doctorName = doctor
    ? `${doctor.firstName.charAt(0).toUpperCase() + doctor.firstName.slice(1)} ${doctor.lastName.charAt(0).toUpperCase() + doctor.lastName.slice(1)}`
    : '';

  return (
    <div className="w-full px-9 py-4 bg-white shadow flex justify-between items-center">
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm} // ✅ bind state
          onChange={(e) => setSearchTerm(e.target.value)} // ✅ update state
          className="w-full px-9 py-3 bg-[#E5E5E5] border border-gray-300 rounded-2xl focus:outline-none placeholder:text-gray-400 text-sm font-medium"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6 text-gray-600 hover:text-blue-300 cursor-pointer mr-10" />
        <MessageCircle className="w-6 h-6 text-gray-600 hover:text-blue-300 cursor-pointer mr-10" />
        <div className="flex items-center space-x-3 border border-gray-200 rounded-2xl px-2 py-1">
          <img
            src={ProfilePicture}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">
            Dr {doctorName}
          </span>
        </div>
      </div>
    </div>
  );
}

