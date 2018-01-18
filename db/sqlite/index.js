const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const config = require('../../config')
const db = {}

const sequelize = new Sequelize(
  config.db2.database,
  config.db2.user,
  config.db2.password,
  config.db2.options
)

fs.readdirSync(__dirname)
  .filter(file => file != 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

sequelize.sync()
  .then(async () => {
    console.log('db initialized...')
  })
  .catch(console.log)

db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db
