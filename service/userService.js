if (process.env.DB && process.env.DB == 'mongodb') {
  module.exports = require('./mongodb/userService')
} else {
  module.exports = require('./sqlite/userService')
}
