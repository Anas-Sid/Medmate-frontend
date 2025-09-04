export function GreetingBanner() {
  // Capitalize function:
  function capitalize(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  // Read doctor from localStorage:
 let doctor = null;
  try {
    const doctorString = localStorage.getItem('doctor');
    if (doctorString && doctorString !== 'undefined') {
      doctor = JSON.parse(doctorString);
    }
  } catch (err) {
    console.error('Error parsing doctor from localStorage:', err);
  }

  // Build doctor name:
  const doctorName = doctor
    ? `Dr ${capitalize(doctor.firstName)} ${capitalize(doctor.lastName)}`
    : 'Dr';

  // Determine greeting:
  const currentHour = new Date().getHours();
  let greeting = '';

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = 'Good Evening';
  } else {
    greeting = 'Good Night';
  }

  return (
    <div className="w-full px-6 py-4 bg-white text-2xl font-poppins">
      {greeting},{" "}
      <span className="text-[#3E36B0] font-bold">
        {doctorName}!
      </span>
    </div>
  );
}


