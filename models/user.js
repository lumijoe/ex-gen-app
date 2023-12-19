// models/user.js
// list6-25(p366)1219

'use strict';
module.exports = (sequelize, DataTypes) => {
  // モデルの作成(CRUIDバリデーションより詳細設定が可能。特定条件での保存が可能。)
  // エラーメッセージを日本語で表示する
  // 技術書修正（入力下さい。入力して下さい。の混在を、入力して下さい。に表現統一し、変数使用で記述ミス防止）
  const defaultMsg = 'を必ず入力して下さい。';
  const User = sequelize.define('User', {
    
    name: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `名前${defaultMsg}`
        }
      }
    },
    pass: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `パスワード${defaultMsg}`
        }
      }
    },
    mail: {
      type:DataTypes.STRING,
      validate: {
        isEmail: {
          msg: `メールアドレス${defaultMsg}`
        }
      }
    },
    age: {
      type:DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: `整数${defaultMsg}`
        },
        min: {
          args:[0],
          msg: "ゼロ以上の値が必要です。"
        }
      }
    }
    // name: {
    //   type:DataTypes.STRING,
    //   validate: {
    //     notEmpty:true
    //   }
    // },
    // pass: {
    //   type:DataTypes.STRING,
    //   validate: {
    //     notEmpty: true
    //   }
    // },
    // mail: {
    //   type:DataTypes.STRING,
    //   validate: {
    //     isEmail: true
    //   }
    // },
    // age: {
    //   type:DataTypes.INTEGER,
    //   validate: {
    //     isInt: true,
    //     min: 0
    //   }
    // }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};