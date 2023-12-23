// routes/amount.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const { check, validationResult } = require('express-validator');

// データベースオブジェクトの取得
const db = new sqlite3.Database('cashnyan.sqlite3');
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS cashnyan (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            amountBalance INTEGER,
            amountExpenditure INTEGER,
            amountIncome INTEGER
        )
    `);
});

// アクセス処理GET
router.get('/', (req, res, next) => {

    // データベースのシリアライズ
    db.serialize(() => {
        // レコード全てを取り出す
        db.all('select * from cashnyan', (err, rows) => {
            // データベースアクセス完了時の処理
            if (!err) {
                var data = {
                    title: 'CashNyan',
                    content: rows // 取得したレコードデータ
                };
                res.render('amount/index', data);
            }
        });
    });
});

router.get('/add', (req, res, next) => {
    var data = {
        title: 'CashNyan/Add',
        content: '新規入力',

        // バリデーションチェックNGの際、入力済み情報を保持した状態を持つformの設定
        form : { category:'', amountBalance:0, amountExpenditure:0, amountIncome:0 }
    }
    res.render('amount/add', data);
});

router.post('/add', [
    check('category', 'カテゴリ名を入力').notEmpty().escape(),
    check('amountBalance', '残高表示').custom(value => {
        return value >= 0 }),
    check('amountExpenditure', '支出入力').custom(value => {
        return value >= 0 }),
    check('amountIncome', '収入入力').custom(value => {
        return value >= 0 }),
], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        var result = '<ul class="text-danger">';
            var result_arr = errors.array();
            for (var n in result_arr) {
                result += `<li> ${result_arr[n].msg} </li>`
            }
        result += '</ul>';

        var data = {
            title: 'CashNyan/Add',
            content: result,
            form: req.body
        }
        res.render('amount/add', data);
    } else {
        var ct = req.body.category;
        var aB = req.body.amountBalance;
        var aE = req.body.amountExpenditure;
        var aI = req.body.amountIncome;
        db.serialize(() => {
            db.run('insert into cashnyan (category, amountBalance, amountExpenditure, amountIncome) values (?, ?, ?, ?)', ct, aB, aE, aI);
        });
        res.redirect('/amount');
    }
});

// show(show.ejs)の処理を作成　http://localhost:3000/hello/show?category=A銀行

router.get('/show', (req, res, next) => {
    const category = req.query.category;
    db.serialize(() => {
        const q = 'select * from cashnyan where category = ?';
        db.get(q, [category], (err, row) => {
            if (!err) {
                var data = {
                    title: 'CashNyan/show',
                    content: `category = ${category} の情報`,
                    cashnyan: row
                }
                res.render('amount/show', data);
            }
        });
    });
});

// edit(edit.ejs)の処理を作成
router.get('/edit', (req, res, next) => {
    const category = req.query.id;
    db.serialize(() => {
        const q = 'select * from cashnyan where category = ?';
        db.get(q, [category], (err, row) => {
            if (!err) {
                var data = {
                    title: 'Cashnyan/edit',
                    content: `category = ${category}のレコードを編集`,
                    cashnyan: row
                }
                res.render('amount/edit', data);
            }
        });
    });
});

router.post('/edit', (req, res, next) => {
    const ct = req.body.category;
    const aB = req.body.amountBalance;
    const aE = req.body.amountExpenditure;
    const aI = req.body.amountIncome;
    const q = 'update cashnyan set category = ?, amountBalance = ?, amountExpenditure = ?, amountIncome = ? where category = ?';
    db.serialize(() => {
        db.run(q, ct, aB, aE, aI);
    });
    res.redirect('amount');
});

// delete(delete.ejs)の処理を作成
router.get('/delete', (req,res, next) => {
    const category = req.query.category;
    db.serialize(() => {
        const q = 'select * from cashnyan where category = ?';
        db.get(q, [category], (err, row) => {
            if (!err) {
                var data = {
                    title: 'CashNyan/Delete',
                    content: `category = ${category} のレコードを削除`,
                    cashnyan: row
                }
                res.render('amount/delete', data);
            }
        });
    });
});

router.post('/delete', (req, res, next) => {
    const category = req.body.category;
    db.serialize(() => {
        const q = 'delete from cashnyan where category = ?';
        db.run(q, category);
    });
    res.redirect('/amount');
});

module.exports = router;