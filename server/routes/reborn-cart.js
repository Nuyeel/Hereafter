const express = require('express');
const db = require(`${__dirname}/../modules/mysql2-connect`);
const router = express.Router();

const SqlString = require('sqlstring');

// place_in_cart
const getPlaceInCart = async (member) => {
    const sql = `SELECT * FROM place_in_cart pc
    JOIN place p
    ON pc.place_sid=p.sid
    WHERE member_sid=? 
    ORDER BY pc.created_at`;

    const formatSql = SqlString.format(sql, [member]);
    console.log(formatSql);

    // const member = req.body; // TODO: 怎麼拿到member_sid??

    const [r] = await db.query(sql, [member]);
    return r;
};

// CRUD
// 從列表或收藏加入會員的購物車
router.post('/', async (req, res) => {
    // body: place_sid, member_sid
    const output = {
        success: false,
        error: '',
    };

    // 判斷是否在購物車
    const sql = `SELECT COUNT(1) num FROM place_in_cart WHERE place_sid=? AND member_sid=?`;
    const [[{ num }]] = await db.query(sql, [
        req.body.place_sid,
        req.body.member_sid,
    ]);
    if (num > 0) {
        output.error = '購物車已有此項商品';
        return res.json(output);
    }
    //判斷購物車是否達5筆資料上限
    const sql4 = `SELECT COUNT(1) total FROM place_in_cart WHERE member_sid=?`;
    const [[{ total }]] = await db.query(sql4, [req.body.member_sid]);
    if (total === 5) {
        output.error = '購物車已滿';
        return res.json(output);
        // 前台react提醒
    }

    if (!req.body.place_sid) {
        output.error = '參數不足';
        return res.json(output);
    }

    const sql2 = `SELECT * FROM place WHERE sid=?`;
    const [r2] = await db.query(sql2, [req.body.place_sid]);
    if (!r2.length) {
        output.error = '沒有這個良辰吉地';
        return res.json(output);
    }

    const sql3 = `INSERT INTO place_in_cart (member_sid, place_sid) VALUES (?, ?)`;

    const [r3] = await db.query(sql3, [
        req.body.member_sid,
        req.body.place_sid,
    ]);
    if (r3.affectedRows) {
        output.success = true;
    }

    output.member_cart = await getPlaceInCart(req.body.member_sid);
    res.json(output);
});

router.get('/:memberSid', async (req, res) => {
    let output = {
        rows: [],
        goodDeed: 0,
    };

    const r = await getPlaceInCart(req.params.memberSid);
    output.rows = r;

    // 會員表的陰德值
    const sql = `SELECT gooddeed_score FROM member WHERE sid=?`;
    const [[{ gooddeed_score }]] = await db.query(sql, req.params.memberSid);
    if (gooddeed_score) {
        output.goodDeed = gooddeed_score;
    }

    res.json(output);
});

// 會員將資料移出購物車
router.delete('/', async (req, res) => {
    // place_sid
    const sql = `DELETE FROM place_in_cart WHERE place_sid=? AND member_sid=?`;
    await db.query(sql, [req.body.place_sid, req.body.member_sid]);

    res.json(await getPlaceInCart(req.body.member_sid));
});

// 送出轉生訂單
router.post('/reborn-order', async (req, res) => {
    // place_sid, member_sid, avatar_id
    const output = {
        success: false,
        error: '',
    };

    // 判斷是否已有訂單
    const sqlCheck = `SELECT COUNT(1) num FROM reborn_order WHERE member_sid=?`;
    const [[{ num }]] = await db.query(sqlCheck, [req.body.member_sid]);
    if (num > 0) {
        output.error = '已有轉生訂單';
        return res.json(output);
    }

    // 判斷是否還有名額
    const sqlCheck2 = `SELECT * FROM place WHERE sid=?`;
    const [[row2]] = await db.query(sqlCheck2, [req.body.place_sid]);
    if (row2.quota <= row2.booked) {
        output.error = '目前此良辰吉地名額不足';
        return res.json(output);
    }

    const sql = `INSERT INTO reborn_order (
        member_sid, avatar_id, place_sid
        ) VALUES (
            ?,?,?)`;
    const [r] = await db.query(sql, [
        req.body.member_sid,
        req.body.avatar_id,
        req.body.place_sid,
    ]);

    if (r.affectedRows) {
        output.success = true;
    }

    res.json(output);
});

module.exports = router;
