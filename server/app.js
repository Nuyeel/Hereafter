// 錯誤處理用
const createError = require('http-errors');
// 取得並設定 .env 內的資料用
require('dotenv').config();
// 建立 Server 用
const express = require('express');
// 解析 Cookie 用
const cookieParser = require('cookie-parser');
// 建立紀錄用
// const logger = require('morgan');
// 解析 FormData 用 (需要用再在該路由 require)
// 驗證 (Content-Type: multipart/form-data) 才處理
// const multer = require('multer');
// 與資料庫連線用 (在 ./modules/mysql2-connect require)
// const mysql2 = require('mysql2');
// 驗證表單資料用 (需要用再在該路由 require)
// const Joi = require('joi');
// 發送 AJAX 用 (需要用再在該路由 require)
// const axios = require('axios');
// 加密驗證用 (需要用再在該路由 require)
// const bcryptjs = require('bcryptjs');
// 產生隨機雜湊 (hash) 字串用 (需要用再在該路由 require)
// const { v4: uuidv4 } = require('uuid');
// 驗證與轉換日期用 (需要用再在該路由 require)
// const dayjs = require('dayjs');
// 跨來源資源共用 (CORS, Cross-Origin Resource Sharing)
const cors = require('cors');
// 建立 Session 用 (若之後想改用 JWT, JSON Web Token 可以移除)
const session = require('express-session');
// 將 Session 資料存入資料庫用 (若之後不使用 Session 可以移除)
// TODO: (可取消下行註解) 使用 sessionStore 必須要啟動資料庫
// const MySQLStore = require('express-mysql-session')(session);
// 建立連線池 (Connection Pool) 用
const db = require(`${__dirname}/modules/mysql2-connect`);
// 有第二個參數時忽略第一個 使用既有的連線 (第二個參數)
// TODO: (可取消下行註解) 使用 sessionStore 必須要啟動資料庫
// const sessionStore = new MySQLStore({}, db);
// 測試: http://localhost:3500/test/session/count

const app = express();

// 路由宣告 (Declaration)
// TODO: 組員新增路由 Step 1. 創建檔案並進行路由宣告  
const testRouter = require(`${__dirname}/routes/test`);

// 設定路由比對時重視大小寫
app.set('case sensitive routing', true);

// 建立開發紀錄
// app.use(logger('dev'));

// ============================================================
// Top-level Middlewares Start Here
// ============================================================

// CORS
// 使用白名單 (whitelist) 的使用方式 (需使用 Cookies 和 Session 時)
const whitelist = require(`${__dirname}/src/data/whitelist`);
whitelist.push(undefined); // 未經過 AJAX 時 origin 是 undefined
const corsOptions = {
    // 總是接受 cookie
    credentials: true,
    origin: (origin, callback) => {
        // console.log('origin: ', origin);
        if (whitelist.indexOf(origin) !== -1) {
            // true: 將 origin 傳給 Access-Control-Allow-Origin
            callback(null, true); 
        } else {
            callback(new Error('Not Allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions));

// 設定 express-session (若之後不使用 Session 的話可以移除)
app.use(session({
    saveUninitialized: false,
    resave: false, 
    secret: 'anythingyouwanttoencryptyoursession',
    cookie: {
        maxAge: 1800000,
    },
    // TODO: (可取消下行註解) 使用 sessionStore 必須要啟動資料庫 (會存入資料庫)
    // store: sessionStore
}))

// 解析 JSON
// 驗證 (Content-Type: application/json) 才處理
app.use(express.json());

// body-parser
// 驗證 (Content-Type: application/x-www-form-urlencoded) 才處理
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ============================================================
// Top-level Middlewares End Here
// ============================================================

// 路由管理 (重視先後順序 前者優先 只會進入一個路由)
// 用 use 接受所有方法 各種方法的不同處理在 ./routes 中的檔案定義
// TODO: 組員新增路由 Step 2. 在此進行第一層路由設定
app.use('/test', testRouter);
// TODO: 組員新增路由 Step 3. 在路由宣告的位址撰寫自己的 RESTful API

// 靜態路由 (Shinder: 最好不要超過三個 效能會不好)
// 將 '/public' 簡寫為 '/'
// 下行等同於 app.use('/', express.static(`${__dirname}/public`));
// app.use(express.static(`${__dirname}/public`));
// 前端取得資料時要精準定義 不能再前往下一層 第一個參數放 '/資料夾名稱'
app.use('/shared', express.static(`${__dirname}/src/imgs/shared`));

// catch 404 and forward to error handler
// Http Status Code 404: 倒數第二道防線
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
// Http Status Code 500: 最後一道防線 出現嚴重錯誤
app.use((err, req, res, next) => {
    // render the error page
    res.status(err.status || 500).send(err);
});

module.exports = app;
