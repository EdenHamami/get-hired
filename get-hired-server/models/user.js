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

  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
      street: String,
      city: String,
      state: String,
    image: String,
    desiredJob: String // Add desired job field
  },


  workExperience: [{
    title: String,
    company: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  education: [{
    institution: String,
    degree: String,
    grade: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  skills: [String],
  summary:
  {
    type: String
  },
  // templateId:{
  //   type: String
  // },
  // designOptions1: {
  //   type: Object,
  //   default: {
  //     backgroundColor: '#ffffff',
  //     fontColor: '#000000',
  //     fontFamily: 'Arial',
  //     fontSize: '12',
  //     backgroundColor2: '#ffffff',
  //   },
  // },
  // designOptions2: {
  //   type: Object,
  //   default: {
  //     backgroundColor: '#ffffff',
  //     fontColor: '#000000',
  //     fontFamily: 'Arial',
  //     fontSize: '12',
  //     backgroundColor2: '#ffffff',
  //   },
  // },
  // designOptions3: {
  //   type: Object,
  //   default: {
  //     backgroundColor: '#ffffff',
  //     fontColor: '#000000',
  //     fontFamily: 'Arial',
  //     fontSize: '12',
  //     backgroundColor2: '#ffffff',
  //   },
  // },

  myPracticeProblems: [{
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PracticeProblem',
      required: true
    },
    solutions: [{
      language: {
        type: String,

      },
      solution: {
        type: String,

      }
    }],
    isSucceed: {
      type: Boolean
    }
  }],
  interviewDriveLink:
  {
    type: String
  },

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