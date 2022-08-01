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

router.route('/login').post(async (req, res) => {
    const output = {
        code: 200,
        success: false,
        error: '',
        data: {},
    };

    // 會員登入表格資料
    // req.body.account = 'HappyCat01';
    // req.body.password = 'HappyCat01';

    // 因為密碼的 hash 不是靠 PHP 生成了
    // FIXME: 目前我只自行更動了 sid: 1 的 password hash
    const $sql = ` SELECT * FROM member WHERE account = ? `;
    const [result] = await db.query($sql, [req.body.account]);

    if (!result.length) {
        // 不存在該會員或帳號打字錯誤
        output.code = 401;
        output.error = '該會員不存在';
        return res.json(output);
    }

    if (!req.body.password) {
        output.code = 401;
        output.error = '請輸入密碼';
        return res.json(output);
    }

    // result 是一個陣列 裏面只有一個物件 下行是為了取得物件
    const row = result[0];
    // TODO: 可以考慮修改資料表欄位名稱 password => pass_hash
    output.success = await bcryptjs.compare(req.body.password, row.password);

    if (!output.success) {
        // 密碼錯誤 (密碼加密驗證失敗)
        output.code = 401;
        output.error = '密碼錯誤';
        return res.json(output);
    } else {
        // 帳號密碼都對
        // 這張表中的 sid 是 JWT 流水號 所以要改成用 member_sid
        // 先把舊的 token 表資料整筆刪掉
        const $del_sql = ' DELETE FROM `admin_test_jwt` WHERE member_sid = ? ';
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

        return res.json(output);
    }
});

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member
// router.route('/').get(async (req, res) => {
// 進行某動作...
// });

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member/login
// router.route('/login').get(async (req, res) => {
// 進行某動作... (登入)
// });

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member/login
// router.route('/logout').get(async (req, res) => {
// 進行某動作... (登出)
// });

// 輸出 router 這個 Middleware (Function)
module.exports = router;
