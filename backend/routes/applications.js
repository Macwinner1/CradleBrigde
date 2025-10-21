const express = require('express');
const router = express.Router();
const validator = require('validator');
const { authenticateUser } = require('../middleware/auth');

// In-memory storage (replace with database in production)
let applications = [];

// Validation middleware
const validateApplication = (req, res, next) => {
  const { fullName, email, phone, gradeApplyingFor, message } = req.body;
  
  const errors = [];
  
  if (!fullName || fullName.trim().length < 3) {
    errors.push('Full name must be at least 3 characters');
  }
  
  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }
  
  if (!phone || !validator.isMobilePhone(phone, 'any')) {
    errors.push('Valid phone number is required');
  }
  
  if (!gradeApplyingFor) {
    errors.push('Grade applying for is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  
  next();
};

// Submit application
router.post('/submit', validateApplication, async (req, res) => {
  try {
    const { fullName, email, phone, gradeApplyingFor, message, parentName } = req.body;
    
    const application = {
      id: Date.now().toString(),
      fullName: validator.escape(fullName.trim()),
      email: validator.normalizeEmail(email),
      phone: phone.trim(),
      gradeApplyingFor,
      message: message ? validator.escape(message.trim()) : '',
      parentName: parentName ? validator.escape(parentName.trim()) : '',
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    applications.push(application);
    
    // Return success (EmailJS will handle emails on frontend)
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: application.id,
        submittedAt: application.submittedAt
      }
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application'
    });
  }
});

// Get all applications (Admin only - protected route)
router.get('/', authenticateUser, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications.sort((a, b) => 
        new Date(b.submittedAt) - new Date(a.submittedAt)
      )
    });
  } catch (error) {
    console.error('Fetch applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications'
    });
  }
});

// Get single application by ID
router.get('/:id', authenticateUser, (req, res) => {
  try {
    const application = applications.find(app => app.id === req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Fetch application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application'
    });
  }
});

// Update application status
router.patch('/:id/status', authenticateUser, (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const applicationIndex = applications.findIndex(app => app.id === req.params.id);
    
    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    applications[applicationIndex].status = status;
    applications[applicationIndex].updatedAt = new Date().toISOString();
    
    res.status(200).json({
      success: true,
      message: 'Application status updated',
      data: applications[applicationIndex]
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update application'
    });
  }
});

// Delete application
router.delete('/:id', authenticateUser, (req, res) => {
  try {
    const applicationIndex = applications.findIndex(app => app.id === req.params.id);
    
    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    applications.splice(applicationIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application'
    });
  }
});

module.exports = router;
