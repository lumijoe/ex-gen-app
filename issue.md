## Express generator、npm install
## npm startで起動、http://localhost:3000
    (ターミナル：起動時表示
        > ex-gen-app@0.0.0 start
        > node ./bin/www)
## github  https://github.com/lumijoe/ex-gen-app

## link href　のpublicフォルダのpublicは省略可能 /public/stylesheets... = /stylesheets...

## 流れ
    node.js実行→www（起動プログラム）→app.js(mainプログラム)→/index, /users, /hello
    →routesフォルダ（内のスクリプトindex.js,uses.js, hello.js）

## warnスルーOK
    ターミナル表示：body-parser deprecated undefined extended: provide extended option app.js:26:17
    body-parserが直接使用されていない場合express.urlencoded()の実際の実装がbody-parserに依存しているため表示される。
    Express 4.16.0以降では、body-parserがデフォルトで組み込まれていて警告表示となるがスルーOK

## app.jsの設定
    // 1:要モジュールのロード
    var createError = require('http-errors');        // error（エラー対処）
    var express = require('express');                // express（本体）
    var path = require('path');                      // path（ファイルパスを扱う）
    var cookieParser = require('cookie-parser');     // cookie-parser（値変換処理系）
    var logger = require('morgan');                  // logger morgan（reqログ出力系）

    // 2:ルート用モジュールのロード
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');

    // 3:Expressオブジェクトの作成と基本設定
    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // Middleware setup
    app.use(logger('dev'));                                  // logger dev
    app.use(express.json());                                 // express.json
    app.use(express.urlencoded({ extend: false }));          // express.urlencoded
    app.use(cookieParser());                                 // cookieParser
    app.use(express.static(path.join(__dirname, 'public'))); // express.static path.json

    // 4:app.useによる関数の組み込み
    // Serve routes using routers
    app.use('/', indexRouter);
    app.use('users', usersRouter);

    // 5:アクセスするルートとエラー用のapp.use作成
    // Catch 404 and forward to error handler
    app.use(function(req, res, next) {
    next(createError(404));
    });

    // Error handler
    app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
    });

    // 6:module.expressの設定
    module.express = app;

## フォーム送信（Body Parserパッケージ）
    最近のExpressではデフォルトで設定されている（レガシーではinstallが必要かも）
    node_modules/express/lib/express.jsをチェックする
        /**
        * Expose middleware
        */
        exports.json = bodyParser.json
        exports.query = require('./middleware/query');
        exports.static = require('serve-static');
        exports.urlencoded = bodyParser.urlencoded　があればOK

## クッキーより高機能なセッションのinstall(デフォルトで設定なし)
    npm install express-session、　起動確認（app.jsにrequireする）

## 外部サイトにアクセスしてデータを取り出すxml2jsモジュールのインストール
    npm install xml2js、routes/hello.jsでrequire
    https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja（googleニュース）
    サーバー負荷をかけないために、アクセス頻度の間隔設定や、応急処置としてリンク先のコメントアウトで対応

## sqlite3をマックにインストールしてからデータベースを作成（GUIインストールをプロジェクト内で実行）、コードで使用できるようにターミナルでnpm install sqlite3 で使用できるように設定
    データを編集したいときは、アプリケーション内のデータベースにアクセスし、プロジェクト内のファイルを選択して編集する

## branch 278find　のテスト
    OK→fetch,merge済みにより、branch削除済み

## CRUD操作
    Create：新規保存（新しいレコードを作成して保存）
    Read：読み込み（レコードをデータベースから取り出し）
    Update：更新（レコードの内容フィールドの書き換え）
    Delete：削除（レコードの削除）

## バリデーション
**きちんとしたデータかどうかの入力チェック**<br>
- 保存形式に沿っている入力か
- 不正な値を入力させず正しい値を入力させる
- データベース管理セキュリティ強化
- 値をチェックする機能
- 正常ならば保存、問題ならばエラー表示で再入力を促す

**Express Validator**<br>
- Express用をインストール：npm install express-validator
- 新しいデータを作成するファイルadd.ejsの設定：add.ejsでinput valueの値を変更（例：value="<%= form.name %>"）
- プログラムの修正：hello.js

**サニタイズ処理（HTMLタグデータの無効化）**<br>
- ValidationChainの後に記述(hello.jsのpostメソッド)：.escape()
- HTMLでの不正な画面表示など（例：imgタグで意図しない画像の埋め込み、JSのscriptタグで意図しない動的指示など）を防ぐ
- 不正なアクセスや読み書きを防ぐ
- タグを入力されてもエスケープコード変換という形で表示や動的指示など上書き変更されないよう品質を保つ
- 明示的命名やコメントは避けたり、モジュールや関数で実装する方法が一般的

**カスタムバリデーション**<br>
- 年齢入力フォーマットで年齢範囲を指定することも可能

## Sequelizeを使用
**データベースをORMで楽に管理するパッケージ Sequelizeをインストール**<br>
- npm install sequelize <br>
    7 packages are looking for funding<br>
    run `npm fund` for details<br>
    資金提供を呼びかけているので`npm fund`からそのサイトをチェックしてねという表示<br>
    To address all issues (including breaking changes), run:<br>
    npm audit fix --force<br>
    Run `npm audit` for details.<br>
    脆弱性があるのでnpm audit fix --forceで解消してね、詳細は`npm audit`をチェックしてねという表示
- npm audit fix --forceだけ対応してfound 0 vulnerabilitiesが脆弱性０になればOK
- package.jsonをチェック
- npm startで起動に異常がないかチェックしておく

**Sequelzieコマンドプログラムパッケージ(便利にSequelizeを使うための)　Sequelize CLIをインストール**<br>
- npm install sequelize-cli<br>
- package.jsonをチェック、npm startで起動に異常がないかチェック
- インストールに異常がなければ初期化する：npx sequelize-cli init<br>
    Sequelize CLI [Node: 18.16.1, CLI: 6.6.2, ORM: 6.35.1]<br>
    Created "config/config.json"<br>
    Successfully created models folder at "/Users/lumi/Desktop/ex-gen-app/models".<br>
    Successfully created migrations folder at "/Users/lumi/Desktop/ex-gen-app/migrations".<br>
    Successfully created seeders folder at "/Users/lumi/Desktop/ex-gen-app/seeders".<br>
    初期化成功：バージョン情報、ファイル設定生成など完了している
- **configフォルダ**：設定情報の管理。config.jsonという設定ファイルが生成される。
    - ３つの設定（development:開発中の設定、test:テスト用の設定、production:正式リリースの設定）をチェック
    - デフォルトのdatabase, dialect, storageを利用してSQLite3用に設定する（MySQL, PostgressSQLの場合はまた違う項目が必要）
    - database:database_...の部分をデータベース名に修正
    - storage:はないので、storage:データベースファイルを追加
    - dialect:sqliteに修正
- **migrationsフォルダ**：マイグレーションというデータベース変更情報などを管理するファイルを扱う。
- **modelsフォルダ**：データベースアクセスに使用する「モデル」というオブジェクトを定義するところ。デフォルトで直下にindex.jsが生成される。
- **seedersフォルダ**：シーダーという初期データを扱うためのもの。

