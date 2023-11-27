// routes/hello.js
// list5-9(p268)1127
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

// /addの処理を作成
router.get('/add', (req, res, next) => {
    var data = {
        title: 'Hello!/Add',
        content: '新しいコードを入力：'
    }
    res.render('hello/add', data);
});

router.post('/add', (req, res, next) => {
    const nm = req.body.name;
    const ml = req.body.mail;
    const ag = req.body.age;
    db.serialize(() => {
        db.run('insert into mydata (name, mail, age) values (?, ?, ?)', nm, ml, ag);
    });
    res.redirect('/hello');
});

// showの処理を作成
router.get('/show', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = "select * from mydata where id = ?";
        db.get(q, [id], (err, row) => {
            if (!err) {
                var data = {
                    title: 'Hello/show',
                    content: `id= ${id} のレコード：`,
                    mydata: row
                }
                res.render('hello/show', data);
            }
        });
    });
});


module.exports = router;
// http://localhost:3000/hello


