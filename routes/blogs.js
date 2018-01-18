var express = require('express');
var router = express.Router();
var blogService = require('../service/blogService');

// url : /blogs
router.get('/', validateUser, getBlogs);
router.get('/new', validateUser, getNewBlogs);
router.post('/', validateUser, postBlogs);
router.get('/:id', getSingleBlog);
router.get('/:id/update', validateUser, getUpdateBlogs);
router.post('/:id', validateUser, putBlog);
router.get('/:id/delete', validateUser, deleteBlog);
router.post('/:id/comments', validateUser, postComments);

function validateUser (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/signin')
  }
}
async function getBlogs (req, res, next) {
  try {
    let blogs = await blogService.getAllBlogs()
    console.log(blogs)
    res.render('view-blogs', { user: req.session.user, blogs: blogs })
  } catch (err) {
    res.render('view-blogs', { user: req.session.user, blogs: [] })
  }
  
}
async function getNewBlogs (req, res, next) {
  res.render('create-blogs', { user: req.session.user })
}
async function postBlogs (req, res, next) {
  try {
    let title = req.body.title
    let body = req.body.body
    let authorId = req.session.user._id
    console.log('authorId : ' + authorId)
    let blog = await blogService.createBlog(title, body, authorId)
    res.redirect('/blogs')
  } catch (err) {
    console.log(err)
    res.redirect('/blogs')
  }
}
async function getSingleBlog (req, res, next) {
  try {
    let blogId = req.params.id
    let blog = await blogService.getBlog(blogId)
    res.render('view-blog', { user: req.session.user, blog: blog, error: '' })
  } catch (err) {
    res.render('view-blog', { user: req.session.user, blog: null, error: '' })
  }  
}
async function getUpdateBlogs (req, res, next) {
  try {
    let blogId = req.params.id
    let blog = await blogService.getBlog(blogId)
    res.render('update-blog', { user: req.session.user, blog: blog })
  } catch (err) {
    res.render('view-blog', { user: req.session.user, error: '文章讀取失敗' })
  }
}
async function putBlog (req, res, next) {
  try {
    let blogId = req.params.id
    let title = req.body.title
    let body = req.body.body
    let blog = await blogService.updateBlogById(blogId, title, body)
    res.redirect('/blogs/' + blogId)
  } catch (err) {
    console.log(err)
    res.render('view-blog', { user: req.session.user, error: '文章讀取失敗' })
  }  
}
async function deleteBlog (req, res, next) {
  try {
    let blogId = req.params.id
    await blogService.deleteBlogById(blogId)
    res.redirect('/blogs')
  } catch (err) {
    console.log(err)
    res.render('/blogs', { user: req.session.user, error: '文章刪除失敗' })
  }

}
async function postComments (req, res, next) {
  try {
    let body = req.body.body
    let blogId = req.params.id
    let authorId = req.session.user._id
    let comment = await blogService.createComment(body, blogId, authorId)
    res.redirect('/blogs/' + blogId)
  } catch (err) {
    console.log(err)
    res.redirect('/blogs/' + blogId)    
  }
}

module.exports = router;
