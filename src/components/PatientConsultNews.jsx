import Cart_pic from '../assets/Cart_pic.svg'
import PatientListCard from './PatientListCard';





export function PatientConsultNews({ patients = [] }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 mt-4 ">
      {/* Patient List */}
       <div className="flex-1 lg:flex-[2] gap-6 pr-1 mt-4 "> {/* This makes it take 2/3 of available space */}
        <PatientListCard patients={patients} />
      </div>
      {/* News Card */}
      <div className="relative bg-white rounded-2xl p-4 shadow-xl w-full max-w-sm transform rotate-[-2deg]">
      {/* Green Dot */}
      <div className="absolute top-5 left-4 w-2 h-2 bg-green-400 rounded-full"></div>

      {/* Tag */}
      <div className="text-xs text-gray-400 font-semibold mb-1 pl-4">DAILY READ</div>

      {/* Headline */}
      <h3 className="text-base font-bold text-gray-800 px-4">
        Equitable medical education with efforts toward real change
      </h3> 

      {/* Article Image */}
      <div className="mt-4 rounded-xl overflow-hidden mx-4">
        {/* Replace below with actual image later */}
         <img src={Cart_pic} alt="Medical Article" className="object-cover w-full h-full" /> 
        
      </div>
    </div>
    </div>
  );
}
