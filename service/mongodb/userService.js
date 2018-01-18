const { User, Blog, Comment } = require('../../db/index')

const createUser = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = new User({
        username,
        password
      })
      user = await user.save()
      resolve(user)
    } catch (err) {
      reject(err)
    }
  })
}

const verifyUser = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ username: username }).exec()
      if (user) {
        if (user.password == password) {
          resolve(user)
        } else {
          reject(new Error('password not correct'))
        }
      } else {
        reject(new Error('username not exist'))
      }
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  createUser,
  verifyUser
}
