import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { DoctorHeader } from '../components/DoctorHeader';
import { GreetingBanner } from '../components/GreetingBanner';
import { VisitCalendarCards } from '../components/VisitCalendarCards';
import { PatientConsultNews } from '../components/PatientConsultNews';

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [visitCount, setVisitCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // ✅ new

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    if (!doctor?.id) return;

    fetch(`https://medmate-backend-ou7e.onrender.com/api/appointments/doctor/${doctor.id}/patients`)
      .then(res => res.json())
      .then(data => {
        setPatients(data);
        setVisitCount(data.length);
      })
      .catch(err => console.error('Failed to fetch patients:', err));
  }, []);

  const doctorName = 'Dr. Anas Siddiqui';

  // ✅ Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#3E36B0] overflow-hidden pt-3 pb-3 pr-3 rounded-r-4xl">
        <div className="bg-white rounded-4xl h-full w-full p-4">
          <DoctorHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* ✅ pass props */}
          <GreetingBanner doctorName={doctorName} />
          <VisitCalendarCards visitCount={visitCount} />
          <PatientConsultNews patients={filteredPatients} /> {/* ✅ filtered list */}
        </div>
      </div>
    </div>
  );
}
