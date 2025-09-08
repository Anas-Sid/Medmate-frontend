import Sidebar from '../components/Sidebar';
import { DoctorHeader } from '../components/DoctorHeader';
import { GreetingBanner } from '../components/GreetingBanner';
import Availibiltybanner from '../components/Availibiltybanner';
import { VisitCalendarCards } from '../components/VisitCalendarCards';
import { PatientConsultNews } from '../components/PatientConsultNews';
import AvailibiltySetForm from '../components/AvailibiltySetForm';
import ChatLayout from '../components/chat/ChatLayout';



export default function DoctorChat({ currentUser, role }) {
 
  return (
    <div className="flex h-screen">
      {/* Doctor main sidebar (80px width) */}
      <div className="w-[80px] text-white">
        <Sidebar />
      </div>
       <div className="flex-1 flex flex-col bg-[#3E36B0] h-[598px]  overflow-hidden pt-3 pb-3 pr-3 rounded-r-4xl -mt-6">
      {/* Chat layout (takes remaining space) */}
      <div className="flex-1">
        <ChatLayout currentUser={currentUser} role={role} />
      </div>
      </div>
    </div>
  );
}
