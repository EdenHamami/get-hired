const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalProblemSchema = new Schema({
  name: String,
  question: String,
  goal: String,
  recommended_answer: String,
  example_answer: String
});

const PersonalProblem = mongoose.model('PersonalProblem', personalProblemSchema);

module.exports = PersonalProblem;