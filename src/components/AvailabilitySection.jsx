// components/AvailabilitySection.jsx
import React, { useState } from 'react';
import AvailibiltySetForm from './AvailibiltySetForm';
import AvailabilityList from './AvailabilityList';

export default function AvailabilitySection() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleAvailabilityAdded = () => {
    setRefreshTrigger(prev => !prev); // Toggle trigger to force refresh
  };

  return (
    <div>
      <div className='ml-[650px] -mt-[220px]'>
      <AvailibiltySetForm onAvailabilityAdded={handleAvailabilityAdded} />
      </div>
      <div className="-mt-[200px]">
        <AvailabilityList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
