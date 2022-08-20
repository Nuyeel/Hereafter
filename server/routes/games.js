const express = require('express');
const db = require(`${__dirname}/../modules/mysql2-connect`);
const router = express.Router();

const SqlString = require('sqlstring');

// ----------------------------------------------------
const giveGooddeed = async (score, id) => {
    const sql = ` UPDATE member SET gooddeed_score = gooddeed_score + ${score} WHERE sid = ? `;
    // const gameScore = 0;
    const [r] = await db.execute(sql, [id]);
    // console.log(r);

    const new_score_sql = ` SELECT gooddeed_score FROM member WHERE sid = ? `
    const [new_score_r] = await db.execute(new_score_sql, [id]);

    return { result: r, gameScore: new_score_r[0].gooddeed_score };
};

// CRUD
router.get('/', async (req, res) => {
    // const result = await giveGooddeed(res.locals.loginUser.id);
    // res.json(result);

    if (!res.locals.loginUser) {
        return res.send('login please~');
    }

    console.log('gogo', res.locals.loginUser.id);
    console.log(req.query.score);

    const score = Number(req.query.score);
    const result = await giveGooddeed(score, res.locals.loginUser.id);

    // res.json(await getGooddeed(req.params.memberSid));
    console.log(result);
    res.json(result);
});
module.exports = router;
