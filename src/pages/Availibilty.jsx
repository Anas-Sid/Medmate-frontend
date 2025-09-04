import Sidebar from '../components/Sidebar';
import { DoctorHeader } from '../components/DoctorHeader';
import { GreetingBanner } from '../components/GreetingBanner';
import Availibiltybanner from '../components/Availibiltybanner';
import { VisitCalendarCards } from '../components/VisitCalendarCards';
import { PatientConsultNews } from '../components/PatientConsultNews';
import AvailibiltySetForm from '../components/AvailibiltySetForm';



export default function Availibilty() {
  // 🔗 These values should come from backend
  const doctorName = 'Dr. Anas Siddiqui'; // Replace with backend data
       // Replace with backend data
 
  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#3E36B0]  overflow-hidden pt-3 pb-3 pr-3 rounded-r-4xl">
  <div className="bg-white rounded-4xl h-full w-full p-4">
    <DoctorHeader />
    <GreetingBanner doctorName={doctorName} />
   <div className="flex flex-wrap justify-between items-start gap-6 mt-6">
  <div className="flex-1 min-w-[400px]">
    <Availibiltybanner />
  </div>
  <div className="w-[400px] shadow-2xl">
    
  </div>
</div>
  
  </div>
</div>
    </div>
  );
}
