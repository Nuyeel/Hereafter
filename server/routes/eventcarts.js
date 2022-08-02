const express = require('express');
const router = express.Router(); //建立 router 物件
const db = require(__dirname + '/../modules/mysql2-connect'); // 建立跟資料庫連線
const dayjs = require('dayjs'); // day.js
const upload = require(__dirname + '/../modules/upload-images'); // 處理formdata資料用

// 把獲得購物車清單的function 獨立寫
const getUserCart = async (member_sid) => {
    const sql = ` SELECT * FROM event_cart 
    JOIN npo_act ON event_cart.event_sid = npo_act.sid
    WHERE member_sid = ?  
    ORDER BY event_cart.created_at `;

    const [r] = await db.query(sql, [member_sid]);

    // Day.js日期轉換法
    r.forEach((value) => {
        const mo = dayjs(value.start).format('YYYY-MM-DD');
        value.start = mo;
    });

    return r; //應該會獲得一個array
};

// 新增商品至購物車
router.post('/addcart', async (req, res) => {
    //從body取得：商品sid 會員sid NOW()
    const output = {
        success: false,
        error: '',
    };

    if (!req.body.event_sid) {
        output.error = '沒有商品sid';
        return res.json(output);
    }

    const sql = 'SELECT * FROM `npo_act` WHERE sid=? ';

    // 取得第一個結果(r1)
    const [r1] = await db.query(sql, [req.body.event_sid]);
    if (!r1.length) {
        output.error = '沒有這個商品';
        return res.json(output);
    }

    const sql2 =
        'INSERT INTO `event_cart` ( `event_sid` ,  `member_sid` , `created_at` ) VALUES ( ?, ?, NOW() )';
    const [r2] = await db.query(sql2, [
        req.body.event_sid,
        req.body.member_sid,
    ]);

    if (r2.affectedRows) {
        //用來確定是否真的有INSERT至購物車資料表
        output.success = true;
    }

    res.json(output); //回傳檢查資訊or錯誤訊息
});

// 新增「確定結帳」訂單至MySQL
router.post('/addorder', async (req, res) => {
    const output = {
        success: false,
        error: '',
    };

    console.log(res.locals.loginUser);

    const sql =
        'INSERT INTO `event_order_detail`( `member_sid`, `event_order_detail`, `order_created_at`) VALUES ( ?, ?, NOW() )';

    const [r] = await db.query(sql, [
        req.body.member_sid,
        req.body.event_order_detail,
    ]);

    if (r.affectedRows) {
        //用來確定是否真的有INSERT至購物車資料表
        output.success = true;
    }

    res.json(output); //回傳檢查資訊or錯誤訊息
});

// 呈現購物車清單
router.get('/showcart', async (req, res) => {
    res.json(await getUserCart(req.query.member_sid)); //回傳格式為JSON
});

// 修改購物車內容(修改數量)
router.put('/', async (req, res) => {
    //商品sid 會員sid NOW()
});

// 在購物車按下"X",MySQL購物車資料同步刪除
// DELETE FROM `event_cart` WHERE event_sid = 106 AND member_sid = 100;
router.delete('/deletecart', async (req, res) => {
    const sql =
        'DELETE FROM `event_cart` WHERE event_sid = ? AND member_sid = ?';
    await db.query(sql, [req.body.event_sid, req.body.member_sid]);

    res.json(await req.body.member_sid);
});

// 新增報名資料
router.post('/person', upload.none(), async (req, res) => {
    const sql =
        'INSERT INTO `event_cart_personinfo`(`member_sid`, `name`,`mobile_city`, `mobile`, `email`,`gender`,`ID`, `birthday`,`add_city`, `add_town`, `add_detail`, `info_created_at`) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
    const {
        member_sid,
        fullname,
        mobile_city,
        mobile,
        email,
        gender,
        ID,
        birthday,
        add_city,
        add_town,
        address,
    } = req.body;
    const [result] = await db.query(sql, [
        member_sid,
        fullname,
        mobile_city,
        mobile,
        email,
        gender,
        ID,
        birthday,
        add_city,
        add_town,
        address,
    ]);

    res.json(req.body);
});

// 信用卡資料
// 一訂要加upload.none() ... 不然資料無法解析
router.post('/creditcard', upload.none(), async (req, res) => {
    const sql =
        'INSERT INTO `event_cart_creditcard`(`member_sid`, `cardnumber`, `cardholder`, `ex_month`, `ex_year`, `cvv`, `credit_created_at`) VALUES (?,?,?,?,?,?, NOW())';
    const { member_sid, cardnumber, cardholder, ex_month, ex_year, cvv } =
        req.body;
    const [result] = await db.query(sql, [
        member_sid,
        cardnumber,
        cardholder,
        ex_month,
        ex_year,
        cvv,
    ]);

    res.json(req.body);
});

module.exports = router;
