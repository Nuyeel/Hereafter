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

// 訂單明細(透過eventPick取得活動資料)
// router.post('/readytobuy', async (req, res) => {
//     const $sql = 'SELECT * FROM `npo_act` WHERE `sid` IN (?) ';

//     const { readytobuy } = req.body;

//     // 如果只取results，會得到[[{}]]的物件，無法直接被解析。[results]可以先少一個[]
//     const [results] = await db.query($sql, [readytobuy]);

//     console.log(results);
//     res.json(results);
// });

// 訂單明細：實驗一下GET方法
router.get('/readytobuy', async (req, res) => {
    let detailnum = req.query.detailnum || ''; //?detailnum=22,23
    const $sql = 'SELECT * FROM `npo_act` WHERE `sid` IN (?) ';

    // 如果只取results，會得到[[{}]]的物件，無法直接被解析。[results]可以先少一個[]
    const [results] = await db.query($sql, [detailnum]);

    // console.log(results);
    res.json(results);
});

// TODO: 當送出信用卡資料時，把event sid連帶從MySQL刪掉

// 有辦法用POST方法嗎？
// router.delete('/alreadypay', async (req, res) => {
//     const sql =
//         'DELETE FROM `event_cart` WHERE member_sid = ? AND  event_sid IN (?) ';
//         // DELETE FROM `event_cart` WHERE `member_sid` = 4 AND `event_sid` IN (28,30)

//     await db.query(sql, [req.body.member_sid, req.body.event_sid]);

//     res.json(await req.body.event_sid);
// });

// FIXME: 目前成功的只有GET方法 Q ___ Q
// FIXME: 我好像不會寫DELETE方法......==
router.get('/alreadypay', async (req, res) => {
    let membersid = req.query.membersid || ''; //?membersid=4
    let alreadypay = req.query.alreadypay || ''; //?alreadypay=22,23
    const $sql =
        'DELETE FROM `event_cart` WHERE member_sid = ? AND  event_sid IN (?) ';

    // 如果只取results，會得到[[{}]]的物件，無法直接被解析。[results]可以先少一個[]
    const [results] = await db.query($sql, [membersid, alreadypay]);

    // TODO: 需要回傳更多資訊，以免crash時無法debug
    res.json('已從購物車刪除');
});


// 會員中心-活動訂單
router.get('/testevent/:membersid', async (req, res) => {
    let output = {
        eventHistoryResult: [],
        eventOrderDetailResult: [],
    };

    let memberSid = req.params.membersid || '';
    const $sql1 = 'SELECT * FROM `event_order_detail` WHERE `member_sid` = ? ';

    const [results1] = await db.query($sql1, [memberSid]);

    results1.forEach((value) => {
        const mo = dayjs(value.order_created_at).format('YYYY-MM-DD');
        value.start = mo;
    });

    results1.forEach((item) => {
        item.event_order_detail = item.event_order_detail.split(',');
        item['eventdetail'] = [];
    });

    function test() {
        return new Promise((resolve, reject) => {
            results1.forEach((item, index) => {
                item.event_order_detail.forEach(async (sid) => {
                    const sql =
                        'SELECT * FROM (`npo_act` JOIN `npo_act_type` ON `npo_act`.`type_sid` = `npo_act_type`.`typesid`)  INNER JOIN `city_type` ON `npo_act`.`place_city`= `city_type`.`city_sid` WHERE `sid`= ? ';
                    const [[results]] = await db.query(sql, [sid]);

                    // Day.js日期轉換法
                    [results].forEach((value) => {
                        const mo = dayjs(value.start).format('YYYY-MM-DD');
                        value.start = mo;
                    });

                    // console.log(index);
                    console.log(results);
                    results1[index]['eventdetail'].push(results);
                    console.log(results1[index]['eventdetail']);

                    if (index === results1.length - 1) {
                        resolve();
                    }
                });
            });
        });
    }

    test().then(() => {
        console.log(results1);
        return res.json(results1);
    });
});

// 會員中心有辦法調出會員歷屆活動報名紀錄
router.get('/memberevent/:membersid?', async (req, res) => {
    let memberSid = req.params.membersid || '';
    console.log(memberSid);
    const $sql = 'SELECT * FROM `event_order_detail` WHERE `member_sid` = ? ';

    const [results] = await db.query($sql, [memberSid]);
    res.json(results); //會獲得一個JSON包
});

module.exports = router;
