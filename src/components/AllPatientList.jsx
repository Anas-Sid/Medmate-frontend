import { useEffect, useState } from 'react';

export default function AllPatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    if (!doctor?.id) return;

    fetch(`https://medmate-backend-ou7e.onrender.com/api/appointments/doctor/${doctor.id}/patients`)
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error('Error loading all patient appointments:', err));
  }, []);

  const maxVisible = 12;
  const visiblePatients = patients.slice(0, maxVisible);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-[720px] h-[520px] flex flex-col mt-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">All Patients</h2>
      </div>

      <ul className="space-y-3 overflow-y-auto pr-2 flex-1">
        {visiblePatients.map((patient, index) => (
          <li key={index} className="flex justify-between items-center">
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
                <div className="text-xs" style={{ color: patient.labelColor }}>
                  {patient.label}
                </div>
              </div>
            </div>

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
