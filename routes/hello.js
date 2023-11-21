// routes/hello.js
// list4-9(p205)1121
// views/hello.ejsにアクセスされた時の処理をするhello.jsとapp.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    var data = {
        title: 'Hello!',
        content: 'これは、サンプルのコンテンツです。<br>this is sample content.'
    };
    res.render('hello', data);
});

module.exports =router;