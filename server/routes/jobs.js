
const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all jobs with filters
router.get('/', async (req, res) => {
  try {
    const { category, location, minWage, maxWage, isUrgent, isVolunteer } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (category) filter.category = category;
    if (location) filter.location = location;
    if (isUrgent) filter.isUrgent = isUrgent === 'true';
    if (isVolunteer) filter.isVolunteer = isVolunteer === 'true';
    
    // Wage range filter
    if (minWage || maxWage) {
      filter.wage = {};
      if (minWage) filter.wage.$gte = Number(minWage);
      if (maxWage) filter.wage.$lte = Number(maxWage);
    }
    
    const jobs = await Job.find(filter)
      .populate('recruiter', 'firstName lastName email rating')
      .sort({ datePosted: -1 });
    
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get jobs posted by the authenticated user (recruiter)
router.get('/user-jobs', auth, async (req, res) => {
  try {
    // Check if user is a recruiter
    if (req.user.userType !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can access this endpoint' });
    }
    
    const jobs = await Job.find({ recruiter: req.user.userId })
      .populate('recruiter', 'firstName lastName email rating')
      .sort({ datePosted: -1 });
    
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching user jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get jobs that the authenticated user (worker) has applied to
router.get('/applied', auth, async (req, res) => {
  try {
    // Check if user is a worker
    if (req.user.userType !== 'worker') {
      return res.status(403).json({ message: 'Only workers can access this endpoint' });
    }
    
    const jobs = await Job.find({
      'applicants.user': req.user.userId
    })
    .populate('recruiter', 'firstName lastName email rating')
    .sort({ datePosted: -1 });
    
    // Add application status to each job
    const jobsWithStatus = jobs.map(job => {
      const application = job.applicants.find(
        app => app.user.toString() === req.user.userId
      );
      
      return {
        ...job.toObject(),
        applicationStatus: application ? application.status : null,
        applicationDate: application ? application.appliedAt : null
      };
    });
    
    res.json(jobsWithStatus);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('recruiter', 'firstName lastName email rating')
      .populate('applicants.user', 'firstName lastName email rating');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new job (protected route)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, wage, location, coordinates, isUrgent, isVolunteer, volunteerSlots } = req.body;
    
    // Only recruiters can post jobs
    if (req.user.userType !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can post jobs' });
    }
    
    const newJob = new Job({
      title,
      description,
      category,
      wage,
      location,
      coordinates,
      recruiter: req.user.userId,
      isUrgent: isUrgent || false,
      isVolunteer: isVolunteer || false,
      volunteerSlots: volunteerSlots || { total: 0, filled: 0 }
    });
    
    await newJob.save();
    
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a job (protected route)
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the job recruiter
    if (job.recruiter.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update job fields
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the job recruiter
    if (job.recruiter.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await job.remove();
    
    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply for a job (protected route)
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if job is still open
    if (job.status !== 'open') {
      return res.status(400).json({ message: 'This job is no longer accepting applications' });
    }
    
    // Check if user already applied
    const alreadyApplied = job.applicants.find(
      applicant => applicant.user.toString() === req.user.userId
    );
    
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    // Add user to applicants
    job.applicants.push({
      user: req.user.userId,
      status: 'pending'
    });
    
    await job.save();
    
    res.json(job);
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update applicant status (protected route, recruiter only)
router.put('/:id/applications/:applicantId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the job recruiter
    if (job.recruiter.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Find the applicant
    const applicantIndex = job.applicants.findIndex(
      applicant => applicant.user.toString() === req.params.applicantId
    );
    
    if (applicantIndex === -1) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    
    // Update applicant status
    job.applicants[applicantIndex].status = status;
    
    // If accepting a volunteer and it's a volunteer job, increment the filled slots
    if (status === 'accepted' && job.isVolunteer && job.volunteerSlots) {
      job.volunteerSlots.filled = (job.volunteerSlots.filled || 0) + 1;
    }
    
    await job.save();
    
    res.json(job);
  } catch (error) {
    console.error('Error updating applicant status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
