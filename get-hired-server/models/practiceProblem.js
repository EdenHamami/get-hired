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
  examples: [{
    input: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    }
  }],
  types: [{
    // type: String,
    // required: true
    type: Schema.Types.ObjectId,
    ref: 'ProblemType',
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
  python:{
    header:{
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    }, 
    main: {
      type: String,
      required: true
    }, 
    initial_code:{
      type: String,
      required: true
    }

  },
  cpp:{
    header:{
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    }, 
    main: {
      type: String,
      required: true
    }, 
    initial_code:{
      type: String,
      required: true
    }
  },
  java:{
    header:{
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    }, 
    main: {
      type: String,
      required: true
    }, 
    initial_code:{
      type: String,
      required: true
    }
  },
  // solution: [{
  //   language: {
  //     type: String,
  //     required: true
  //   },
  //   solution: {
  //     type: String,
  //     required: true
  //   }
  // }],
  // main_for_lang: [{
  //   language: {
  //     type: String,
  //     required: true
  //   },
  //   main: {
  //     type: String,
  //     required: true
  //   }
  // }],
  // initial_code: [{
  //   language: {
  //     type: String,
  //     required: true
  //   },
  //   code: {
  //     type: String,
  //     required: true
  //   }
  // }],
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
    type: String,
    required: true
  },
}, { timestamps: true });

practiceProblemSchema.methods.getTypeNames = async function() {
  const types = await this.populate('types').execPopulate();
  return types.types.map(type => type.name);
};

const PracticeProblem = mongoose.model('PracticeProblem', practiceProblemSchema);
module.exports = PracticeProblem;