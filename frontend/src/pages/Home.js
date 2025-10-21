import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaTrophy, FaChalkboardTeacher, FaBookOpen, FaAward } from 'react-icons/fa';
import { statsAPI, blogAPI } from '../services/api';

const Home = () => {
  const [stats, setStats] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, blogResponse] = await Promise.all([
          statsAPI.get(),
          blogAPI.getAll({ limit: 3 })
        ]);
        
        if (statsResponse.data.success) {
          setStats(statsResponse.data.data);
        }
        
        if (blogResponse.data.success) {
          setRecentPosts(blogResponse.data.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh blog posts every 30 seconds to show new posts from admin
    const interval = setInterval(() => {
      console.log('Auto-refreshing blog posts...');
      blogAPI.getAll({ limit: 3 })
        .then(response => {
          if (response.data.success) {
            setRecentPosts(response.data.data);
          }
        })
        .catch(error => console.error('Error refreshing blog posts:', error));
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-navy text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container-custom px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="text-center md:text-left">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Nurturing Future <span className="text-navy-300">Leaders</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-navy-100 leading-relaxed"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Excellence in Education | Character Development | Academic Achievement
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  to="/admissions"
                  className="px-8 py-4 bg-white text-navy-900 font-bold rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  Apply Now
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-navy-900 transition-all duration-300 text-center"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="relative">
                <div className="w-full h-96 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <FaGraduationCap className="text-white/30" size={200} />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-navy-400 rounded-2xl animate-bounce-slow flex items-center justify-center">
                  <FaTrophy className="text-white" size={50} />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-2xl animate-bounce-slow flex items-center justify-center" style={{ animationDelay: '1s' }}>
                  <FaBookOpen className="text-navy-900" size={50} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full p-1">
            <div className="w-1 h-3 bg-white rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="spinner"></div>
              </div>
            ) : stats && (
              <>
                <StatsCard icon={FaUsers} number={stats.totalStudents} label="Students" color="navy" />
                <StatsCard icon={FaChalkboardTeacher} number={stats.qualifiedTeachers} label="Teachers" color="navy" />
                <StatsCard icon={FaTrophy} number={stats.yearsOfExcellence} label="Years" color="navy" />
                <StatsCard icon={FaAward} number={stats.awards} label="Awards" color="navy" />
                <StatsCard icon={FaGraduationCap} number={stats.successRate} label="Success Rate" suffix="%" color="navy" />
                <StatsCard icon={FaBookOpen} number={stats.extracurriculars} label="Programs" color="navy" />
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-pattern bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Why Choose Cradle Bridge?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide a holistic education that prepares students for success in academics, character, and life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎓"
              title="Academic Excellence"
              description="Comprehensive Nigerian curriculum from Nursery to Senior Secondary with focus on STEM and critical thinking."
            />
            <FeatureCard
              icon="🌟"
              title="Character Development"
              description="Building strong moral values, leadership skills, and social responsibility in every student."
            />
            <FeatureCard
              icon="🏆"
              title="Extracurricular Activities"
              description="Sports, music, drama, debate, and more to develop well-rounded individuals."
            />
            <FeatureCard
              icon="👨‍🏫"
              title="Qualified Teachers"
              description="Experienced and dedicated educators committed to student success and personal growth."
            />
            <FeatureCard
              icon="💻"
              title="Modern Facilities"
              description="State-of-the-art classrooms, laboratories, library, and ICT center for enhanced learning."
            />
            <FeatureCard
              icon="🤝"
              title="Supportive Community"
              description="A caring environment where every student is valued and encouraged to reach their potential."
            />
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-secondary mb-4">Latest News & Events</h2>
            <p className="text-lg text-gray-600">
              Stay updated with the latest happenings at Cradle Bridge Schools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/blog" className="btn-primary">
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-navy text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl mb-8 text-navy-100 max-w-2xl mx-auto">
              Begin your child's journey to excellence at Cradle Bridge Schools.
            </p>
            <Link
              to="/admissions"
              className="inline-block px-10 py-4 bg-white text-navy-900 font-bold rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Application
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, number, label, suffix = '', color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="card text-center"
    >
      <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-${color} rounded-full flex items-center justify-center`}>
        <Icon className="text-white" size={28} />
      </div>
      <h3 className="text-3xl font-bold text-navy-900 mb-2">
        {number}{suffix}
      </h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="card text-center"
    >
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="heading-tertiary text-xl mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Blog Card Component
const BlogCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <div className="card h-full">
        <div className="w-full h-48 bg-gradient-navy rounded-lg mb-4 overflow-hidden">
          {post.image && post.image !== '/images/blog/default.jpg' ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                console.warn('Blog card image failed to load:', post.image);
                e.target.src = 'https://via.placeholder.com/400x300/001F3F/FFFFFF?text=Cradle+Bridge';
              }}
              onLoad={() => {
                console.log('Blog card image loaded:', post.image);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-600 to-navy-900">
              <span className="text-white text-sm font-semibold">Cradle Bridge</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="px-3 py-1 bg-navy-100 text-navy-900 rounded-full font-medium">
            {post.category}
          </span>
          <span className="text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-xl font-heading font-semibold text-navy-900 mb-2 group-hover:text-navy-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
};

export default Home;
