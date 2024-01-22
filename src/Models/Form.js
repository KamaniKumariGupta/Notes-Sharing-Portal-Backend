const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const form = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  PhoneNo: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  message: {
    type: String,
     required:true
  },
  interest: {
    type: String,
    required:true
  }

})

module.exports = mongoose.model("Forms", form)


