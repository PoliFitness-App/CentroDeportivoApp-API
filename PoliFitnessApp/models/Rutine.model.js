const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  hidden: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    trim: true,
    required: true
  }
}, { timestamps: true });

module.exports = Mongoose.model("Rutine", RutineSchema);