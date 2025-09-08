import Sidebar from '../components/patientdashboradcomponent/Sidebar';
import { DoctorHeader } from '../components/DoctorHeader';
import { GreetingBanner } from '../components/GreetingBanner';
import Availibiltybanner from '../components/Availibiltybanner';
import { VisitCalendarCards } from '../components/VisitCalendarCards';
import { PatientConsultNews } from '../components/PatientConsultNews';
import AvailibiltySetForm from '../components/AvailibiltySetForm';
import ChatLayout from '../components/chat/ChatLayout';



export default function PatientChat({ currentUser, role }) {
 
  return (
     <div className="flex h-screen">
      {/* Doctor main sidebar (80px width) */}
      <div className=" bg-[#3E36B0] text-white">
        <Sidebar />
      </div>

      {/* Chat layout (takes remaining space) */}
       <div className=" pr-[64px] flex-1 flex flex-col bg-[#3E36B0] h-[630px]  overflow-hidden pt-3 pb-3  rounded-r-4xl -mt-6 pl-3">
            {/* Chat layout (takes remaining space) */}
            <div className="flex-1">
              <ChatLayout currentUser={currentUser} role={role} />
            </div>
            </div>
    </div>
  );
}
