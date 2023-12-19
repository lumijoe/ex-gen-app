// models/user.js
// list6-22(p359)1219

'use strict';
module.exports = (sequelize, DataTypes) => {
  // モデルの作成(CRUIDバリデーションより詳細設定が可能。特定条件での保存が可能。)
  const User = sequelize.define('User', {
    name: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:true
      }
    },
    pass: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    mail: {
      type:DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    age: {
      type:DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 0
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};