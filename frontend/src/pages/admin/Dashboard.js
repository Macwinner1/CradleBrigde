import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { 
  FaUsers, 
  FaEnvelope, 
  FaBlog, 
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle 
} from 'react-icons/fa';
import { applicationsAPI, contactAPI, blogAPI } from '../../services/api';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/login');
      } else {
        fetchData();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [appsRes, contactsRes, blogsRes] = await Promise.all([
        applicationsAPI.getAll(),
        contactAPI.getAll(),
        blogAPI.getAllAdmin()
      ]);

      if (appsRes.data.success) setApplications(appsRes.data.data);
      if (contactsRes.data.success) setContacts(contactsRes.data.data);
      if (blogsRes.data.success) setBlogPosts(blogsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await applicationsAPI.updateStatus(id, status);
      toast.success('Status updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationsAPI.delete(id);
        toast.success('Application deleted successfully');
        fetchData();
      } catch (error) {
        console.error('Error deleting application:', error);
        toast.error('Failed to delete application');
      }
    }
  };

  const tabs = [
    { id: 'applications', label: 'Applications', icon: FaUsers, count: applications.length },
    { id: 'contacts', label: 'Inquiries', icon: FaEnvelope, count: contacts.length },
    { id: 'blog', label: 'Blog Posts', icon: FaBlog, count: blogPosts.length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-navy text-white shadow-lg">
        <div className="container-custom px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
              <p className="text-navy-200 mt-1">Cradle Bridge Schools</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-navy-900 text-navy-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="mr-2" />
                {tab.label}
                <span className="ml-2 px-2 py-1 bg-navy-100 text-navy-900 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom px-4 py-8">
        {activeTab === 'applications' && (
          <ApplicationsTab 
            applications={applications} 
            onUpdateStatus={updateApplicationStatus}
            onDelete={deleteApplication}
          />
        )}
        {activeTab === 'contacts' && <ContactsTab contacts={contacts} />}
        {activeTab === 'blog' && <BlogTab posts={blogPosts} />}
      </div>
    </div>
  );
};

// Applications Tab Component
const ApplicationsTab = ({ applications, onUpdateStatus, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-6">Applications</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{app.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{app.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{app.gradeApplyingFor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value)}
                      className="text-sm border-gray-300 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onDelete(app.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Contacts Tab Component
const ContactsTab = ({ contacts }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-6">Contact Inquiries</h2>
      <div className="grid gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-navy-900">{contact.name}</h3>
                <p className="text-sm text-gray-600">{contact.email}</p>
                {contact.phone && <p className="text-sm text-gray-600">{contact.phone}</p>}
              </div>
              <span className="text-xs text-gray-500">
                {new Date(contact.submittedAt).toLocaleDateString()}
              </span>
            </div>
            <h4 className="font-semibold text-navy-900 mb-2">Subject: {contact.subject}</h4>
            <p className="text-gray-700">{contact.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Blog Tab Component
const BlogTab = ({ posts }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-navy-900 mb-6">Blog Posts</h2>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                post.status === 'published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {post.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
