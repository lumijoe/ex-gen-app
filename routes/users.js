// routes/users.js
// list6-13(p337)1208

const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');

router.get('/',(req, res, next) => {
  const nm = req.query.name;
  const ml = req.query.mail;
  db.User.findAll({
    where: {
      [Op.or]:[
        {name:{[Op.like]:'%'+nm+'%'}},
        {mail:{[Op.like]:'%'+ml+'%'}}
      ]
    }
  }).then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    }
    res.render('users/index', data);
  });
});

module.exports=router;