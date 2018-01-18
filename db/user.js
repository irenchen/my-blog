const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define User schema
const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String
}, {
  timestamps: true
})

// export User model
module.exports = mongoose.model('User', userSchema)
