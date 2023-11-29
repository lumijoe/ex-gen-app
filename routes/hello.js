// routes/hello.js
// list5-17(p290)1129
// views/hello.ejsにアクセスされた時の処理をするhello.js
// app.jsで使用できるようにexport

// express, expressrouter, sqlite3, express-validatorの使用を定義
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3'); 
const { check, validationResult } = require('express-validator');

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
// express-validatorでバリデーションを設定
// セキュリティ関連
router.get('/add', (req, res, next) => {
    var data = {
        title: 'Hello!/Add',
        content: '新しいコードを入力：',
        // バリデーションチェックNGの際、NGテキストから再入力を可能にするための情報保持としてのform
        form: { name:'', mail:'', age:0 }
    }
    res.render('hello/add', data);
});

router.post('/add', [
    check('name', 'NAME は必ず入力して下さい。').notEmpty().escape(),
    check('mail', 'MAIL はメールアドレスを記入して下さい。').isEmail().escape(),
    check('age', 'AGE は年齢（整数）を入力して下さい。').isInt().escape()
], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        var result = '<ul class="text-danger">';
        var result_arr = errors.array();
        for(var n in result_arr) {
            result += `<li> ${result_arr[n].msg} </li>`
        }
        result += '</ul>';
        var data = {
            title:'Hello/Add',
            content: result,
            form: req.body
        }
        res.render('hello/add', data);
    } else {
        var nm = req.body.name;
        var ml = req.body.mail;
        var ag = req.body.age;
        db.serialize(() => {
            db.run('insert into mydata (name, mail, age) values (?, ?, ?)', nm, ml, ag);
        });
        res.redirect('/hello');
    }
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

// find(find.ejs)の処理を作成
router.get('/find', (req, res, next) => {
    db.serialize(() => {
        db.all("select * from mydata", (err, rows) => {
            if (!err) {
                var data = {
                    title: 'Hello/find',
                    find: '',
                    content: '検索条件を入力してください',
                    mydata: rows
                };
                res.render('hello/find', data);
            }
        });
    });
});

router.post('/find', (req, res, next) => {
    var find = req.body.find;
    db.serialize(() => {
        var q = "select * from mydata where ";
        db.all(q + find, [], (err, rows) => {
            if (!err) {
                var data = {
                    title: 'Hello/find',
                    find:find,
                    content: `検索条件 ${find}`,
                    mydata: rows
                };
                res.render('hello/find', data);
            }
        });
    });
});

module.exports = router;
// http://localhost:3000/hello


