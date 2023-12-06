// routes/users.js
// list6-11(p334)1206

const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Op } = require('sequelize');

router.get('/',(req, res, next) => {
  const nm = req.query.name
  db.User.findAll({
    where: {
      name: {[Op.like]:'%'+nm+'%'}
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



// list6-10(p332)1206
// const { Op } = require("sequelize");
// router.get('/',(req, res, next) => {
//   const id = req.query.id
//   db.User.findAll({
//     where: {
//       id:{ [Op.lte]:id }
//     }
//   }).then(usrs => {
//     var data = {
//       title: 'Users/Index',
//       content: usrs
//     }
//     res.render('users/index', data);
//   });
// });

// module.exports=router;

// list6-9(p330)1206
// /* GET users listing. */
// router.get('/',(req, res, next) => {
//   const id = req.query.id
//   db.User.findAll({
//     where: {
//       id: id
//     }
//   }).then(usrs => {
//     var data = {
//       title: 'Users/Index',
//       content: usrs
//     }
//     res.render('users/index', data);
//     });
// });
// module.exports = router;