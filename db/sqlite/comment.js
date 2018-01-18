module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: DataTypes.STRING
  }, {
    getterMethods: {
      _id () {
        return this.id
      }
    }
  })

  Comment.associate = function (models) {
    Comment.belongsTo(models.Blog, {
      foreignKey: 'blog'
    })
    Comment.belongsTo(models.User, {
      foreignKey: 'author'
    })
  }

  return Comment
}
