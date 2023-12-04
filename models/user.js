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






// デフォルトの書き方
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     name: DataTypes.STRING,
//     pass: DataTypes.STRING,
//     mail: DataTypes.STRING,
//     age: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };