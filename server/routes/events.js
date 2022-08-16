const express = require('express');
const router = express.Router(); // 建立 router 物件
const db = require(__dirname + '/../modules/mysql2-connect'); // 建立跟資料庫連線
const dayjs = require('dayjs'); // 試用 day.js

// 活動列表(EventList)
router.get('/', async (req, res) => {
    // let output = {
    //     perPage: 8,
    //     page: 1,
    //     totalRows: 0,
    //     totalPages: 0,
    //     code: 0, // 辨識狀態
    //     error: '',
    //     query: {},
    //     rows: [],
    // };

    const $sql =
        'SELECT * FROM (`npo_act` JOIN `npo_act_type` ON `npo_act`.`type_sid` = `npo_act_type`.`typesid`)  INNER JOIN `city_type` ON `npo_act`.`place_city`= `city_type`.`city_sid`  '; //原本這邊有設定LIMIT 8
    // FIXME: 這邊先設1，debug一下

    // 如果只取results，會得到[[{}]]的物件，無法直接被解析。[results]可以先少一個[]
    const [results] = await db.query($sql);

    // Day.js日期轉換法
    results.forEach((value) => {
        const mo = dayjs(value.start).format('YYYY-MM-DD');
        value.start = mo;
    });

    // console.log(results);
    res.json(results);
});

// 活動細項(EventDetail)
router.get('/:eventsid?', async (req, res) => {
    // 取得params的sid是多少
    // let output = {
    //     params: req.params,
    // };

    let eventSid = req.params.eventsid || '';

    const $sql =
        'SELECT * FROM (`npo_act` JOIN `npo_act_type` ON `npo_act`.`type_sid` = `npo_act_type`.`typesid`)  INNER JOIN `city_type` ON `npo_act`.`place_city`= `city_type`.`city_sid` WHERE `sid`=? ';

    const [results] = await db.query($sql, [eventSid]); //沒辦法直接代入上方 不知為何

    // Day.js日期轉換法
    results.forEach((value) => {
        const mo = dayjs(value.start).format('YYYY-MM-DD');
        value.start = mo;
        const me = dayjs(value.end).format('YYYY-MM-DD');
        value.end = me;
    });

    // console.log(results);
    res.json(results);
});

// TODO: 檢查使用者是否有報名過此活動 -> 影響button狀態
// router.get('/:membersid?', async (req, res) => {

// 此段處理Redux活動購物車NavBar數字
router.get('/eventcartnum/:membersid?', async (req, res) => {
    let memberSid = req.params.membersid || '';

    const $sql = 'SELECT COUNT(*) FROM `event_cart` WHERE `member_sid` = ? ';

    const [[{ 'COUNT(*)': results }]] = await db.query($sql, [memberSid]);

    // console.log('nodeJS', results);
    res.json(results);
});

// 此段處理該會員目前購物車有哪些活動sid
router.get('/checkeventcart/:membersid?', async (req, res) => {
    let memberSid = req.params.membersid || '';

    const $sql = 'SELECT `event_sid` FROM `event_cart` WHERE `member_sid` = ? ';

    // const [[{ 'COUNT(*)': results }]] = await db.query($sql, [memberSid]);
    const [results] = await db.query($sql, [memberSid]);
    res.json(results); //會獲得一個JSON包
});

// 取得評論資料 
// 為什麼這用GET拿不到資料R？
router.post('/eventcomment', async (req, res) => {
    const $sql = 'SELECT * FROM `event_comment` ';

    const [results] = await db.query($sql);
    // console.log(results);
    res.json(results); //會獲得一個JSON包
});

module.exports = router;
