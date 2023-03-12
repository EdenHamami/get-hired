const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProblemType = require('./problemType');

const practiceProblemSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
        type: String,
        required: true
    },
    types: [{
      type: String,
      required: true
    }],
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
      solution: [{
        language: {
          type: String,
          required: true
        },
        solution: {
          type: String,
          required: true
        }
      }],
      main_for_lang: [{
        language: {
          type: String,
          required: true
        },
        main: {
          type: String,
          required: true
        }
      }],
      test: [{
        input: {
          type: String,
          required: true
        },
        output: {
          type: String,
          required: true
        }
      }],
      difficultyLevel: {
        type: Number,
        min: 1,
        max: 5
      },
}, { timestamps: true });

const PracticeProblem = mongoose.model('PracticeProblem', practiceProblemSchema);
module.exports = PracticeProblem;