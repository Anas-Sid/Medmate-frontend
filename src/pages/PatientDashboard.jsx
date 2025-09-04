import React, { useState } from 'react';
import RightSidebar from '../components/patientdashboradcomponent/Sidebar';
import SearchBar from '../components/patientdashboradcomponent/SearchBar';
import GreetingBanner from '../components/patientdashboradcomponent/GreetingBanner';
import YourAppointmentsBanner from '../components/patientdashboradcomponent/YourAppointmentsBanner';
import DoctorList from '../components/patientdashboradcomponent/DoctorList';
import UpcomingAppointment from '../components/patientdashboradcomponent/UpcomingAppointments';
import { useNavigate } from 'react-router-dom';

export default function PatientDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleDoctorClick = (doctor) => {
    navigate(`/doctor/${doctor.id}`, { state: doctor });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#3E36B0] overflow-hidden pt-3 pb-3 pr-3 pl-3 rounded-4xl">
      <div className="min-h-screen bg-[#F9FAFB] px-6 py-6 rounded-4xl">
        <RightSidebar />
        <SearchBar onSearch={setSearchQuery} />
        <GreetingBanner />
        <YourAppointmentsBanner />
        <DoctorList searchQuery={searchQuery} onDoctorClick={handleDoctorClick} />
        <UpcomingAppointment />
      </div>
    </div>
  );
}
