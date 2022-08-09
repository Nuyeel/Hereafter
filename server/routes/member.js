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

const sqlstring = require('sqlstring');

// 傳送 AJAX 用
// const axios = require('axios');

// 測試: http://localhost:3500/api/member
// router.route('/').get(async (req, res) => {
//     // 進行某動作...
// });

// 測試: http://localhost:3500/api/member/login
// 登入
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
            output.code = 401;
            output.error = '帳戶錯誤';
            return res.json(output);
        }

        if (!req.body.password) {
            output.code = 402;
            output.error = '請輸入密碼';
            return res.json(output);
        }

        const row = q1[0];

        output.success = await bcryptjs.compare(
            req.body.password,
            row.password
        );
        if (!output.success) {
            output.code = 403;
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

            // 將之寫入資料表中
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

            // 查詢會員是否仍在人世
            // FIXME: 這是個值什麼時候變 true 應該大專就不處理了
            // DONE: 目前先將 7 號會員設定為 true
            const $isdead_sql = ` 
                SELECT isdead 
                FROM member 
                WHERE sid = ? 
            `;

            const [[{ isdead: isdead_result }]] = await db.query($isdead_sql, [
                row.sid,
            ]);

            // console.log(isdead_result);
            // console.log(typeof isdead_result); // string
            let isdead_boolean = false;
            if (isdead_result === 'true') {
                isdead_boolean = true;
            }

            output.data = {
                sid: row.sid,
                token,
                account: row.account,
                isDead: isdead_boolean,
            };
        }
        res.json(output);
    });

// 測試: http://localhost:3500/api/member/register
// 註冊
router
    .route('/register')
    .get(async (req, res) => {
        res.render('register');
    })
    .post(async (req, res) => {
        const output = {
            success: false,
            error: '',
            code: 0,
        };
        // 用query方法查詢
        const sql = 'SELECT * FROM `member` WHERE account = ?';
        const [q1] = await db.query(sql, [req.body.account]);
        // console.log(q1);
        if (q1.length > 0) {
            output.code = 405;
            output.error = '會員帳戶已存在';
            return res.json(output);
        }

        const sql2 = 'SELECT * FROM `member` WHERE email = ?';
        const [q2] = await db.query(sql2, [req.body.email]);
        if (q2.length > 0) {
            output.code = 406;
            output.error = '電子信箱已存在';
            return res.json(output);
        }

        console.log(req.body.account, req.body.email, req.body.password);
        const sql3 =
            'INSERT INTO `member`(`account`, `email`, `password`, `create_at`) VALUES (?,?,?,Now())';
        const salt = bcryptjs.genSaltSync(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        // 用execute方法執行新增資料
        const [q3] = await db.execute(sql3, [
            req.body.account,
            req.body.email,
            hash,
        ]);

        output.success = true;
        output.error = '註冊成功';

        res.json(output);
    });

// 測試: http://localhost:3500/api/member/memberprofilerevise
// 修改會員資料
router
    .route('/profilerevise')
    .get(async (req, res) => {
        // 未登入先擋掉
        if (!res.locals.loginUser) {
            return;
        }
        const output = {
            success: false,
            error: '',
            code: 0,
        };
    })
    .post(async (req, res) => {
        const output = {
            success: false,
            error: '',
            code: 0,
        };
        // 用query方法查詢
        const sql = 'SELECT * FROM `member` WHERE account = ?';
        const [q1] = await db.query(sql, [req.body.account]);
        console.log(q1);

        // const sql2 = 'SELECT * FROM `member` WHERE name = ?';
        // const [q2] = await db.query(sql2, [req.body.name]);
        // if (q2.length > 0) {
        //     output.code = 406;
        //     output.error = '會員名稱尚未修改';
        //     return res.json(output);
        // }

        // const sql3 = 'SELECT * FROM `member` WHERE birthdate = ?';
        // const [q3] = await db.query(sql3, [req.body.birthdate]);
        // if (q3.length > 0) {
        //     output.code = 406;
        //     output.error = '您的出生日尚未修改';
        //     return res.json(output);
        // }

        // const sql4 = 'SELECT * FROM `member` WHERE deathdate = ?';
        // const [q4] = await db.query(sql4, [req.body.deathdate]);
        // if (q4.length > 0) {
        //     output.code = 406;
        //     output.error = '您的死亡日尚未修改';
        //     return res.json(output);
        // }

        // const sql5 = 'SELECT * FROM `member` WHERE email = ?';
        // const [q5] = await db.query(sql5, [req.body.email]);
        // if (q5.length > 0) {
        //     output.code = 406;
        //     output.error = '電子信箱尚未修改';
        //     return res.json(output);
        // }

        //更新會員名稱
        const nameupdate = 'UPDATE `member` SET `name`=? WHERE sid=?';
        const nameupdate2 = sqlstring.format(nameupdate, [
            req.body.name,
            res.locals.loginUser.id,
        ]);
        const nameupdate3 = await db.query(nameupdate2);
        console.log(nameupdate3);

        //更新出生日
        const birthdateupdate = 'UPDATE `member` SET `birthdate`=? WHERE sid=?';
        const birthdateupdate2 = sqlstring.format(birthdateupdate, [
            req.body.birthdate,
            res.locals.loginUser.id,
        ]);
        const birthdateupdate3 = await db.query(birthdateupdate2);
        console.log(birthdateupdate3);

        //更新死亡日
        const deathdateupdate = 'UPDATE `member` SET `deathdate`=? WHERE sid=?';
        const deathdateupdate2 = sqlstring.format(deathdateupdate, [
            req.body.deathdate,
            res.locals.loginUser.id,
        ]);
        const deathdateupdate3 = await db.query(deathdateupdate2);
        console.log(deathdateupdate3);

        //更新電子信箱
        const emailupdate = 'UPDATE `member` SET `email`=? WHERE sid=?';
        const emailupdate2 = sqlstring.format(emailupdate, [
            req.body.email,
            res.locals.loginUser.id,
        ]);
        const emailupdate3 = await db.query(emailupdate2);
        console.log(emailupdate3);

        output.success = true;
        output.error = '修改成功';

        res.json(output);
    });

// 測試: http://localhost:3500/api/member/memberpasswordrevise
// 修改會員頁內的密碼
router
    .route('/profilepasswordrevise')
    .get(async (req, res) => {
        res.render('profilepasswordrevise');
    })
    .post(async (req, res) => {
        const output = {
            success: false,
            error: '',
            code: 0,
        };

        // 用query方法查詢
        const sql2 = 'SELECT * FROM `member` WHERE sid = ?';
        const [q2] = await db.query(sql2, [req.body.password]);

        if (q2.length > 0) {
            output.code = 408;
            output.error = '您的密碼未經修改';
            return res.json(output);
        }

        // const row = q2[0];

        // output.success = await bcryptjs.compare(
        //     req.body.password,
        //     row.password
        // );
        // if (!output.success) {
        //     output.code = 403;
        //     output.error = '密碼錯誤';
        //     return res.json(output);
        // }

        const sql4 = 'UPDATE `member` SET `password`=? WHERE sid=?';
        const salt = bcryptjs.genSaltSync(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        // 用execute方法執行新增資料
        const [q4] = await db.execute(sql4, [hash, res.locals.loginUser.id]);

        output.success = true;
        output.error = '密碼修改成功';

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
