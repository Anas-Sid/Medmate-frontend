import React from 'react';
import DoctorImage from '../assets/DoctorImage.svg';
import AvailabilitySection from './AvailabilitySection';

export default function Availibiltybanner() {
  return (
    <div>
      <div className="flex-1 md:w-[600px] md:h-[161px] rounded-xl shadow-md p-4 relative mb-10" style={{ background: "linear-gradient(90deg, #B2E6FD 0%, #9BD8F1 39%, #2D0CFF 100%)" }}>
        <h2 className="text-5xl font-semibold text-black mt-[35px] ml-4">Availibilty</h2>
        <div className="absolute -top-6 -right-6 w-[300px] h-[300px] pointer-events-none">
          <img
            src={DoctorImage}
            alt="Doctor"
            className="w-[260px] h-[240px] -mt-[49px] pointer-events-none"
          />
        </div>
      </div>

      <div className='w-[600px]'>
        <AvailabilitySection />
      </div>
    </div>
  );
}
