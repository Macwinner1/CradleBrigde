import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogAPI } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      const params = filter !== 'all' ? { category: filter } : {};
      const response = await blogAPI.getAll(params);
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Events', 'Announcements', 'Achievements'];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-navy text-white">
        <div className="container-custom px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-primary text-white mb-6">News & Events</h1>
            <p className="text-xl text-navy-100 max-w-3xl mx-auto">
              Stay updated with the latest from Cradle Bridge Schools
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Posts */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-navy text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="spinner"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No posts found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const BlogCard = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block group h-full">
      <div className="card h-full flex flex-col">
        <div className="w-full h-56 bg-gradient-navy rounded-lg mb-4 overflow-hidden">
          <img
            src={post.image || '/images/blog/default.jpg'}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300/001F3F/FFFFFF?text=Cradle+Bridge';
            }}
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-navy-100 text-navy-900 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <h3 className="text-xl font-heading font-semibold text-navy-900 mb-2 group-hover:text-navy-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="text-navy-900 font-medium group-hover:text-navy-600 transition-colors">
            Read More →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
