// routes/hello.js
// list4-14(p211)1122
// views/hello.ejsにアクセスされた時の処理をするhello.js
// app.jsで使用できるようにexport

const express = require('express');
const router = express.Router();

// http://localhost:3000/hello　へアクセス
router.get('/', (req, res, next) => {
    var data = {
        title: 'Hello!',
        content: '※ 何か書いて送信してください。'
    };
    res.render('hello', data);
});

router.post('/post', (req, res, next) => {
    var msg = req.body['message'];
    var data = {
        title: 'Hello!',
        content: `あなたは、「 ${msg} 」と送信しました。`
    };
    res.render('hello', data);
});

module.exports = router;

