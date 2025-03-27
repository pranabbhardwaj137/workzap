
const express = require('express');
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const router = express.Router();

// Get jobs near a specific location
router.get('/nearby-jobs', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query; // radius in km
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    // Convert to numbers
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const radiusInKm = parseFloat(radius);
    
    // Find jobs within the radius using MongoDB's geospatial queries
    // This is a simplified version - in a real app, you would use $geoNear or $geoWithin
    const jobs = await Job.find({
      'coordinates.lat': { $gte: latitude - 0.1, $lte: latitude + 0.1 },
      'coordinates.lng': { $gte: longitude - 0.1, $lte: longitude + 0.1 },
      status: 'open',
    })
    .populate('recruiter', 'firstName lastName email rating')
    .sort({ datePosted: -1 });
    
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching nearby jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update your location (for workers)
router.put('/update-location', auth, async (req, res) => {
  try {
    const { lat, lng, address } = req.body;
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.currentLocation = {
      coordinates: { lat, lng },
      address: address || user.location,
    };
    
    await user.save();
    
    res.json({ 
      message: 'Location updated successfully',
      location: user.currentLocation
    });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
