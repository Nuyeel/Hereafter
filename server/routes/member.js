// 只要曾經 require 過就取得原本的參照 (Reference)
const express = require('express');

// 建立 Router 物件
const router = express.Router();

// 與資料庫連線 會建立連線池的 Promise 物件
const db = require(`${__dirname}/../modules/mysql2-connect`);

// JWT 用
const jwt = require('jsonwebtoken');

// 進行 bcrypt 加密用
const bcryptjs = require('bcryptjs');

// 傳送 AJAX 用
// const axios = require('axios');

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member
// router.route('/').get(async (req, res) => {
//     // 進行某動作...
// });

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member/login
router
    .get(async (req, res) => {
        res.render('login');
    })
    .post('/login', async (req, res) => {
        const output = {
            success: false,
            error: '',
            code: 0,
            data: {},
        };
        // console.log(req.body.account);

        const sql = 'SELECT * FROM `member` WHERE account = ?';
        const [q1] = await db.query(sql, [req.body.account]);

        if (!q1.length) {
            output.code = 405;
            output.error = '帳戶錯誤';
            return res.json(output);
        }

        if (!req.body.password) {
            output.code = 405;
            output.error = '請輸入密碼';
            return res.json(output);
        }

        const row = q1[0];

        output.success = await bcryptjs.compare(
            req.body.password,
            row.password
        );
        if (!output.success) {
            output.code = 406;
            output.error = '密碼錯誤';
            return res.json(output);
        } else {
            const $del_sql =
                ' DELETE FROM `admin_test_jwt` WHERE member_sid = ? ';
            await db.execute($del_sql, [row.sid]);

            // 開始簽署新的 token 並寫入資料表
            const jwtPayload = {
                id: row.sid,
                account: row.account,
                // 可以裝更多東西 看心情
                // 不過最好不要太大
                // FIXME: 目前測試表轉成 JSON 後資料庫中最大長度是 255
            };

            const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

            // 然後將之寫入資料表中
            const $sql =
                'INSERT INTO `admin_test_jwt`(`member_sid`, `token`, `expires`, `payload`) VALUES (?, ?, ?, ?)';

            await db.execute($sql, [
                row.sid,
                token,
                // 用 JavaScript 當前毫秒數 + 20 分鐘存入
                // TODO: 目前登入後再登出前會永遠登入
                // 沒有去驗證過不過期 但大專這樣就夠了
                Date.now() + 1200000,
                JSON.stringify(jwtPayload),
            ]);

            output.data = {
                sid: row.sid,
                token,
                account: row.account,
            };
        }
        res.json(output);
    });

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member/logout
router.route('/logout').get(async (req, res) => {
    // 進行某動作... (登出)
    // delete req.session.member;
    // res.redirect('/');
});

// 輸出 router 這個 Middleware (Function)
module.exports = router;
