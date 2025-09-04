import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from '../assets/Logo.svg';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <RouterLink to="/">
          <img src={Logo} alt="MedMate Logo" className="h-10 md:h-15 w-auto cursor-pointer ml-29 md:ml-12 rotate-90" />
        </RouterLink>

        {/* Desktop Nav */}
        <nav className="space-x-6 text-gray-700 font-medium hidden md:block">
          <ScrollLink to="home" smooth={true} offset={-80} duration={500} className="hover:text-blue-500 cursor-pointer">Home</ScrollLink>
          <ScrollLink to="about" smooth={true} offset={-80} duration={500} className="hover:text-blue-500 cursor-pointer">About Us</ScrollLink>
          <ScrollLink to="services" smooth={true} offset={-80} duration={500} className="hover:text-blue-500 cursor-pointer">Our Services</ScrollLink>
          <ScrollLink to="contact" smooth={true} offset={-80} duration={500} className="hover:text-blue-500 cursor-pointer">Contact Us</ScrollLink>
        </nav>

        {/* Desktop Buttons */}
        <div className="space-x-2 hidden md:block">
          <RouterLink to="/login">
            <button className="px-9 py-1 border mr-5 border-blue-600 text-blue-600 rounded-lg font-medium transition-all hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg cursor-pointer">
              Login
            </button>
          </RouterLink>
          <RouterLink to="/signup">
            <button className="px-9 py-1 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg cursor-pointer">
              Signup
            </button>
          </RouterLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-blue-600">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-white shadow-md space-y-4">
          <ScrollLink to="home" smooth={true} offset={-80} duration={500} onClick={toggleMenu} className="block text-gray-700 hover:text-blue-500 cursor-pointer">Home</ScrollLink>
          <ScrollLink to="about" smooth={true} offset={-80} duration={500} onClick={toggleMenu} className="block text-gray-700 hover:text-blue-500 cursor-pointer">About Us</ScrollLink>
          <ScrollLink to="services" smooth={true} offset={-80} duration={500} onClick={toggleMenu} className="block text-gray-700 hover:text-blue-500 cursor-pointer">Our Services</ScrollLink>
          <ScrollLink to="contact" smooth={true} offset={-80} duration={500} onClick={toggleMenu} className="block text-gray-700 hover:text-blue-500 cursor-pointer">Contact Us</ScrollLink>
          
          <div className="pt-2 border-t border-gray-300">
            <RouterLink to="/login">
              <button className="w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all mb-2">
                Login
              </button>
            </RouterLink>
            <RouterLink to="/signup">
              <button className="text-center w-full  px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all">
                Signup
              </button>
            </RouterLink>
          </div>
        </div>
      )}
    </header>
  );
}
