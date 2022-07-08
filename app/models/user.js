'use strict';
const {
  Model
} = require('sequelize');
const hidden = ['password']
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts'
      })
    }
    
    json(){
      let attrs = Object.assign({}, this.get())
      for (let a of hidden ?? []) {
        delete attrs[a]
      }
      return attrs
    }
    createToken({ bcrypt, jwt, secret, password }){
      const isValidPass = bcrypt.compareSync(password, this?.password)
      const token = jwt.sign({
          id: this.id
      }, secret, {
          expiresIn: 86400
      })
      if(!isValidPass)return false;
      return `Bearer ${token}`
    }
  }
  User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};