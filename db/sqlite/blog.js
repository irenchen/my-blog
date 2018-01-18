module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    getterMethods: {
      _id () {
        return this.id
      }
    }
  })

  Blog.associate = function (models) {
    Blog.belongsTo(models.User, {
      foreignKey: 'author'
    })
  }

  return Blog
}
