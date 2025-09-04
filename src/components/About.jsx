export default function About() {
  return (
    <section id="about" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Image - appears first on desktop (left), second on mobile */}
        <div className="w-full md:w-1/2 order-2 md:order-1 animate-fadeInLeft">
          <img
            src="https://images.pexels.com/photos/8376269/pexels-photo-8376269.jpeg"
            alt="Medical Team"
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Text - appears first on mobile, second on desktop */}
        <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-2 animate-fadeInRight">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            DocPortal is dedicated to making healthcare accessible to all. Our online platform connects patients with verified and experienced medical professionals — all from the comfort of your home.
          </p>
        </div>

      </div>
    </section>
  );
}
