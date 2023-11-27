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

// /add(add.ejs)の処理を作成 http://localhost:3000/hello/add
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

// show(show.ejs)の処理を作成 http://localhost:3000/hello/show?id=1
router.get('/show', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = "select * from mydata where id = ?";
        db.get(q, [id], (err, row) => {
            if (!err) {
                var data = {
                    title: 'Hello/show',
                    content: `id = ${id} のレコード：`,
                    mydata: row
                }
                res.render('hello/show', data);
            }
        });
    });
});

// edit(edit.ejs)の処理を作成
// 技術書はhello/editだがtitleの一貫性のため大文字Hello/editへ修正
router.get('/edit', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = "select * from mydata where id = ?";
        db.get(q, [id], (err, row) => {
            if (!err) {
                var data = {
                    title: 'Hello/edit',
                    content: `id = ${id} のレコードを編集：`,
                    mydata: row
                }
                res.render('hello/edit', data);
            }
        });
    });
});

router.post('/edit', (req, res, next) => {
    const id = req.body.id;
    const nm = req.body.name;
    const ml = req.body.mail;
    const ag = req.body.age;
    const q = "update mydata set name = ?, mail = ?, age = ? where id = ?";
    db.serialize(() => {
        db.run(q, nm, ml, ag, id);
    });
    res.redirect('/hello');
});

//　delete(delete.ejs)の処理を作成
router.get('/delete', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const q = "select * from mydata where id = ?";
        db.get(q, [id], (err, row) => {
            if (!err) {
                var data = {
                    title: 'Hello/Delete',
                    content: `id = ${id} のレコードを削除：`,
                    mydata: row
                }
                res.render('hello/delete', data);
            }
        });
    });
});

router.post('/delete', (req, res, next) => {
    const id = req.body.id;
    db.serialize(() => {
        const q = "delete from mydata where id = ?";
        db.run(q, id);
    });
    res.redirect('/hello');
});

module.exports = router;
// http://localhost:3000/hello


