export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h3 className="text-2xl font-bold mb-4">DocPortal</h3>
          <p>Empowering healthcare through technology.</p>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-blue-400">Home</a></li>
            <li><a href="#about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#services" className="hover:text-blue-400">Services</a></li>
            <li><a href="#contact" className="hover:text-blue-400">Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
          <p>Email: support@docportal.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        
      </div>
      <div className="text-center mt-8 text-gray-400">
        &copy; 2025 DocPortal. All rights reserved.
      </div>
    </footer>
  );
}
