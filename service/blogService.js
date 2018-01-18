if (process.env.DB && process.env.DB == 'mongodb') {
  module.exports = require('./sqlite/blogService')
} else {
  module.exports = require('./sqlite/blogService') 
}
