const express = require('express');
const db = require(`${__dirname}/../modules/mysql2-connect`);
const router = express.Router();

const getPlaceData = async (req, res) => {
    let output = {
        page: 1,
        // perPage: 10,
        totalRows: 0,
        // totalPage: 0,
        error: '',
        rows: [],
    };

    let page = +req.query.page || 1;
    if (page < 1) {
        output.code = 410;
        output.error = '頁碼太小';
        return output;
    }

    const sql01 = `SELECT COUNT(1) totalRows FROM place WHERE 1`;
    const [[{ totalRows }]] = await db.query(sql01);
    if (totalRows) {
        const sql02 = `SELECT * FROM place WHERE 1 ORDER BY year, month ASC`;
        const [r2] = await db.query(sql02);
        output.rows = r2;
    }

    output = { ...output, page, totalRows };
    return output;
};

router.get('/', async (req, res) => {
    const output = await getPlaceData(req, res);
    res.json(output);
});

// 連動的下拉選單資料
router.get('/country-city', async (req, res) => {
    const sql01 = `SELECT * FROM place_country_list WHERE 1`;
    const sql02 = `SELECT * FROM place_city WHERE 1`;
    const [r1] = await db.query(sql01);
    const [r2] = await db.query(sql02);

    const output = { country: r1, countryCity: r2 };
    res.json(output);
});

// 拿會員收藏的資料
router.get('/liked/:memberSid', async (req, res) => {
    const sql = `SELECT * FROM place_liked pl 
    JOIN place p
    ON pl.place_sid=p.sid
    WHERE member_sid=?
    ORDER BY pl.created_at`;

    const [r] = await db.query(sql, [req.params.memberSid]);
    res.json(r);
});

// 會員加入收藏
router.post('/liked', async (req, res) => {
    // body: place_sid, member_sid
    const output = {
        success: false,
        error: '',
    };

    // 判斷是否在收藏清單
    const sql = `SELECT COUNT(1) num FROM place_liked WHERE place_sid=? AND member_sid=?`;
    const [[{ num }]] = await db.query(sql, [
        req.body.place_sid,
        req.body.member_sid,
    ]);
    if (num > 0) {
        output.error = '收藏中已有此項商品';
        return res.json(output);
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

    const sql3 = `INSERT INTO place_liked (member_sid, place_sid) VALUES (?, ?)`;

    const [r3] = await db.query(sql3, [
        req.body.member_sid,
        req.body.place_sid,
    ]);
    if (r3.affectedRows) {
        output.success = true;
    }

    res.json(output);
});

// TODO: 會員刪除收藏
router.delete('/liked', async (req, res) => {
    // place_sid
    const sql = `DELETE FROM place_liked WHERE place_sid=? AND member_sid=?`;
    const [r] = await db.query(sql, [req.body.place_sid, req.body.member_sid]);

    if (r.affectedRows) {
        res.json('成功移除');
    } else {
        res.json('失敗');
    }
});

module.exports = router;
