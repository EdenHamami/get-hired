const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  appointmentPercentage: {
    type: Number,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });


const Vacancy = mongoose.model('Vacancy', vacancySchema);

module.exports = Vacancy;
