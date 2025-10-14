import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaHeart, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="heading-primary text-white mb-6">About Cradle Bridge Schools</h1>
            <p className="text-xl text-navy-100 max-w-3xl mx-auto leading-relaxed">
              Excellence in Education | Building Future Leaders Since 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="heading-secondary mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2010, Cradle Bridge Schools emerged from a vision to provide quality, 
                  affordable education to the children of Udu and its environs in Delta State, Nigeria.
                </p>
                <p>
                  Over the years, we have grown from a small nursery school to a comprehensive 
                  educational institution offering classes from Nursery through Senior Secondary, 
                  consistently producing students who excel academically and demonstrate strong character.
                </p>
                <p>
                  Our commitment to academic excellence, coupled with character development and 
                  extracurricular engagement, has made us a trusted choice for parents seeking 
                  holistic education for their children.
                </p>
                <p>
                  Today, Cradle Bridge Schools stands as a beacon of educational excellence in 
                  Delta State, with hundreds of alumni making positive impacts in various fields 
                  across Nigeria and beyond.
                </p>
              </div>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-navy rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://via.placeholder.com/600x800/001F3F/FFFFFF?text=School+Building"
                  alt="Cradle Bridge Schools"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center">
                <div className="text-5xl font-bold text-navy-900 mb-2">15+</div>
                <div className="text-gray-600 text-center font-medium">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeInUp} className="card">
              <div className="w-16 h-16 bg-gradient-navy rounded-xl flex items-center justify-center mb-6">
                <FaBullseye className="text-white" size={32} />
              </div>
              <h3 className="heading-tertiary mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide quality, holistic education that nurtures academic excellence, 
                strong character, and leadership skills, preparing students to become responsible 
                citizens and future leaders who will make positive contributions to society.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="card">
              <div className="w-16 h-16 bg-gradient-navy rounded-xl flex items-center justify-center mb-6">
                <FaEye className="text-white" size={32} />
              </div>
              <h3 className="heading-tertiary mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the leading educational institution in Delta State and Nigeria, 
                recognized for academic excellence, character development, and producing 
                well-rounded graduates who excel in their chosen fields and contribute 
                meaningfully to national and global development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do at Cradle Bridge Schools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={FaAward}
              title="Excellence"
              description="We strive for excellence in academics, character, and all endeavors, encouraging students to always give their best."
            />
            <ValueCard
              icon={FaHeart}
              title="Integrity"
              description="We uphold the highest standards of honesty, transparency, and ethical behavior in all our interactions."
            />
            <ValueCard
              icon={FaUsers}
              title="Respect"
              description="We foster a culture of mutual respect, celebrating diversity and treating everyone with dignity."
            />
            <ValueCard
              icon={FaGlobe}
              title="Innovation"
              description="We embrace creative thinking and modern teaching methods to prepare students for a dynamic world."
            />
            <ValueCard
              icon={FaBullseye}
              title="Discipline"
              description="We instill self-discipline and responsibility, helping students develop strong work ethics."
            />
            <ValueCard
              icon={FaHeart}
              title="Care"
              description="We provide a nurturing environment where every student feels valued, supported, and encouraged."
            />
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="section-padding bg-pattern bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-4">Leadership Philosophy</h2>
              <p className="text-lg text-gray-600">
                Building Tomorrow's Leaders Today
              </p>
            </div>

            <div className="card space-y-6 text-gray-700 leading-relaxed">
              <p>
                At Cradle Bridge Schools, we believe that every child is a potential leader. 
                Our leadership philosophy is centered on developing the whole child – intellectually, 
                morally, socially, and physically.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Character First</h4>
                    <p className="text-gray-600">We prioritize character development alongside academic achievement.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Critical Thinking</h4>
                    <p className="text-gray-600">We encourage students to think independently and solve problems creatively.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Collaboration</h4>
                    <p className="text-gray-600">We teach the value of teamwork and cooperation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Global Citizenship</h4>
                    <p className="text-gray-600">We prepare students to thrive in an interconnected world.</p>
                  </div>
                </div>
              </div>

              <p>
                Through our comprehensive approach to education, we empower students to discover 
                their passions, develop their talents, and become confident leaders who will make 
                positive contributions to their communities and the world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-navy text-white">
        <div className="container-custom text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-heading font-bold mb-6">
              Join the Cradle Bridge Family
            </h2>
            <p className="text-xl mb-8 text-navy-100 max-w-2xl mx-auto">
              Experience education that transforms lives and builds futures.
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

// Value Card Component
const ValueCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="card text-center"
    >
      <div className="w-16 h-16 bg-gradient-navy rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="text-white" size={28} />
      </div>
      <h3 className="text-xl font-heading font-semibold text-navy-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default About;
