// app.js
// list4-15(p215)1122

// 1:モジュールのrequire
var createError = require('http-errors');        // error（エラー対処）
var express = require('express');                // express（本体）
var path = require('path');                      // path（ファイルパスを扱う）
var cookieParser = require('cookie-parser');     // cookie-parser（値変換処理系）
var logger = require('morgan');                  // logger morgan（reqログ出力系）
const session = require('express-session');      // express-session

// 2:ルーティング設定
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hello = require('./routes/hello');

// 3:Expressオブジェクトの作成と基本設定
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(logger('dev'));                                  // logger dev
app.use(express.json());                                 // express.json
//npm start時のbody-parserのwarnスルーOK ↓
app.use(express.urlencoded({ extend: false }));          // express.urlencoded
app.use(cookieParser());                                 // cookieParser
app.use(express.static(path.join(__dirname, 'public'))); // express.static path.json

// express-session set up
var session_opt = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
};
app.use(session(session_opt));

// 4:ルーティング使用
// Serve routes using routers
app.use('/', indexRouter);
app.use('users', usersRouter);
app.use('/hello', hello);

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
module.exports = app;
