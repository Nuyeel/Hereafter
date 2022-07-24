// 只要曾經 require 過就取得原本的參照 (Reference)
const express = require('express');

// 建立 Router 物件
const router = express.Router();

// 測試 multer 用
// const multer = require('multer');
// const upload = multer({dest: 'tmp-uploads'});
const upload = require(`${__dirname}/../modules/upload-images`);

// 測試 dayjs 用
const dayjs = require('dayjs');
// 啟用嚴格的日期格式檢查 避免 2022-02-29 被解析成 2022-03-01
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
// 現在也支援時區轉換功能了
// const timezone = require('dayjs/plugin/timezone');

// 測試 mysql2 用
const db = require(`${__dirname}/../modules/mysql2-connect`);

// 測試 joi 用
const Joi = require('joi');

// 測試 AJAX 用
const axios = require('axios');

// 測試 JWT 用
const jwt = require('jsonwebtoken');

// 路由管理
// 測試: http://localhost:3500/test
router
    .route('/')
    .get((req, res) => {
        // do something for GET
        // ex.
        res.json({ method: 'GET', query: req.query });
    })
    .post(upload.single('image'), (req, res) => {
        // upload.single('image') 只有在 Content-Type
        // 是 multipart/form-data 時才會處理
        // 否則會任由資料經過而不作改動
        // do something for POST
        // ex.
        res.json({ method: 'POST', body: req.body });
    });

// 測試: http://localhost:3500/test/rocknroll
router.route('/:musictype').get((req, res) => {
    // do something for GET
    // ex.
    res.json({ musictype: req.params });
});

// 做 express-session 測試用
// 測試: http://localhost:3500/test/session/count
router.route('/session/count').get((req, res) => {
    req.session.count = req.session.count || 0;
    req.session.count++;
    res.json({
        count: req.session.count,
        session: req.session,
    });
});
// 測試: http://localhost:3500/test/session/delete-count
router.route('/session/delete-count').get((req, res) => {
    delete req.session.count;
    res.send('刪除 session.count 了');
});

// 暫時無法以 AJAX 取得 JSON 資料
// 或是伺服器主機有定時從第三方 API 取得並存下的資料時的取用方式
// 測試: http://localhost:3500/test/data/json
router.route('/data/json').get((req, res) => {
    const data = require(`${__dirname}/../src/data/test.json`);
    // console.log(data);
    res.json(data);
});

// 做 dayjs 的測試
// 測試: http://localhost:3500/test/time/dayjs
router.route('/time/dayjs').get((req, res) => {
    // fm for Format
    const fm = 'YYYY-MM-DD';
    // m for Moment
    const m1 = dayjs();
    // true 代表啟用嚴格檢查 (strict validation)
    const m2 = dayjs('2022-02-28', fm, true);
    const m3 = dayjs('2022-02-55', fm, true);

    res.json({
        moment1: m1.format(fm),
        moment1validation: m1.isValid(),
        moment2: m2.format(fm),
        moment2validation: m2.isValid(),
        moment3: m3.format(fm),
        moment3validation: m3.isValid(),
    });
});

// 做 mysql2 的測試
// 測試: http://localhost:3500/test/database/mysql2
// 與資料庫連線的部分最好都要用做錯誤處理
// callback function 用第一個參數做錯誤先行
// Promise 用 try/catch 做錯誤處理
// 'SELECT * FROM `address_book` LIMIT 5'
router.route('/database/mysql2').get(async (req, res) => {
    // TODO: try/catch 錯誤處理新增完成 (2022/07/18)
    try {
        const [results, fields] = await db.query(
            'SELECT * FROM `share_avatar_posts` LIMIT 5'
        );

        // 印出搜尋結果陣列
        // console.log(results);

        // 印出此陣列中的欄位名稱
        fields.forEach((value) => {
            console.log(value.name);
        });
        // 實務上要 return 資料但這裡只是測試
        // 因為沒有回傳所以...
        // process.exit(); // 結束行程
        // 將會關閉 Node.js 的行程 也就是關閉伺服器
        res.json(results);
    } catch (error) {
        console.log('db error occurred: ', error);
        return error;
    }
});

