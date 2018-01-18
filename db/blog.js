const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define Blog schema
const blogSchema = new Schema({
  title: String,
  body: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

blogSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'blog',
  justOne: false
})

// export Blog model
module.exports = mongoose.model('Blog', blogSchema)
