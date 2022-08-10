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
// 建立連線池 (Connection Pool) 用
// const db = require(`${__dirname}/modules/mysql2-connect`);
// 有第二個參數時忽略第一個 使用既有的連線 (第二個參數)
// ex.
// const sessionStore = new MySQLStore({}, db);
// 測試: http://localhost:3500/test/session/count
// 使用 JWT 用
const jwt = require('jsonwebtoken');

const app = express();

// 路由宣告 (Declaration)
// TODO: 組員新增路由 Step 1. 創建檔案並進行路由宣告
const testRouter = require(`${__dirname}/routes/test`);
const memberRouter = require(`${__dirname}/routes/member`);
const sharewallRouter = require(`${__dirname}/routes/sharewall`);
const placeRouter = require(`${__dirname}/routes/place`);
const rebornRouter = require(`${__dirname}/routes/reborn-cart`);
const eventsRouter = require(`${__dirname}/routes/events`);
const eventcartsRouter = require(`${__dirname}/routes/eventcarts`);
const avatarRouter = require(`${__dirname}/routes/avatar`);
const gooddeedRouter = require(`${__dirname}/routes/gooddeed`);

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
// FIXME: JSON 中有一 key-value pairs 為空可以自動成為 undefined?
whitelist.push(undefined); // 未經過 AJAX 時 origin 是 undefined

// 優雅寫法比較嚴謹 (注意 Authorization for JWT)
// const corsOptions = {
//     credentials: true,
//     origin: 'http://localhost:3000',
//     methods: 'GET,PUT,POST,DELETE,OPTIONS',
//     allowedHeaders:
//         'Origin,X-Requested-With,Content-Type,Accept,x-token,Authorization',
// };

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
    },
};
app.use(cors(corsOptions));

// 設定 express-session (若之後不使用 Session 的話可以移除)
// app.use(
// session({
// saveUninitialized: false,
// resave: false,
// secret: 'anythingyouwanttoencryptyoursession',
// cookie: {
// maxAge: 1800000,
// },
// TODO: (可取消下行註解) 使用 sessionStore 必須要啟動資料庫 (會存入資料庫)
// store: sessionStore
// })
// );

// 解析 JSON
// 驗證 (Content-Type: application/json) 才處理
app.use(express.json());

// body-parser
// 驗證 (Content-Type: application/x-www-form-urlencoded) 才處理
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 處理 JWT
app.use((req, res, next) => {
    // request 的 get 方法可以取得 headers 的資料
    const auth = req.get('Authorization');

    // 預設值
    res.locals.loginUser = null;

    // 利用 locals 將資料傳給後續的 Middleware 使用
    // FIXME: JsonWebTokenError: jwt malformed
    if (auth && auth.indexOf('Bearer ') === 0) {
        const token = auth.slice(7);
        // DONE:由於前端的 AuthContext 對 token 的預設值是 ''
        // 在登入攸關的驗證我們又一定會送 Authorization
        // 導致以下 JWT 驗證可能出錯
        // 所以此處必須做錯誤處理
        try {
            res.locals.loginUser = jwt.verify(token, process.env.JWT_SECRET);
            console.log(res.locals.loginUser);
        } catch (ex) {
            console.log('狀態：瀏覽者並未登入');
            console.log(res.locals.loginUser);
        }
        // console.log(res.locals.loginUser);
    }
    // TODO: 所以之後 "如果這個頁面要登入才能使用"
    // 每次發送 AJAX 都要像這樣
    // const r = await axios(`${AB_LIST_AUTH_GET}?page=${gotoPage}`, {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // });
    // 在 headers 中塞入 token
    // token 會從 AuthContext 中取得
    // 後續的路由可以利用 res.locals.loginUser 取得資料
    // { id: 1, account: 'HappyCat01', iat: 1658734804 }

    // 呼叫後續的 Middleware
    next();
});

// ============================================================
// Top-level Middlewares End Here
// ============================================================

// 路由管理 (重視先後順序 前者優先 只會進入一個路由)
// 用 use 接受所有方法 各種方法的不同處理在 ./routes 中的檔案定義
// FIXME: 目前寫了一個測試用的 JWT 登入 (只是方便測試用)
// 資料表的名稱是 admin_test_jwt 之後再看余昕想要怎麼寫
// TODO: 組員新增路由 Step 2. 在此進行第一層路由設定
app.use('/test', testRouter);
app.use('/api/member', memberRouter);
app.use('/api/sharewall', sharewallRouter);
// TODO: 組員新增路由 Step 3. 在路由宣告的位址撰寫自己的 RESTful API

// 二路 - 活動頁面路由
app.use('/events', eventsRouter);
// 二路 - 活動購物車路由
app.use('/eventcarts', eventcartsRouter);

// 良辰吉地
app.use('/api/place', placeRouter);
// 轉生購物車
app.use('/api/reborn-cart', rebornRouter);

//來生形象更新
app.use('/avatar', avatarRouter);

// 靜態路由 (Shinder: 最好不要超過三個 效能會不好)
// 將 '/public' 簡寫為 '/'
// 下行等同於 app.use('/', express.static(`${__dirname}/public`));
// app.use(express.static(`${__dirname}/public`));
// 前端取得資料時要精準定義 不能再前往下一層
// 第一個參數放 '/uploads/檔案類別/資料夾名稱'
// 這是為了從路由判斷這些是使用者上傳的檔案 (怕和其他 routes 中的路由衝突)
app.use(
    '/uploads/images/share',
    express.static(`${__dirname}/public/uploads/images/share`)
);

app.use(
    '/uploads/images/avatar',
    express.static(`${__dirname}/public/uploads/images/avatar`)
);

app.use('/api/gooddeed', gooddeedRouter);

// catch 404 and forward to error handler
// Http Status Code 404: 倒數第二道防線
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
// Http Status Code 500: 最後一道防線 出現嚴重錯誤
// app.use((err, req, res, next) => { ... }
app.use((err, req, res) => {
    // render the error page
    // res.status(err.status || 500).send(err);
    res.json({
        error: {
            code: err.status || 500,
            message: err.message,
        },
    });
});

module.exports = app;
