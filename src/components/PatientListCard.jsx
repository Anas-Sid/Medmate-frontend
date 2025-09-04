import { ChevronDown } from 'lucide-react';

import { Link } from 'react-router-dom';

export default function PatientListCard({ patients = [] }) {
  

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-[720px] -mt-[120px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Patient List</h2>
       <Link
  to="/patients"
  style={{ zIndex: 9999, position: 'relative' }}
  className="text-sm text-blue-500 font-medium cursor-pointer hover:underline"
>
  See all
</Link>
      </div>

      {/* Patient Items */}
      <ul className="space-y-3">
        {patients.slice(0, 6).map((patient, index) => (
          <li key={index} className="flex justify-between items-center">
            {/* Avatar + Info */}
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: patient.color }}
              >
                {patient.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {patient.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: patient.labelColor }}
                >
                  {patient.label}
                </div>
              </div>
            </div>

            {/* Time Tag */}
            <span
              className="text-xs font-semibold px-2 py-1 rounded-md"
              style={{
                backgroundColor: patient.timeBg,
                color: patient.timeColor,
              }}
            >
              {patient.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
