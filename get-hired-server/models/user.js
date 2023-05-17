const mongoose = require('mongoose');
const Vacancy = require('./vacancy');
const PracticeProblem = require('./practiceProblem');
const InterviewProblem = require('./interviewProblem');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    // TODO: save hashed password (and not plaintext passwords)
    password: {
        type: String,
        required: true
    },
    
    personalInfo: [{
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      address: [{
        street: String,
        city: String,
        state: String,
      }],
      image:  String,
      desiredJob: String // Add desired job field
    }],
  
    workExperience: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date
    }],
    education: [{
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date
    }],
    myPracticeProblems: [{
        problem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'PracticeProblem',
          required: true
        },
        solution: {
          type: String,
          required: true
        },
        solutionTime: {
          type: Number,
          required: true
        }
      }],
      myInterviewProblems: [{
        problem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'InterviewProblem',
          required: true
        },
        video: {
          type: String,
          required: true
        },
        solutionTime: {
          type: Number,
          required: true
        },
        expertOpinion: {
          type: String,
          default: null
        }
      }],

    interestedVacancies: [{
      title: {
        type: String,
        required: true
      },
      company_name: {
        type: String,
        required: false
      },
      location: {
        type: Number,
        required: false
      },
      via: {
        type: String,
        required: false
      },
      description: {
        type: String,
        required: true
      },
      job_highlights: {
        type: String,
        required: false
      },
      related_links: {
        type: String,
        required: false
      },
      extensions: {
        type: String,
        required: false
      },
        publishedDate: {
          type: String,
          default: Date.now.toString()
        }
      }]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;