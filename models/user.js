// models/user.js
// list6-3(p312)1204

'use strict';
module.exports = (sequelize, DataTypes) => {
  // モデルの作成
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    pass: DataTypes.STRING,
    mail: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};