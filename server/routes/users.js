
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile (protected route)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile (protected route)
router.put('/profile', auth, async (req, res) => {
  try {
    // Fields that can be updated
    const { firstName, lastName, location, skills, experience } = req.body;
    
    // Build update object
    const userFields = {};
    if (firstName) userFields.firstName = firstName;
    if (lastName) userFields.lastName = lastName;
    if (location) userFields.location = location;
    if (skills) userFields.skills = skills;
    if (experience) userFields.experience = experience;
    
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: userFields },
      { new: true }
    ).select('-password');
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle 'available now' status (protected route)
router.put('/available', auth, async (req, res) => {
  try {
    // Only workers can set availability
    if (req.user.userType !== 'worker') {
      return res.status(403).json({ message: 'Only workers can set availability' });
    }
    
    const user = await User.findById(req.user.userId);
    
    // Toggle availableNow status
    user.availableNow = !user.availableNow;
    await user.save();
    
    res.json({ availableNow: user.availableNow });
  } catch (error) {
    console.error('Error toggling availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get available workers
router.get('/available', async (req, res) => {
  try {
    const availableWorkers = await User.find({
      userType: 'worker',
      availableNow: true
    }).select('-password');
    
    res.json(availableWorkers);
  } catch (error) {
    console.error('Error fetching available workers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review for a user (protected route)
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user has already reviewed this person
    const alreadyReviewed = user.reviews.find(
      review => review.reviewer.toString() === req.user.userId
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this user' });
    }
    
    // Add review
    user.reviews.push({
      reviewer: req.user.userId,
      rating,
      comment
    });
    
    // Update overall rating
    const totalRating = user.reviews.reduce((sum, review) => sum + review.rating, 0);
    user.rating = totalRating / user.reviews.length;
    
    await user.save();
    
    res.json(user);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
