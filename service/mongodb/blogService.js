const { User, Blog, Comment } = require('../../db/index')

const createBlog = (title, body, authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blog = new Blog({
        title,
        body,
        author: authorId
      })
      blog = await blog.save()
      resolve(blog)
    } catch (err) {
      reject(err)
    }
  })
}

const getAllBlogs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogs = await Blog.find({}).exec()
      resolve(blogs)
    } catch (err) {
      reject(err)
    }
  })
}

const getBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let blog = await Blog.findById(id).populate('comments').exec()
      let blog = await Blog.findById(id).exec()
      let comments = await Comment.find({ blog: blog._id }).populate('author').exec()
      blog.comments = comments
      resolve(blog)
    } catch (err) {
      reject(err)
    }
  })
}

const createComment = (body, blogId, authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comment = new Comment({
        body,
        blog: blogId,
        author: authorId
      })
      comment = await comment.save()
      resolve(comment)
    } catch (err) {
      reject(err)
    }
  })
}

const updateBlogById = (blogId, title, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blog = await Blog.findById(blogId).exec()
      blog.title = title
      blog.body = body
      blog = await blog.save()
      resolve(blog)
    } catch (err) {
      reject(err)
    }
  })
}

const deleteBlogById = (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Blog.remove({ _id: blogId })
      await Comment.remove({ blog: blogId })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  createComment,
  updateBlogById,
  deleteBlogById
}
