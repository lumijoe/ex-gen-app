// routes/hello.js
// list4-11(p208)1121
// views/hello.ejsにアクセスされた時の処理をするhello.js
// app.jsで使用できるようにexport

const express = require('express');
const router = express.Router();
// アドレス入力：　http://localhost:3000/hello?name=hanako&mail=hanako@flower.com
router.get('/', (req, res, next) => {
    var name = req.query.name;
    var mail = req.query.mail;
    var data = {
        title: 'Hello!',
        content: 'あなたの名前は、' + name + '。<br>' + 'メールアドレスは、' + mail + 'です。'
    };
    res.render('hello', data);
});

module.exports = router;

