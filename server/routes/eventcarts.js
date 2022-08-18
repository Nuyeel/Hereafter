const express = require('express');
const router = express.Router(); //建立 router 物件
const db = require(__dirname + '/../modules/mysql2-connect'); // 建立跟資料庫連線
const dayjs = require('dayjs'); // day.js
const upload = require(__dirname + '/../modules/upload-images'); // 處理formdata資料用
const axios = require('axios'); //LinePay用
const { HmacSHA256 } = require('crypto-js'); //LinePay加密用
const Base64 = require('crypto-js/enc-base64'); //LinePay 把加密後物件轉字串
require('dotenv').config();

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
        const mo2 = value.start_time.slice(0, 5);
        value.start_time = mo2;
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

    // console.log(res.locals.loginUser);

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

    // Day.js日期轉換法
    results.forEach((value) => {
        const mo = dayjs(value.start).format('YYYY-MM-DD');
        value.start = mo;
        const mo2 = value.start_time.slice(0, 5);
        value.start_time = mo2;
    });

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

const eventDetailMember = async (sid) => {
    const sql =
        'SELECT * FROM (`npo_act` JOIN `npo_act_type` ON `npo_act`.`type_sid` = `npo_act_type`.`typesid`)  INNER JOIN `city_type` ON `npo_act`.`place_city`= `city_type`.`city_sid` WHERE `sid`= ? ';
    const [results] = await db.query(sql, [sid]);

    // Day.js日期轉換法
    const mo = dayjs(results[0].start).format('YYYY-MM-DD');
    results[0].start = mo;
    const mo2 = results[0].start_time.slice(0, 5);
    results[0].start_time = mo2;

    return results[0];
};

// 會員中心-活動訂單
router.get('/testevent/:membersid', async (req, res) => {
    let output = {
        eventHistoryResult: [],
        eventOrderDetailResult: [],
    };

    let memberSid = req.params.membersid || '';
    const $sql1 =
        'SELECT * FROM `event_order_detail` WHERE `member_sid` = ? ORDER BY `event_order_detail`.`event_order_sid` DESC';

    const [results1] = await db.query($sql1, [memberSid]);

    results1.forEach((value) => {
        const mo = dayjs(value.order_created_at).format('YYYY-MM-DD');
        value.order_created_at = mo;
    });

    results1.forEach((item) => {
        item.event_order_detail = item.event_order_detail.split(',');
        item['eventdetail'] = [];
    });

    for (let i = 0; i < results1.length; i++) {
        for (let k = 0; k < results1[i]['event_order_detail'].length; k++) {
            results1[i]['eventdetail'].push(
                await eventDetailMember(results1[i]['event_order_detail'][k])
            );
        }
    }

    // console.log(results1);
    res.json(results1);
});

// 會員中心有辦法調出會員歷屆活動報名紀錄
router.get('/memberevent/:membersid?', async (req, res) => {
    let memberSid = req.params.membersid || '';
    // console.log(memberSid);
    const $sql = 'SELECT * FROM `event_order_detail` WHERE `member_sid` = ?  ';

    const [results] = await db.query($sql, [memberSid]);
    res.json(results); //會獲得一個JSON包
});

// PersonForm時套入會員資訊
router.get('/memberinfor/:membersid?', async (req, res) => {
    let memberSid = req.params.membersid || '';
    const $sql = 'SELECT * FROM `member` WHERE `sid` = ? ';

    const [results] = await db.query($sql, [memberSid]);

    // Day.js日期轉換法
    // FIXME: 目前這邊還是壞掉的 日期沒辦法順利轉換
    const mo = dayjs(results[0].birthdate).format('YYYY-MM-DD');
    results[0].birthdate = mo;

    res.json(results); //會獲得一個JSON包
});

// 二路測試LINEPAY用----------------------------------------------

// 環境變數
const {
    LINEPAY_CHANNEL_ID,
    LINEPAY_SITE,
    LINEPAY_VERSION,
    LINEPAY_CHANNEL_SECRET_KEY,
} = process.env;

const orders = {
    1660468720: {
        amount: 1000,
        orderId: 1660468721,
        currency: 'TWD',
        packages: [
            {
                name: '六角棒棒',
                quantity: 1,
                price: 1000,
            },
        ],
    },
};

// // 顯示資訊在前端頁面用
router.get('/linepay/:id', (req, res) => {
    const { id } = req.params;
    const order = sampleData[id];
    order.orderId = parseInt(new Date().getTime() / 1000); //為訂單添加 orderId(uniq編號)
    orders[order.orderId] = order; //新增一個屬性(orderId) 內容為order
    console.log('order', order);
    console.log('orders', orders); // 'orderId' : order本人
    res.json(orders);
    console.log('測試LINE PAY用');
});

// 跟LINE PAY串接的API
router.post('/createlineorder', async (req, res) => {
    try {
        const linePayBody = req.body;
        console.log('linePayBody', linePayBody);

        // 為req.body加一些LINE PAY規定要的參數
        const uri = '/payments/request';
        const nonce = parseInt(new Date().getTime() / 1000);
        const string = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
            linePayBody
        )}${nonce}`;

        // 把組建好的string進行加密
        console.log('string', string);
        const signature = Base64.stringify(
            HmacSHA256(string, LINEPAY_CHANNEL_SECRET_KEY)
        );

        const headers = {
            'Content-Type': 'application/json; charset=UTF-8', //格式固定是JSON格式
            'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
            'X-LINE-Authorization-Nonce': nonce,
            'X-Line-Authorization': signature,
        };

        // 準備送給LINE Pay的資訊
        const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`; //對LINE Pay發出請求的路徑

        const linePayRes = await axios.post(url, linePayBody, { headers });

        console.log(linePayRes.data.info);
        console.log(linePayRes);

        if (linePayRes?.data?.returnCode === '0000') {
            res.json(linePayRes?.data?.info.paymentUrl.web);
        } else {
            res.status(400).send({
                message: '訂單不存在',
            });
        }
    } catch (error) {
        console.log(error);
        //錯誤的回饋
    }
});

module.exports = router;
