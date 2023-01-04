const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const ProblemType = mongoose.model('ProblemType', problemTypeSchema);
module.exports = ProblemType;