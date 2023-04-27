const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
    via: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  job_highlights: [{
    title: String,
    items:[String]
}],
related_links: [{
  link: String,
  text: String
}],
extensions: [String],
detected_extensions: {
        posted_at: String,
        schedule_type: String
      },
job_id: {
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
