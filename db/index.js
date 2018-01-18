// 如果要使用mongodb，記得要先設定環境變數 DB=mongodb
if (process.env.DB && process.env.DB == 'mongodb') {
  var config = require('../config');
  var mongoose = require('mongoose');
  mongoose.connect(config.db1.databaseUri, { useMongoClient: true });
  mongoose.Promise = global.Promise;
  
  var db = mongoose.connection;
  db.on('error', function() { 
    console.error('connection error:')
  });
  db.once('open', function() {
    console.log('db connected')
  });
  
  const User = require('./user.js')
  const Blog = require('./blog.js')
  const Comment = require('./comment.js')
  
  module.exports = {
    User,
    Blog,
    Comment
  }
} else { // 預設使用sqlite
  const db = require('./sqlite')

  module.exports = db
}

