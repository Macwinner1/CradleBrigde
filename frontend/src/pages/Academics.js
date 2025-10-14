import React from 'react';
import { motion } from 'framer-motion';
import { FaBaby, FaChild, FaSchool, FaUniversity, FaBook, FaFlask, FaCalculator, FaGlobe } from 'react-icons/fa';

const Academics = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const programs = [
    {
      icon: FaBaby,
      title: 'Nursery',
      age: 'Ages 2-5',
      description: 'Early childhood education focusing on foundational skills, play-based learning, and social development.',
      subjects: ['Pre-literacy', 'Pre-numeracy', 'Creative Arts', 'Physical Development', 'Social Skills'],
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: FaChild,
      title: 'Primary',
      age: 'Ages 6-11',
      description: 'Building strong academic foundations with the Nigerian primary curriculum and character education.',
      subjects: ['English Language', 'Mathematics', 'Basic Science', 'Social Studies', 'Creative Arts', 'Physical Education'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaSchool,
      title: 'Junior Secondary',
      age: 'Ages 12-14',
      description: 'Comprehensive junior secondary education preparing students for senior secondary and beyond.',
      subjects: ['Mathematics', 'English Language', 'Basic Science', 'Basic Technology', 'Social Studies', 'Computer Studies'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaUniversity,
      title: 'Senior Secondary',
      age: 'Ages 15-17',
      description: 'Specialized senior secondary education with science, arts, and commercial streams.',
      subjects: ['Core: English, Mathematics, Civic Education', 'Science: Physics, Chemistry, Biology', 'Arts: Literature, Government, Economics', 'Commercial: Accounting, Commerce, Economics'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const subjects = [
    { icon: FaBook, name: 'Languages', description: 'English, Literature, and Communication Skills' },
    { icon: FaCalculator, name: 'Mathematics', description: 'Pure & Applied Mathematics' },
    { icon: FaFlask, name: 'Sciences', description: 'Biology, Chemistry, Physics' },
    { icon: FaGlobe, name: 'Social Sciences', description: 'Government, Economics, Geography' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom px-4 relative z-10">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="heading-primary text-white mb-6">Academic Programs</h1>
            <p className="text-xl text-navy-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive Nigerian Curriculum from Nursery to Senior Secondary
            </p>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Our Curriculum</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow the Nigerian National Curriculum, enriched with modern teaching 
              methodologies and technology integration to prepare students for success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${program.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-xl flex items-center justify-center mr-4`}>
                      <program.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-navy-900">{program.title}</h3>
                      <p className="text-gray-600">{program.age}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{program.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-navy-900 mb-2">Key Subjects:</h4>
                    <ul className="space-y-1">
                      {program.subjects.map((subject) => (
                        <li key={subject} className="text-gray-600 flex items-start">
                          <span className="text-navy-500 mr-2">•</span>
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject Areas */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="heading-secondary mb-4">Subject Areas</h2>
            <p className="text-lg text-gray-600">
              Comprehensive education across multiple disciplines
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-gradient-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <subject.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-navy-900 mb-2">{subject.name}</h3>
                <p className="text-gray-600">{subject.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Approach */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="heading-secondary mb-6">Our Teaching Approach</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Student-Centered Learning</h4>
                    <p className="text-gray-600">Interactive lessons that engage students and encourage active participation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Technology Integration</h4>
                    <p className="text-gray-600">Modern teaching tools and digital resources to enhance learning.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Hands-On Experience</h4>
                    <p className="text-gray-600">Practical lessons in well-equipped laboratories and workshops.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-900 mb-2">Continuous Assessment</h4>
                    <p className="text-gray-600">Regular evaluations to track progress and provide personalized support.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gradient-navy rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://via.placeholder.com/600x800/001F3F/FFFFFF?text=Classroom"
                  alt="Teaching Approach"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section className="section-padding bg-pattern bg-gray-50">
        <div className="container-custom">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto card">
            <h2 className="heading-secondary text-center mb-8">Commitment to Excellence</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Cradle Bridge Schools, we are committed to academic excellence. Our experienced 
                teachers use proven pedagogical methods combined with innovative approaches to ensure 
                every student reaches their full potential.
              </p>
              <p>
                We maintain small class sizes to provide personalized attention, offer remedial 
                classes for struggling students, and provide extension programs for high achievers. 
                Our comprehensive assessment system ensures continuous monitoring of student progress.
              </p>
              <p>
                Our graduates consistently excel in WAEC, NECO, and JAMB examinations, gaining 
                admission to top universities in Nigeria and abroad. We prepare students not just 
                for exams, but for life-long learning and success.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-navy-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-navy-900 mb-2">98%</div>
                <div className="text-gray-600">Pass Rate</div>
              </div>
              <div className="bg-navy-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-navy-900 mb-2">1:20</div>
                <div className="text-gray-600">Teacher-Student Ratio</div>
              </div>
              <div className="bg-navy-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-navy-900 mb-2">100+</div>
                <div className="text-gray-600">University Placements</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-navy text-white">
        <div className="container-custom text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-heading font-bold mb-6">
              Ready to Excel Academically?
            </h2>
            <p className="text-xl mb-8 text-navy-100 max-w-2xl mx-auto">
              Join us and experience education that prepares you for success.
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

export default Academics;
