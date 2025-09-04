import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Calender from './Calender.jsx';
import DoctorImage from '../assets/DoctorImage.svg';
export function VisitCalendarCards({ visitCount = 104 }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 px-6 mt-4">
      {/* Visits for Today */}
      <div className="flex-1  md:w-[800.15px] md:h-[240.68px] rounded-xl shadow-md p-4 relative overflow-visible" style={{ background: "linear-gradient(90deg, #B2E6FD 0%, #9BD8F1 39%, #2D0CFF 100%)" }}>
        <h2 className="text-lg font-semibold text-black">Visits for Today</h2>
        <p className="mt-2 text-4xl font-bold text-gray-800">{visitCount}</p>
         <div className="flex gap-5 flex-wrap justify-center p-5">
      {/* New Patients Card */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-2 w-40 h-20 shadow-lg border border-white/20 mt-7 -ml-[320px]">
        <div className="text-base font-semibold text-gray-700 mb-2">
          New Patients
        </div>
        <div className='flex flex-row p-1 '>
        <div className="text-2xl font-bold text-gray-800 mb-2 leading-none">
          40
        </div>
        <div className="inline-flex items-center gap-1.5 text-green-500  rounded-full text-sm font-semibold ml-12">
          51% <span className="text-xs">↗</span>
        </div>
        </div>
      </div>

      {/* Old Patients Card */}
      <div className="bg-white/40 backdrop-blur-md rounded-2xl p-2 w-40 h-20 shadow-lg border border-white/20 mt-7">
        <div className="text-base font-semibold text-gray-700 mb-4">
          Old Patients
        </div>
         <div className='flex flex-row '>
        <div className="text-2xl font-bold text-gray-800 mb-2 leading-none">
          64
        </div>
        <div className="inline-flex items-center gap-1.5 text-red-600  rounded-full text-sm font-semibold ml-12 mb-2">
          21% <span className="text-xs">↗</span>
        </div>
        </div> 
      </div>
    </div>

        {/* Doctor image slightly overflowing card */}
        <div className="absolute -top-6 -right-6 w-[400px] h-[400px]  overflow-visible ">
          {/* Replace below comment with actual image */}
           <img src={DoctorImage} alt="Doctor" className="object-cover w-[390px] h-[350px] -ml-[15px] -mt-[84px]" /> 
          <div className="bg- w-full h-full overflow-hidden " />
        </div>
      </div>

      {/* Calendar */}
      
        
        <Calender className="w-full border-none flex-1 bg-white rounded-xl shadow-md p-4" />
     
    </div>
  );
}
