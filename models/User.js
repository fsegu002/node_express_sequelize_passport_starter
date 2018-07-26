'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
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
  // User.associate = function(models) {
  //   // associations can be defined here
  // };
  return User;
};