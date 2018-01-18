module.exports = {
  db1: {
    databaseUri: 'mongodb://localhost/myblog'
  },
  db2: {
    database: process.env.DB_NAME || 'myblog',
    user: process.env.DB_USER || 'allen',
    password: process.env.DB_PASS || 'allen',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './myblog.sqlite',
      operatorsAliases: false
    }
  }
}
