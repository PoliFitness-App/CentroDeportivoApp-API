const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

// TO DO : CONFIGURAR RUTINE SCHEMA

// STEP SCHEMA

/**
 * ya no se utiliza debido al formato
 * const stepSchema = new Schema({

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
 */

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
  approach: {//enfoque
    type: String,
    trim: true,
    required: true
    //default ?
  },
  level: {
    type: String, //en rpincipio son facil, medio, muy dificil por ejemplo
    trim: true,
    required: true
  },
  category: {
    type: String, //tren superior, brazos etc
    trim: true,
    required: true
  },
  url: {
    type: String,
    trim: true,
    required: true
  }
}, { timestamps: true });

module.exports = Mongoose.model("Rutine", RutineSchema);