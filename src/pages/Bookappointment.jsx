import React from 'react';
import RightSidebar from '../components/patientdashboradcomponent/Sidebar';
import SearchBar from '../components/patientdashboradcomponent/SearchBar';
import GreetingBanner from '../components/patientdashboradcomponent/GreetingBanner';
import YourAppointmentsBanner from '../components/patientdashboradcomponent/YourAppointmentsBanner';
import DoctorList from '../components/patientdashboradcomponent/DoctorList';
import UpcomingAppointment from '../components/patientdashboradcomponent/UpcomingAppointments';
import DoctorBookingCard from '../components/patientdashboradcomponent/DoctorBookingCard';
import { useNavigate } from 'react-router-dom';

export default function Bookappointment() {
  const navigate = useNavigate();

  const handleDoctorClick = (doctor) => {
    navigate(`/doctor/${doctor.id}`, { state: doctor });
  };

  // Dummy doctor data — replace with backend data when ready
  const recommendedDoctors = [
    {
      id: '1',
      name: 'Dr. Ayesha Siddiqui',
      specialization: 'Dermatologist',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: '2',
      name: 'Dr. Ali Raza',
      specialization: 'Cardiologist',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#3E36B0]  overflow-hidden pt-3 pb-3 pr-3 pl-3 rounded-4xl">
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-6 rounded-4xl">
      <RightSidebar />
      <SearchBar />
      <GreetingBanner />
      <YourAppointmentsBanner />
      <DoctorList doctors={recommendedDoctors} onDoctorClick={handleDoctorClick} />
       <DoctorBookingCard />
     
     </div>
    </div>
  );
}
