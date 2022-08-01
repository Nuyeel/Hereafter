const express = require('express');
const db = require(`${__dirname}/../modules/mysql2-connect`);
const router = express.Router();

const SqlString = require('sqlstring');

// 假會員id
const fake_member = 10;

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
        // TODO: 前台react提醒
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

    // 假設會員編號為10
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
    res.json(await getPlaceInCart(req.params.memberSid));
});

// 會員將資料移出購物車
router.delete('/', async (req, res) => {
    // place_sid
    const sql = `DELETE FROM place_in_cart WHERE place_sid=? AND member_sid=?`;
    await db.query(sql, [req.body.place_sid, req.body.member_sid]);

    res.json(await getPlaceInCart(req.body.member_sid));
});

module.exports = router;
