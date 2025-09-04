export default function Services() {
  return (
    <section id="services" className="py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-fadeIn">
            <img src="https://images.pexels.com/photos/7709287/pexels-photo-7709287.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Consultation" className="mx-auto mb-4 rounded" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Online Consultations</h3>
            <p className="text-gray-600">Easily connect with doctors online anytime, anywhere.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-fadeIn delay-150">
            <img src="https://images.pexels.com/photos/8376259/pexels-photo-8376259.jpeg" alt="Secure Platform" className="mx-auto mb-4 rounded" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Platform</h3>
            <p className="text-gray-600">We prioritize patient privacy with end-to-end secure technology.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition animate-fadeIn delay-300">
            <img src="https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg" alt="Verified Doctors" className="mx-auto mb-4 rounded" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Doctors</h3>
            <p className="text-gray-600">Our medical team consists of highly qualified and verified professionals.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
