const express = require('express');
const router = express.Router();
const db = require(`${__dirname}/../modules/mysql2-connect`);

// 專用處理 sql 字串的工具，主要 format 與 escape
const SqlString = require('sqlstring');

router.route('/').post(async (req, res) => {
    let output = {
        cubeCreateResult: false
    };

    if (!res.locals.loginUser) {
        return res.send('請先登入');
    }

    // console.log(req.body);

    if (!req.body.nextLifeTextareaString) {
        return res.send('請勿讓一生成空');
    }

    const nextLifeTextareaStrEscaped = SqlString.escape(
        req.body.nextLifeTextareaString
    );

    if (nextLifeTextareaStrEscaped.indexOf('\\') !== -1) {
        console.log('nextLifeTextareaString 被跳脫了');
        return res.json('跳脫');
    }

    const $cube_create_sql = `
        INSERT 
        INTO cube ( 
            member_sid, 
            cube_text, 
            cube_style_sid 
        ) VALUES (
            ${res.locals.loginUser.id}, 
            '${req.body.nextLifeTextareaString}',
            ${req.body.cubeStyleID}
        ) 
    `;

    const [cube_create_result] = await db.query($cube_create_sql);
    // console.log(cube_create_result);
    if (cube_create_result.affectedRows !== 0) {
        output.cubeCreateResult = true;
    }

    res.json(output);
});

module.exports = router;
