const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:user-model");

const crypto = require("crypto");

const userSchema = new Schema({

  /*
  * GENERAL DATA
  */

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  /*
  * USER DATA
  */

  imc: {
    type: Number,
    required: true,

  },
  icc: {
    type: Number,
    required: true
  },
  gender: {
    type: Boolean, //True: Hombre, False: Mujer
    required: true
  },
  birthday: {
    type: Date,
    required: true,
    trim: true
  },
  weight: { // en kilogramos
    type: Number,
    required: true
  },
  height: { //en centimetros
    type: Number,
    required: true
  },
  waistP: {
    type: Number,
    required: true
  },
  hipP: {
    type: Number,
    required: true
  },
  approach: {
    type: String,
    required: true
  },
  /*
  * PASSWORD DATA
  */

  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  tokens: {
    type: [String],
    default: []
  },
  roles: {
    type: [String],
    default: []
  }
}, { timestamps: true });

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      const encryptedPassword = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000, 64,
        `sha512`
      ).toString("hex");

      return encryptedPassword;
    } catch (error) {
      debug({ error });
      return "";
    }
  },
  makeSalt: function () {
    return crypto.randomBytes(16).toString("hex");
  },
  comparePassword: function (password) {
    return this.hashedPassword === this.encryptPassword(password);
  }
}

userSchema.virtual("password")
  .set(function (password = crypto.randomBytes(16).toString()) {
    if (!password) return;

    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })

module.exports = Mongoose.model("User", userSchema);