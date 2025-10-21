import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth, storage } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  FaUsers, 
  FaEnvelope, 
  FaBlog, 
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaImage,
  FaTimes
} from 'react-icons/fa';
import { applicationsAPI, contactAPI, blogAPI } from '../../services/api';
import { sendAdmissionStatusEmail } from '../../services/emailService';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if Firebase is configured
    if (!auth) {
      toast.error('Admin authentication not configured');
      navigate('/');
      return;
    }

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
    if (!auth) {
      navigate('/');
      return;
    }
    
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const updateApplicationStatus = async (id, status, applicantData) => {
    try {
      await applicationsAPI.updateStatus(id, status);
      
      // Send email notification to applicant
      if (status === 'accepted' || status === 'rejected' || status === 'reviewed') {
        const emailResult = await sendAdmissionStatusEmail(applicantData, status);
        if (emailResult.success && !emailResult.skipped) {
          toast.success(`Status updated and email sent to ${applicantData.email}`);
        } else if (emailResult.skipped) {
          toast.success('Status updated successfully');
        } else {
          toast.warning('Status updated but email notification failed');
        }
      } else {
        toast.success('Status updated successfully');
      }
      
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
        {activeTab === 'blog' && <BlogTab posts={blogPosts} onRefresh={fetchData} />}
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
                      onChange={(e) => onUpdateStatus(app.id, e.target.value, app)}
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

// Blog Tab Component with Create/Edit Functionality
const BlogTab = ({ posts, onRefresh }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Events',
    author: 'Admin',
    status: 'published'
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const categories = ['Events', 'Announcements', 'News', 'Academics', 'Sports', 'General'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    // If no new image file, keep existing image or use default
    if (!imageFile) {
      console.log('No new image file, using existing:', editingPost?.image);
      return editingPost?.image || '/images/blog/default.jpg';
    }

    // Check if storage is available
    if (!storage) {
      console.error('❌ Firebase Storage not configured!');
      console.error('Storage object:', storage);
      console.error('Please ensure Firebase Storage rules are set up correctly.');
      toast.error('Firebase Storage not available. Please check configuration.');
      return '/images/blog/default.jpg';
    }

    try {
      const timestamp = Date.now();
      const sanitizedFileName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `blog/${timestamp}_${sanitizedFileName}`;
      const storageRef = ref(storage, fileName);
      
      console.log('📤 Starting image upload...');
      console.log('   File name:', imageFile.name);
      console.log('   File size:', (imageFile.size / 1024).toFixed(2), 'KB');
      console.log('   Storage path:', fileName);
      
      await uploadBytes(storageRef, imageFile);
      console.log('✅ Upload complete, getting download URL...');
      
      const downloadURL = await getDownloadURL(storageRef);
      console.log('🎉 Image uploaded successfully!');
      console.log('   Download URL:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('❌ Error uploading image:', error);
      console.error('   Error code:', error.code);
      console.error('   Error message:', error.message);
      
      if (error.code === 'storage/unauthorized') {
        toast.error('Permission denied. Please configure Firebase Storage rules.');
      } else {
        toast.error('Failed to upload image: ' + error.message);
      }
      
      return editingPost?.image || '/images/blog/default.jpg';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    setUploading(true);

    try {
      let imageUrl = editingPost?.image || '/images/blog/default.jpg';
      
      console.log('📝 Starting blog post save...');
      console.log('   Editing:', !!editingPost);
      console.log('   Has new image:', !!imageFile);
      console.log('   Current image URL:', imageUrl);
      
      // Start creating/updating post immediately (don't wait for image)
      const postData = {
        ...formData,
        image: imageUrl // Use existing or default initially
      };

      console.log('📦 Post data:', postData);

      let savedPost;
      
      if (editingPost) {
        console.log('✏️ Updating post:', editingPost.id);
        const response = await blogAPI.update(editingPost.id, postData);
        console.log('✅ Update response:', response.data);
        savedPost = response.data.data;
      } else {
        console.log('➕ Creating new post');
        const response = await blogAPI.create(postData);
        console.log('✅ Create response:', response.data);
        savedPost = response.data.data;
      }

      // If there's a new image, upload it and update the post
      if (imageFile) {
        console.log('🖼️ Uploading image in background...');
        toast.info('Post saved! Uploading image...', { autoClose: 2000 });
        
        try {
          imageUrl = await uploadImage();
          
          // Update the post with the new image URL
          if (imageUrl && imageUrl !== '/images/blog/default.jpg') {
            console.log('🔄 Updating post with new image URL:', imageUrl);
            const updateResponse = await blogAPI.update(savedPost.id, { ...postData, image: imageUrl });
            console.log('✅ Post updated with image:', updateResponse.data);
            
            // Update local state to reflect the new image immediately
            savedPost = updateResponse.data.data;
            
            toast.success(editingPost ? 'Post updated with image! 🎉' : 'Post created with image! 🎉');
          } else {
            console.warn('⚠️ Image upload returned default URL');
            toast.warning('Post saved but image upload failed');
          }
        } catch (imgError) {
          console.error('❌ Image upload error:', imgError);
          toast.warning('Post saved but image upload failed');
        }
      } else {
        console.log('✅ Post saved without new image');
        toast.success(editingPost ? 'Blog post updated successfully!' : 'Blog post created successfully!');
      }

      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Events',
        author: 'Admin',
        status: 'published'
      });
      setImageFile(null);
      setImagePreview('');
      setEditingPost(null);
      setShowEditor(false);
      
      // Refresh the posts list to show the new/updated post
      console.log('🔄 Refreshing posts list...');
      await onRefresh();
      console.log('✅ Posts list refreshed');
      
      // Scroll to top to see the new post
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('❌ Error saving blog post:', error);
      console.error('   Error details:', error.response?.data);
      toast.error('Failed to save blog post: ' + (error.response?.data?.message || error.message));
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (post) => {
    console.log('Editing post:', post);
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'Events',
      author: post.author || 'Admin',
      status: post.status || 'published'
    });
    setImagePreview(post.image || '');
    setImageFile(null); // Clear any previous file selection
    setShowEditor(true);
    
    // Scroll to top to show the editor
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogAPI.delete(id);
        toast.success('Blog post deleted successfully');
        onRefresh();
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast.error('Failed to delete blog post');
      }
    }
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'Events',
      author: 'Admin',
      status: 'published'
    });
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy-900">Blog Posts & Events</h2>
        {!showEditor && (
          <button
            onClick={() => setShowEditor(true)}
            className="btn-primary flex items-center"
          >
            <FaPlus className="mr-2" />
            Create New Post
          </button>
        )}
      </div>

      {showEditor && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-navy-900">
              {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                placeholder="Enter blog post title"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Short Description)
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="input-field"
                rows="2"
                placeholder="Brief summary of the post (optional)"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="input-field"
                rows="8"
                placeholder="Write your blog post content here..."
                required
              />
            </div>

            {/* Category and Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="input-field"
                  placeholder="Author name"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image {imageFile && <span className="text-green-600">(New image selected)</span>}
              </label>
              <div className="space-y-3">
                {/* Image URL Input - Alternative to file upload */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Option 1: Paste Image URL (Works immediately, no Firebase needed)
                  </label>
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      if (e.target.value) {
                        setImagePreview(e.target.value);
                      }
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="input-field text-sm"
                    disabled={uploading}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Option 2: Upload from Computer {!storage && '(Requires Firebase Storage setup)'}
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 bg-gradient-to-r from-navy-600 to-navy-800 text-white rounded-lg cursor-pointer hover:from-navy-700 hover:to-navy-900 transition-all shadow-md hover:shadow-lg">
                      <FaImage className="mr-2" />
                      <span className="text-sm font-medium">
                        {imageFile ? 'Change Image' : editingPost ? 'Update Image' : 'Choose Image'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    {imageFile && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600 font-medium">{imageFile.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(editingPost?.image || formData.image || '');
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-48 w-auto rounded-lg object-cover shadow-lg border-2 border-gray-200"
                      onError={(e) => {
                        console.warn('⚠️ Preview image failed to load:', imagePreview);
                        e.target.src = 'https://via.placeholder.com/400x300/001F3F/FFFFFF?text=Invalid+Image+URL';
                      }}
                    />
                    {imageFile && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        New Image
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  {storage ? 
                    '💡 Paste image URL for instant preview, or upload file to Firebase Storage.' : 
                    '⚠️ Firebase Storage not configured. Please paste an image URL or check FIREBASE_STORAGE_SETUP.md'
                  }
                </p>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="input-field"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Submit Buttons */}
            <div className="space-y-4">
              {uploading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="spinner"></div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        {imageFile ? 'Saving post and uploading image...' : 'Saving post...'}
                      </p>
                      <p className="text-xs text-blue-700">
                        {imageFile ? 'Post will be saved immediately, image uploads in background' : 'This will only take a moment'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploading}
                >
                  {uploading ? (
                    <span className="flex items-center">
                      <div className="spinner mr-2"></div>
                      {editingPost ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      {editingPost ? (
                        <><FaEdit className="mr-2" /> Update Post</>
                      ) : (
                        <><FaPlus className="mr-2" /> Create Post</>
                      )}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="card text-center py-12">
            <FaBlog className="mx-auto text-6xl text-gray-300 mb-4" />
            <p className="text-gray-500">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                {post.image && (
                  <div className="md:w-48 h-48 flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = '/images/blog/default.jpg';
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">{post.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <span className="px-2 py-1 bg-navy-100 text-navy-900 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
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

                  <p className="text-gray-600 mb-4">{post.excerpt}</p>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit className="mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
