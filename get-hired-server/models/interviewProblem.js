const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewProblemSchema = new Schema({

    content: {
        type: String,
        required: true
    },
    video: {
      name: {
          type: String,
          required: true
      },
      data: {
          type: Buffer,
          required: true
      }
  }
    
    // video: {
    //   //link-google drive,amazon....
    //   type: Binary,
    //   required: true
    // },

    // types: {
    //     // array of problem type IDs
    //     type: [String],
    //     required: true
    // }

//     hints: [{
//       name: {
//         type: String,
//         required: true
//       },
      
//       content: {
//         type: String,
//         required: true
//       },
//       video: {
//         type: String,
//         required: true
//       }
//     }],

//     solution: {
//         type: String,
//         required: true
//     },

//     test: {
//         type: String,
//         required: true
//     },
    
//     difficultyLevel: {
//         type: Number,
//         min: 1,
//         max: 5
//     },

//     language: {
//         type: String,
//     }

// }, { timestamps: true }
  });

const InterviewProblem = mongoose.model('interviewProblem', interviewProblemSchema);
module.exports = InterviewProblem;