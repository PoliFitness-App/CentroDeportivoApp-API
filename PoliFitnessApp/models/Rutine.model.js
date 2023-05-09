const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

// TO DO : CONFIGURAR RUTINE SCHEMA

// STEP SCHEMA

const stepSchema = new Schema({

    // EACH STEP HAS A NAME AND A DESCRIPTION
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

const RutineSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    //URL's
    type: String,
  },
  ageRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  routineType: {
    type: String,
    required: true,
  },
  bmiRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  waistToHipRatioRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  difficulty: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  routineTime: {
    type: Number,
    required: true,
  },
  steps: [stepSchema], // STEP'S ARRAY
}, { timestamps: true });

module.exports = Mongoose.model("Rutine", RutineSchema);