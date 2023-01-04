const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const practiceProblemSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    types: {
        // array of problem type IDs
        type: [String],
        required: true
    },
    hints: [{
        name: {
          type: String,
          required: true
        },
        content: {
          type: String,
          required: true
        }
      }],
      solution: {
        type: String,
        required: true
      },
      test: {
        type: String,
        required: true
      },
      difficultyLevel: {
        type: Number,
        min: 1,
        max: 5
      },
      language: {
        type: String,
      }
}, { timestamps: true });

const PracticeProblem = mongoose.model('PracticeProblem', practiceProblemSchema);
module.exports = PracticeProblem;