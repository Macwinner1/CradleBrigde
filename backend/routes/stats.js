const express = require('express');
const router = express.Router();

// Get school statistics
router.get('/', (req, res) => {
  try {
    const stats = {
      totalStudents: 450,
      yearsOfExcellence: 15,
      qualifiedTeachers: 35,
      successRate: 98,
      extracurriculars: 12,
      awards: 25
    };
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Fetch stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;
