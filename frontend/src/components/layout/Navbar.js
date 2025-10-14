import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/academics', label: 'Academics' },
    { path: '/school-life', label: 'School Life' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy-900 text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm px-4">
          <div className="flex items-center space-x-6">
            <a href="tel:+2348012345678" className="flex items-center hover:text-navy-300 transition">
              <FaPhone className="mr-2" size={14} />
              +234 801 234 5678
            </a>
            <a href="mailto:info@cradlebridgeschools.com" className="flex items-center hover:text-navy-300 transition">
              <FaEnvelope className="mr-2" size={14} />
              info@cradlebridgeschools.com
            </a>
          </div>
          <div className="text-navy-300">
            Udu, Delta State, Nigeria
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container-custom px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-navy rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">CB</span>
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-navy-900 leading-tight">
                  Cradle Bridge
                </h1>
                <p className="text-xs text-navy-600">Excellence in Education</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-navy-900 bg-navy-50'
                      : 'text-gray-700 hover:text-navy-900 hover:bg-navy-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admissions"
                className="ml-4 btn-primary"
              >
                Apply Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-navy-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="text-navy-900" size={24} />
              ) : (
                <FaBars className="text-navy-900" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-screen' : 'max-h-0'
          }`}
        >
          <div className="px-4 py-4 bg-white border-t border-gray-100 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-navy-900 bg-navy-50'
                    : 'text-gray-700 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admissions"
              className="block w-full text-center btn-primary mt-4"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
