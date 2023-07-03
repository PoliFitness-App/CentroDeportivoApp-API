const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PostSchema = new Schema({
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
  category: {
    type: String,
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
}, { timestamps: true });

module.exports = Mongoose.model("Post", PostSchema);