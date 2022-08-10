const express = require('express');
const db = require(`${__dirname}/../modules/mysql2-connect`);
const router = express.Router();

const SqlString = require('sqlstring');

// ----------------------------------------------------
// 取得陰德值
const getGooddeed = async (member_sid) => {
    const sql = `SELECT gooddeed_score FROM member 
    WHERE sid=? `;
    const [r] = await db.query(sql, [member_sid]);
    console.log(r);
    return r;
};
const giveGooddeed = async (member_sid) => {
    const sql = ` UPDATE member SET gooddeed_score=? WHERE sid=? `;
    const randomScore = 9000 + Math.floor(Math.random() * 3000);
    const [r] = await db.execute(sql, [randomScore, member_sid]);
    console.log(r);
    return { result: r, randomScore: randomScore };
};

// CRUD
router.get('/', async (req, res) => {
    const result = await getGooddeed(res.locals.loginUser.id);
    res.json(result);

    // res.json(await getGooddeed(req.params.memberSid));
});

router.post('/', async (req, res) => {
    const result = await giveGooddeed(res.locals.loginUser.id);
    res.json(result);
});
module.exports = router;
