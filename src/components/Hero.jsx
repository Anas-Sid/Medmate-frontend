export default function Hero() {
  return (
    <section id="home" className="flex flex-col md:flex-row items-center justify-between py-10 px-6 md:py-20 max-w-7xl mx-auto">
      <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Bringing Healthcare to Your Fingertips</h1>
        <p className="text-lg text-gray-600 mb-6">Connect with trusted doctors online — fast, easy, and secure.</p>
      </div>
      <div className="md:w-1/2 animate-fadeIn">
        <img src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Doctor" className="rounded-lg shadow-lg" />
      </div>
    </section>
  );
}
