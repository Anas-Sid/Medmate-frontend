// components/patientdashboardcomponent/SearchBar.jsx
import { Search, Bell, MessageSquare, MessageCircle } from 'lucide-react';

export default function SearchBar({onSearch}) {
  return (
    <div className="flex justify-between items-center px-6 py-4 w-[calc(100%-4rem)] ml-12 -mt-4">
      {/* Search Field */}
      <div className="relative w-[600px] -ml-11">
        <input
          type="text"
          placeholder="Search doctor..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-10 py-2 rounded-lg bg-[#E5E5E5] placeholder-gray-500 text-sm outline-none"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-6 mr-[60px]">
        <MessageCircle className="text-gray-700 hover:text-blue-500 cursor-pointer mr-10" />
        <Bell className="text-gray-700 hover:text-blue-500 cursor-pointer" />
      </div>
    </div>
  );
}
