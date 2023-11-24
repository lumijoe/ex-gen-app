// routes/hello.js
// list5-2(p249)1124　+ (p260)1124による変更
// views/hello.ejsにアクセスされた時の処理をするhello.js
// app.jsで使用できるようにexport

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3'); //　追加

// データベースオブジェクトの取得
const db = new sqlite3.Database('mydb.sqlite3');

// GETアクセスの処理
router.get('/', (req, res, next) => {

    // データベースのシリアライズ
    db.serialize(() => {
        // レコードを全て取り出す
        db.all("select * from mydata",(err, rows) => {
            // データベースアクセス完了時の処理
            if (!err) {
                var data = {
                    title: 'Hello!',
                    content: rows // 取得したレコードデータ
                };
                res.render('hello/index', data); // p260による変更（hello to hello/index）
            }
        });
    });
});

module.exports = router;
// http://localhost:3000/hello


