var express = require('express');
var router = express.Router();

var users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'bob' },
  { id: 3, name: 'charlie' }
]
/* GET all users */
router.get('/', function(req, res, next) {
  res.json(users)
});

// /users/1
router.get('/:uid', function(req, res, next) {
  let id = req.params.uid
  let user = users.find(u => u.id == id)
  res.json(user)
})

router.post('/', function(req, res, next) {
  let name = req.body.name
  let id = users.length + 1
  let newUser = { id: id, name: name }
  users.push(newUser)
  res.json(newUser)
})

router.put('/:uid', function(req, res, next) {
  let id = req.params.uid
  let name = req.body.name
  let user = users.find(u => u.id == id)
  user.name = name
  res.json({ message: 'update ok' })
})

router.delete('/:uid', function(req, res, next) {
  let id = req.params.uid
  let index = users.findIndex(u => u.id == id)
  users.splice(index, 1)
  res.json({ id: id })
})

module.exports = router;
