import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/academics', label: 'Academics' },
    { path: '/admissions', label: 'Admissions' },
  ];

  const resources = [
    { path: '/school-life', label: 'School Life' },
    { path: '/blog', label: 'News & Events' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/admin/login', label: 'Admin Login' },
  ];

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CB</span>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">Cradle Bridge</h3>
                <p className="text-navy-300 text-sm">Schools</p>
              </div>
            </div>
            <p className="text-navy-300 leading-relaxed">
              Nurturing young minds and building future leaders through quality education and character development.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-navy-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-navy-600 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-navy-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center hover:bg-navy-600 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-navy-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-navy-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 text-navy-400" size={18} />
                <span className="text-navy-300">
                  Udu, Delta State,<br />Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-navy-400" size={16} />
                <a href="tel:+2348012345678" className="text-navy-300 hover:text-white transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-navy-400" size={16} />
                <a href="mailto:info@cradlebridgeschools.com" className="text-navy-300 hover:text-white transition-colors">
                  info@cradlebridgeschools.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-navy-400 text-sm">
              © {currentYear} Cradle Bridge Schools. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-navy-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-navy-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
