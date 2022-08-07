const express = require('express');
const db = require(`${__dirname}/../modules/mysql2-connect`);
const router = express.Router();

const SqlString = require('sqlstring');


// ----------------------------------------------------
// 取得陰德值
const getGooddeed = async (member_sid) => {
    const sql = `SELECT gooddeed_score FROM member 
    WHERE sid=? `;
    const [r] = await db.query(sql,[member_sid]);

    return r;
};

// CRUD
router.post('/')
router.get('/', async (req, res) => {
    res.json(await getGooddeed(req.params.memberSid));
});


module.exports = router;
