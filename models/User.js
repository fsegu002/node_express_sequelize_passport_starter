
const uuid = require('uuid/v4')
'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    photoUrl: DataTypes.STRING
    }, 
    {}
  )
  User.beforeCreate((user, {}) => {
    return user.id = uuid()
  })

  // User.associate = function(models) {
  //   // associations can be defined here
  // };
  return User;
};