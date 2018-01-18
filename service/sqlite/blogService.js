const { User, Blog, Comment } = require('../../db/index')

const createBlog = (title, body, authorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findById(authorId)
      let blog = await Blog.create({
        title,
        body
      })
      blog.setUser(user)
      await blog.save()
      resolve(blog)
    } catch (err) {
      reject(err)
    }
  })
}

const getAllBlogs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let blogs = await Blog.findAll()
      blogs = blogs.map(blog => blog.get({ plain: true }))
      resolve(blogs)
    } catch (err) {
      reject(err)
    }
  })
}

const getBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blog = await Blog.findById(id)
      blog = blog.get({ plain: true })
      let comments = await Comment.findAll({
        where: { blog: blog._id },
        include: [User]
      })
      comments = comments.map(comment => {
        comment = comment.get({ plain: true })
        comment.author = comment.User
        delete comment.User
        return comment
      })
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
      let blog = await Blog.findById(blogId)
      let user = await User.findById(authorId)
      let comment = await Comment.create({
        body
      })
      comment.setBlog(blog)
      comment.setUser(user)
      await comment.save()
      resolve(comment.get({ plain: true }))
    } catch (err) {
      reject(err)
    }
  })
}

const updateBlogById = (blogId, title, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blog = await Blog.findById(blogId)
      blog.title = title
      blog.body = body
      await blog.save()
      resolve(blog)
    } catch (err) {
      reject(err)
    }
  })
}

const deleteBlogById = (blogId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let blog = await Blog.findById(blogId)
      let comments = await Comment.findAll({
        where: { blog: blog.id }
      })
      await blog.destroy()
      await Promise.all(comments.map(comment => comment.destroy()))
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
