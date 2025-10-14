const express = require('express');
const router = express.Router();
const validator = require('validator');

// In-memory storage (replace with database in production)
let blogPosts = [
  {
    id: '1',
    title: 'Welcome to Cradle Bridge Schools',
    slug: 'welcome-to-cradle-bridge-schools',
    excerpt: 'We are excited to launch our new website and share our journey of academic excellence.',
    content: 'Welcome to Cradle Bridge Schools, where we nurture young minds and build future leaders...',
    category: 'Announcements',
    author: 'Admin',
    image: '/images/blog/welcome.jpg',
    publishedAt: new Date('2025-01-15').toISOString(),
    createdAt: new Date('2025-01-15').toISOString(),
    status: 'published'
  },
  {
    id: '2',
    title: 'Inter-House Sports Competition 2025',
    slug: 'inter-house-sports-competition-2025',
    excerpt: 'Our annual inter-house sports competition showcased amazing talents and teamwork.',
    content: 'The 2025 Inter-House Sports Competition was a huge success...',
    category: 'Events',
    author: 'Sports Coordinator',
    image: '/images/blog/sports.jpg',
    publishedAt: new Date('2025-02-10').toISOString(),
    createdAt: new Date('2025-02-10').toISOString(),
    status: 'published'
  }
];

// Get all published blog posts
router.get('/', (req, res) => {
  try {
    const { category, limit } = req.query;
    
    let posts = blogPosts.filter(post => post.status === 'published');
    
    if (category) {
      posts = posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    if (limit) {
      posts = posts.slice(0, parseInt(limit));
    }
    
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Fetch blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
});

// Get single blog post by slug
router.get('/:slug', (req, res) => {
  try {
    const post = blogPosts.find(post => post.slug === req.params.slug);
    
    if (!post || post.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Fetch blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

// Get all blog posts (Admin - including drafts)
router.get('/admin/all', (req, res) => {
  try {
    const posts = blogPosts.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Fetch all blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
});

// Create new blog post (Admin only)
router.post('/', (req, res) => {
  try {
    const { title, content, excerpt, category, author, image, status } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }
    
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    const newPost = {
      id: Date.now().toString(),
      title: validator.escape(title.trim()),
      slug,
      excerpt: excerpt ? validator.escape(excerpt.trim()) : '',
      content: content.trim(),
      category: category || 'Announcements',
      author: author || 'Admin',
      image: image || '/images/blog/default.jpg',
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    blogPosts.push(newPost);
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: newPost
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post'
    });
  }
});

// Update blog post (Admin only)
router.put('/:id', (req, res) => {
  try {
    const postIndex = blogPosts.findIndex(post => post.id === req.params.id);
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    const { title, content, excerpt, category, author, image, status } = req.body;
    
    const updatedPost = {
      ...blogPosts[postIndex],
      title: title ? validator.escape(title.trim()) : blogPosts[postIndex].title,
      content: content ? content.trim() : blogPosts[postIndex].content,
      excerpt: excerpt ? validator.escape(excerpt.trim()) : blogPosts[postIndex].excerpt,
      category: category || blogPosts[postIndex].category,
      author: author || blogPosts[postIndex].author,
      image: image || blogPosts[postIndex].image,
      status: status || blogPosts[postIndex].status,
      publishedAt: status === 'published' && !blogPosts[postIndex].publishedAt 
        ? new Date().toISOString() 
        : blogPosts[postIndex].publishedAt,
      updatedAt: new Date().toISOString()
    };
    
    blogPosts[postIndex] = updatedPost;
    
    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post'
    });
  }
});

// Delete blog post (Admin only)
router.delete('/:id', (req, res) => {
  try {
    const postIndex = blogPosts.findIndex(post => post.id === req.params.id);
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    blogPosts.splice(postIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post'
    });
  }
});

// Get blog categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = [...new Set(blogPosts.map(post => post.category))];
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Fetch categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

module.exports = router;
