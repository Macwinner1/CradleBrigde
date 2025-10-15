import React from 'react';
import { motion } from 'framer-motion';
import { FaFutbol, FaMusic, FaTheaterMasks, FaChess, FaPalette, FaMicroscope } from 'react-icons/fa';

const SchoolLife = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const activities = [
    {
      icon: FaFutbol,
      title: 'Sports',
      description: 'Football, basketball, athletics, table tennis, and inter-house competitions.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaMusic,
      title: 'Music',
      description: 'Choir, instrumental classes, and musical performances.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaTheaterMasks,
      title: 'Drama & Arts',
      description: 'Theater productions, creative writing, and dramatic performances.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: FaChess,
      title: 'Debate & Chess',
      description: 'Debate club, chess tournaments, and critical thinking activities.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaPalette,
      title: 'Visual Arts',
      description: 'Painting, drawing, crafts, and creative expression.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FaMicroscope,
      title: 'Science Club',
      description: 'Experiments, projects, and scientific exploration.',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const testimonials = [
    {
      name: 'Chinedu Okafor',
      role: 'SS3 Student',
      image: 'CO',
      text: 'Cradle Bridge has given me opportunities to discover my talents in both academics and sports. The teachers genuinely care about our success.'
    },
    {
      name: 'Blessing Eze',
      role: 'Primary 6 Student',
      text: 'I love the science club! We do amazing experiments and I want to become a scientist when I grow up.'
    },
    {
      name: 'David Okon',
      role: 'JSS2 Student',
      text: 'The debate club helped me build confidence. Now I can speak in front of people without being nervous!'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-navy text-white overflow-hidden">
        <div className="container-custom px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="heading-primary text-white mb-6">School Life</h1>
            <p className="text-xl text-navy-100 max-w-3xl mx-auto">
              Beyond the Classroom: Growing, Learning, and Thriving Together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Extracurriculars */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Extracurricular Activities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer diverse activities to help students discover and develop their talents
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${activity.color} rounded-xl flex items-center justify-center mb-4`}>
                  <activity.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-navy-900 mb-3">{activity.title}</h3>
                <p className="text-gray-600 leading-relaxed">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Student Voices</h2>
            <p className="text-lg text-gray-600">
              Hear what our students have to say about life at Cradle Bridge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-navy rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.image || testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-navy text-white">
        <div className="container-custom text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-heading font-bold mb-6">
              Be Part of Our Community
            </h2>
            <p className="text-xl mb-8 text-navy-100 max-w-2xl mx-auto">
              Discover your potential and make lifelong memories at Cradle Bridge Schools.
            </p>
            <a href="/admissions" className="btn-primary bg-white text-navy-900 hover:bg-navy-100">
              Apply Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SchoolLife;
