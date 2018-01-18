const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define Comment schema
const commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  body: String,
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' }
}, {
  timestamps: true
})

// export Comment model
module.exports = mongoose.model('Comment', commentSchema)
