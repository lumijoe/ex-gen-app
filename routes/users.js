// routes/users.js
// list6-15(p341)1208

const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');

router.get('/',(req, res, next) => {
  const nm = req.query.name;
  const ml = req.query.mail;
  
  // 技術書エラーによるコード修正
  // nameとmailがundefinedでない事を確認する
  const whereClause = {};
  if (nm !== undefined) {
    whereClause.name = { [Op.like]: '%' + nm + '%' };
  }
  if (ml !== undefined) {
    whereClause.mail = { [Op.like]: '%' + ml + '%' };
  }

  db.User.findAll({
    where: whereClause
  }).then(usrs => {
    const data = {
      title: 'Users/Index',
      content: usrs
    };
    res.render('users/index', data);
  });
});

router.get('/add', (req, res, next) => {
  var data = {
    title: 'Users/Add'
  }
  res.render('users/add', data);
});

router.post('/add',(req, res, next) => {
  db.sequelize.sync()
    .then(() => db.User.create({
      name: req.body.name,
      pass: req.body.pass,
      mail: req.body.mail,
      age: req.body.age
    }))
    .then(usr => {
      res.redirect('/users');
    });
});

module.exports=router;