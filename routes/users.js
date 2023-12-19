// routes/users.js
// list6-23(p360)1219

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

// Users/Add
router.get('/add', (req, res, next) => {
  var data = {
    title: 'Users/Add',
    from: new db.User(),
    err: null
  }
  res.render('users/add', data);
});

router.post('/add',(req, res, next) => {
  const form = {
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age
  };
  db.sequelize.sync()
    .then(() => db.User.create(form)
    .then(usr => {
      res.redirect('/users');
    })
    .catch(err=> {
      var data = {
        title: 'User/Add',
        form: form,
        err: err
      }
      res.render('users/add', data);
    })
    )
});

// Users/Edit
router.get('/edit', (req, res, next) => {
  db.User.findByPk(req.query.id)
    .then(usr => {
      var data = {
        title: 'Users/Edit',
        form: usr
      }
      res.render('users/edit', data);
    }); 
});

router.post('/edit',(req, res, next) => {
  db.User.findByPk(req.body.id)
    .then(usr => {
      usr.name = req.body.name;
      usr.pass = req.body.pass;
      usr.mail = req.body.mail;
      usr.age = req.body.age;
      usr.save().ten(() =>res.redirect('/users'));
    });
});

// Users/Delete
router.get('/delete', (req, res, next) => {
  db.User.findByPk(req.query.id)
    .then(usr => {
      var data = {
        title: 'Users/Delete',
        form: usr
      }
      res.render('users/delete', data);
    }); 
});

router.post('/delete',(req, res, next) => {
  db.User.findByPk(req.body.id)
    .then(usr => {
      usr.destroy().ten(() =>res.redirect('/users'));
    });
});

module.exports=router;