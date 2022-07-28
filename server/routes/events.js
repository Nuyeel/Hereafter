const express = require('express');
const router = express.Router(); // 建立 router 物件
const db = require(__dirname + '/../modules/mysql2-connect'); // 建立跟資料庫連線
const dayjs = require('dayjs'); // 試用 day.js

// 引入modules裡的date-tools工具(轉換時間格式用)
// const {
// toDateString, toDatetimeString
// } = require(__dirname + '/../modules/date-tools');

// const moment = require('moment-timezone');

// 活動列表(EventList)
router.get('/', async (req, res) => {
    let output = {
        perPage: 8,
        page: 1,
        totalRows: 0,
        totalPages: 0,
        code: 0, // 辨識狀態
        error: '',
        query: {},
        rows: [],
    };

    const $sql =
        'SELECT * FROM (`npo_act` JOIN `npo_act_type` ON `npo_act`.`type_sid` = `npo_act_type`.`typesid`)  INNER JOIN `city_type` ON `npo_act`.`place_city`= `city_type`.`city_sid` LIMIT 8 ';

    // 如果只取results，會得到[[{}]]的物件，無法直接被解析。[results]可以先少一個[]
    const [results] = await db.query($sql);

    // Day.js日期轉換法
    results.forEach((value) => {
        const mo = dayjs(value.start).format('YYYY-MM-DD');
        value.start = mo;
    });

    console.log(results);
    res.json(results);
});

// 活動細項(EventDetail)
router.get('/:sid?', async (req, res) => {
    // 取得params的sid是多少
    let output = {
        params: req.params,
    };

    let eventSid = req.params.sid || '';

    const $sql =
        'SELECT * FROM (`npo_act` JOIN `npo_act_type` ON `npo_act`.`type_sid` = `npo_act_type`.`typesid`)  INNER JOIN `city_type` ON `npo_act`.`place_city`= `city_type`.`city_sid` WHERE `sid`=? ';

    const [results] = await db.query($sql, [eventSid]); //沒辦法直接代入上方 不知為何

    // Day.js日期轉換法
    results.forEach((value) => {
        const mo = dayjs(value.start).format('YYYY-MM-DD');
        value.start = mo;
    });

    console.log(results);
    res.json(results);
});

module.exports = router;