// 做 joi 的測試
// 測試: http://localhost:3500/test/formvalidation/joi
// 請使用 Postman 進行測試
// 使用了 multer 作為 Middleware
// 所以可以用 POST 方法送 form-data 或 x-www-form-urlencoded 測試
router.route('/formvalidation/joi').post(upload.array(), (req, res) => {
    // schema 是結構的意思
    // 這個 object 的 key 是表單欄位的名稱
    const schema = Joi.object({
        name: Joi.string().min(3).required().label('姓名*'),
        email: Joi.string().email().required(),
        // 手機只驗證是字串不夠嚴謹 可以前端稍微處理過再送出資料
        mobile: Joi.string(),
        birthday: Joi.string().allow(null, ''),
        // 地址只驗證是字串不夠嚴謹 可以前端稍微處理過再送出資料
        address: Joi.string(),
    });

    // {abortEarly: false} 驗證所有欄位
    // 預設為 true 所以找到一個不符合的欄位就會終止驗證
    res.json(schema.validate(req.body, { abortEarly: false }));
});

// 做 axios 的測試
// 測試: http://localhost:3500/test/ajax/axios/yahoo
router.route('/ajax/axios/yahoo').get((req, res) => {
    axios.get('https://tw.yahoo.com').then((response) => {
        // console.log(response);
        res.send(response.data);
    });
});

// 做 axios 取得第三方 API 的範例
// 大專時如果要即時呈現從前端 React 那邊去送 AJAX 就可以
// 但像天氣觀測資料這種資料 我們可能會希望每隔一段時間就去要資料存在資料庫中
// 畢竟官方可能也是每隔一段時間才更新資料
// cwb for Central Weather Bureau 中央氣象局
// Authorization 是授權碼
// 測試: http://localhost:3500/test/ajax/axios/cwb
router.route('/ajax/axios/cwb').get((req, res) => {
    // 將中文字轉成 unicode 做跳脫 (escape)
    // Server 盡量不要有中文字
    const city = encodeURI('臺北');

    axios
        .get(
            `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-E2349193-68E5-4124-B14D-C0226B44B958&locationName=${city}`
        )
        .then((response) => {
            // 這裡只做到取得資料 沒有存入資料庫
            res.send(response.data);
        });
});

// 提供測試用的 JWT 登入登出路由
// 測試: http://localhost:3500/test/member/login
router.route('/member/login').get(async (req, res) => {
    const sid = 1;
    const account = 'HappyCat01';
    // const password = 'HappyCat01';

    // 因為密碼的 hash 不是靠 PHP 生成了
    // 所以這裡我沒有去驗證 畢竟密碼資料可能要改成用 bcryptjs 生出來
    const $sql = ` SELECT * FROM member WHERE sid = ? AND account = ? `;
    const [results] = await db.query($sql, [sid, account]);

    // 如果存在該會員的話 (陣列存在且長度不為零)
    if (results && results.length !== 0) {
        // 這張表中的 sid 是 JWT 流水號 所以要改成用 member_sid
        const $sql = ` SELECT COUNT(*) FROM admin_test_jwt WHERE member_sid = ${sid} `;
        // 解構賦值同時改名
        const [[{ 'COUNT(*)': resultRow }]] = await db.query($sql);

        // 如果這名會員沒有 token 就簽署一個給他
        if (resultRow === 0) {
            const jwtPayload = {
                id: sid,
                account: account,
                // 可以裝更多東西 看心情
                // 不過最好不要太大
                // FIXME: 目前測試表轉成 JSON 後最大長度是 255
            };

            const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

            // 然後將之寫入資料表中
            const $sql =
                'INSERT INTO `admin_test_jwt`(`member_sid`, `token`, `expires`, `payload`) VALUES (?, ?, ?, ?)';

            await db.execute($sql, [
                sid,
                token,
                // 用 JavaScript 當前毫秒數 + 20 分鐘存入
                Date.now() + 1200000,
                JSON.stringify(jwtPayload),
            ]);
        } else {
            // 如果這個會員已經有 token 的話
            // 延長其有效時間
            const $sql = ' UPDATE `admin_test_jwt` SET `expires` = ? ';

            await db.execute($sql, [Date.now()]);
        }

        // TODO: 存在該會員而且新增或修改了 token 後要傳回前端
        // 只是筆記 不想找了
        // jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        //     if (error) {
        //         console.log({error});
        //         // 解密失敗時會印出:
        //         // JsonWebTokenError: invalid signature
        //     }
        //     console.log(decoded);
        //     // case 1. 解密成功
        //     // { id:12, account: 'shin', iat:1658301747 }
        //     // case 2. 解密失敗
        //     // undefined
        //     process.exit();
        // })
    }
    res.json(results);
});

// 輸出 router 這個 Middleware (Function)
module.exports = router;
