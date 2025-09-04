import React, { useEffect, useState } from 'react';

export default function GreetingBanner() {
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('patient');
      if (stored && stored !== 'undefined') {
        const patient = JSON.parse(stored);
        const capitalize = (str) =>
          str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
        const name = `${capitalize(patient.firstName)} ${capitalize(patient.lastName)}`;
        setPatientName(name);
      }
    } catch  {
      console.error('Error loading patient from localStorage');
    }
  }, []);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="mt-4 mb-2 px-6">
      <h1 className="text-2xl md:text-3xl font-poppins">
        {getGreeting()}{' '}
        <span className="text-[#3E36B0] font-bold">
          {patientName || 'Patient'}!
        </span>
      </h1>
    </div>
  );
}
