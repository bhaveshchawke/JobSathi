const mongoose = require('mongoose');

// User Schema for Betul Jobs Portal
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Role-based access control
  role: { 
    type: String, 
    enum: ['seeker', 'employer', 'admin'], 
    default: 'seeker' 
  },

  // Specific to Seekers
  profileData: {
    bio: { type: String },
    skills: [{ type: String }],
    education: [{
      institution: String,
      year: String,
      degree: String
    }]
  },
  
  // S3 URL for the Resume PDF
  resumeUrl: { type: String }, 

  // Specific to Employers
  companyName: { type: String },
  isVerified: { type: Boolean, default: false }, // Verification Badge logic
  verificationDocUrl: { type: String }, // URL for Gumasta/Visiting Card

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
