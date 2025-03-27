
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  wage: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  isVolunteer: {
    type: Boolean,
    default: false
  },
  volunteerSlots: {
    total: Number,
    filled: Number
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open'
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  applicants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }]
});

// Create a geospatial index on coordinates
JobSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Job', JobSchema);
