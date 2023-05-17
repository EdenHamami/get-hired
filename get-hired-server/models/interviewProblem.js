const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//An interview with his list of questions
const interviewProblemSchema = new Schema({

    type: {
        type: String,
        required: true
    },
    // name: {
    //     type: String,
    //     required: true
    // },
    
    questions:[{
        
        content: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        },

    }]

    
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