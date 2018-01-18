var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

/* GET home page. */
router.get('/', getHome);
router.get('/signup', getSignup);
router.post('/signup', postSignup);
router.get('/signin', getSignin);
router.post('/signin', postSignin);
router.get('/signout', getSignout);

module.exports = router;

function getHome (req, res, next) {
  let user = req.session.user
  res.render('index', { user: user });
}

function getSignup (req, res, next) {
  let user = req.session.user
  res.render('signup', { user: user, error: '' })
}

async function postSignup (req, res, next) {
  try {
    let username = req.body.username
    let password = req.body.password
    let user = await userService.createUser(username, password)
    req.session.user = user
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.render('signup', { user: null, error: '帳號已經有人使用'})
  }

}

function getSignin (req, res, next) {
  let user = req.session.user
  res.render('signin', { user: user, error: '' })
}

async function postSignin (req, res, next) {
  try {
    let username = req.body.username
    let password = req.body.password
    let user = await userService.verifyUser(username, password)
    req.session.user = user
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.render('signin', { user: null, error: '登入失敗'})    
  }
}

function getSignout (req, res, next) {
  req.session.user = null
  res.redirect('/')
}
