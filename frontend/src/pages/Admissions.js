import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { applicationsAPI } from '../services/api';
import { sendApplicationConfirmation, sendApplicationNotification } from '../services/emailService';

const Admissions = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    parentName: '',
    gradeApplyingFor: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const grades = [
    'Nursery 1',
    'Nursery 2',
    'KG 1',
    'KG 2',
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Primary 6',
    'JSS 1',
    'JSS 2',
    'JSS 3',
    'SS 1',
    'SS 2',
    'SS 3'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.gradeApplyingFor) {
      newErrors.gradeApplyingFor = 'Please select a grade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      // Submit to backend
      const response = await applicationsAPI.submit(formData);

      if (response.data.success) {
        // Send emails via EmailJS
        await Promise.all([
          sendApplicationConfirmation(formData),
          sendApplicationNotification(formData)
        ]);

        toast.success('Application submitted successfully! Check your email for confirmation.');
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          parentName: '',
          gradeApplyingFor: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Application error:', error);
      if (error.response?.data?.errors) {
        const apiErrors = {};
        error.response.data.errors.forEach(err => {
          toast.error(err);
        });
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const admissionSteps = [
    {
      step: '1',
      title: 'Submit Application',
      description: 'Fill out the online application form with required information'
    },
    {
      step: '2',
      title: 'Review Process',
      description: 'Our team reviews your application and contacts you within 48 hours'
    },
    {
      step: '3',
      title: 'Visit & Assessment',
      description: 'Schedule a school visit and student assessment'
    },
    {
      step: '4',
      title: 'Enrollment',
      description: 'Complete enrollment and begin your journey with us'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-navy text-white overflow-hidden">
        <div className="container-custom px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="heading-primary text-white mb-6">Admissions</h1>
            <p className="text-xl text-navy-100 max-w-3xl mx-auto">
              Begin Your Journey to Excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Admission Process</h2>
            <p className="text-lg text-gray-600">
              Simple steps to join the Cradle Bridge family
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {admissionSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-navy rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-heading font-semibold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl">
          <motion.div {...fadeInUp} className="card">
            <div className="text-center mb-8">
              <h2 className="heading-secondary mb-4">Application Form</h2>
              <p className="text-gray-600">
                Complete the form below to apply for admission. All fields marked with * are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`input-field ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="Enter student's full name"
                />
                {errors.fullName && <p className="error-message">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Parent/Guardian Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input-field ${errors.phone ? 'input-error' : ''}`}
                  placeholder="+234 800 000 0000"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>

              {/* Parent Name */}
              <div>
                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter parent/guardian name"
                />
              </div>

              {/* Grade */}
              <div>
                <label htmlFor="gradeApplyingFor" className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Applying For *
                </label>
                <select
                  id="gradeApplyingFor"
                  name="gradeApplyingFor"
                  value={formData.gradeApplyingFor}
                  onChange={handleChange}
                  className={`input-field ${errors.gradeApplyingFor ? 'input-error' : ''}`}
                >
                  <option value="">Select a grade</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                {errors.gradeApplyingFor && <p className="error-message">{errors.gradeApplyingFor}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="input-field"
                  placeholder="Any additional information you'd like to share..."
                ></textarea>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                <FaInfoCircle className="text-blue-600 mr-3 mt-1 flex-shrink-0" size={20} />
                <p className="text-sm text-blue-800">
                  You will receive a confirmation email after submitting. Our admissions team will contact you within 48 hours to schedule a visit.
                </p>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full md:w-auto px-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="spinner mr-3"></div>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaCheckCircle className="mr-2" />
                      Submit Application
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div {...fadeInUp} className="card">
            <h2 className="heading-secondary text-center mb-8">Admission Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">For New Students:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-navy-500 mr-2">•</span>
                    <span className="text-gray-700">Birth certificate or affidavit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-navy-500 mr-2">•</span>
                    <span className="text-gray-700">Previous school report (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-navy-500 mr-2">•</span>
                    <span className="text-gray-700">Passport photographs (4 copies)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-navy-500 mr-2">•</span>
                    <span className="text-gray-700">Medical fitness certificate</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-4">For Transfer Students:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-navy-500 mr-2">•</span>
                    <span className="text-gray-700">Transfer certificate from previous school</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-navy-500 mr-2">•</span>
                    <span className="text-gray-700">Latest report card</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-navy-500 mr-2">•</span>
                    <span className="text-gray-700">All documents listed for new students</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
