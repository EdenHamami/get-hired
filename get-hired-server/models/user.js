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
        
      },
      company_name: {
        type: String,
       
      },
      location: {
        type: String,
       
      },
      via: {
        type: String,
        
      },
      description: {
        type: String,
        
      }
      }]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;