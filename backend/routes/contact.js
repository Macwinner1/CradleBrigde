const express = require('express');
const router = express.Router();
const validator = require('validator');

// In-memory storage (replace with database in production)
let inquiries = [];

// Validation middleware
const validateContact = (req, res, next) => {
  const { name, email, phone, subject, message } = req.body;
  
  const errors = [];
  
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }
  
  if (phone && !validator.isMobilePhone(phone, 'any')) {
    errors.push('Valid phone number format required');
  }
  
  if (!subject || subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters');
  }
  
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  
  next();
};

// Submit contact inquiry
router.post('/submit', validateContact, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const inquiry = {
      id: Date.now().toString(),
      name: validator.escape(name.trim()),
      email: validator.normalizeEmail(email),
      phone: phone ? phone.trim() : '',
      subject: validator.escape(subject.trim()),
      message: validator.escape(message.trim()),
      status: 'new',
      submittedAt: new Date().toISOString()
    };
    
    inquiries.push(inquiry);
    
    // Return success (EmailJS will handle emails on frontend)
    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will get back to you soon!',
      data: {
        id: inquiry.id,
        submittedAt: inquiry.submittedAt
      }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry'
    });
  }
});

// Get all inquiries (Admin only)
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries.sort((a, b) => 
        new Date(b.submittedAt) - new Date(a.submittedAt)
      )
    });
  } catch (error) {
    console.error('Fetch inquiries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries'
    });
  }
});

// Get single inquiry by ID
router.get('/:id', (req, res) => {
  try {
    const inquiry = inquiries.find(inq => inq.id === req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    console.error('Fetch inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiry'
    });
  }
});

// Update inquiry status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'read', 'responded', 'archived'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const inquiryIndex = inquiries.findIndex(inq => inq.id === req.params.id);
    
    if (inquiryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    inquiries[inquiryIndex].status = status;
    inquiries[inquiryIndex].updatedAt = new Date().toISOString();
    
    res.status(200).json({
      success: true,
      message: 'Inquiry status updated',
      data: inquiries[inquiryIndex]
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update inquiry'
    });
  }
});

// Delete inquiry
router.delete('/:id', (req, res) => {
  try {
    const inquiryIndex = inquiries.findIndex(inq => inq.id === req.params.id);
    
    if (inquiryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }
    
    inquiries.splice(inquiryIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry'
    });
  }
});

module.exports = router;
