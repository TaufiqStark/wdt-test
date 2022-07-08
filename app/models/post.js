'use strict';
const { UUIDV4 } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      this.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments'
      })
    }
  }
  Post.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};