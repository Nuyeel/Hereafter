const express = require('express');
const router = express.Router(); //建立 router 物件
const db = require(__dirname + '/../modules/mysql2-connect');
const fs = require('fs');
router.get('/showcase', async (req, res) => {
    const output = {
        success: false,
        error: '',
    };
});
router.post('/update', async (req, res) => {
    const output = {
        success: false,
        error: '',
    };
    //console.log(JSON.stringify(req.body));
    const data = req.body.img.replace(/^data:image\/\w+;base64,/, '');

    //TODO:檔名還沒取好
    fs.promises.writeFile(
        __dirname + '/../public/uploads/images/avatar/avatartest.png',
        data,
        'base64'
    );
    const conbination = JSON.stringify(req.body.conbination);
    const conbinationText = JSON.stringify(req.body.conbinationText);
    const sql =
        'INSERT INTO `showcase`(`member_sid`, `avatar_created_at`, `combination`, `conbinationText`, `img_name`) VALUES ("1001", NOW(), ?, ?,"default.png")';
    const [r] = await db.query(sql, [conbination, conbinationText]);
    if (r.affectedRows) {
        //用來確定是否真的有INSERT至購物車資料表
        output.success = true;
    }

    res.json(output);
});

module.exports = router;
