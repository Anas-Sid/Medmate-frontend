import Sidebar from '../components/Sidebar';
import { DoctorHeader } from '../components/DoctorHeader';
import patients from '../data/patient'; // Sample patient data, replace with actual data source
import AllPatientList from '../components/AllPatientList';
import Calender from '../components/Calender';


export default function Dashboard() {


  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar */}
      <Sidebar />


      <div className="flex-1 flex flex-col bg-[#3E36B0]  overflow-hidden pt-3 pb-3 pr-3 rounded-r-4xl">
      <div className="bg-white rounded-4xl h-full w-full p-4 flex flex-col">
  <DoctorHeader />

  {/* Main Content Grid */}
  <div className="flex flex-1 mt-6 gap-6">
    {/* Left: Patient List */}
    <div className="flex-1">
      <AllPatientList patients={patients} />
    </div>

    {/* Right: Calendar + Upcoming */}
    <div className="w-[350px] flex flex-col space-y-6">
      <Calender />
      
      {/* Upcoming Section (optional placeholder) */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Upcoming</h2>
        <div className="text-sm text-gray-600">Monthly doctor's meet</div>
        <div className="text-xs text-gray-400">8 April, 2021 | 04:00 PM</div>
      </div>
    </div>
  </div>
  </div>
</div>
    </div>
  );
}
