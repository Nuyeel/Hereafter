const express = require('express');
const router = express.Router(); //建立 router 物件
const db = require(__dirname + '/../modules/mysql2-connect');
const fs = require('fs');
function isNum(v) {
    return !isNaN(v);
}
router.post('/showcase', async (req, res) => {
    const output = {
        success: false,
        error: '',
    };
    //console.log(req);
    const mid = req.body.id;
    const combinationCreate = JSON.stringify({
        basic: [1, 1, 1],
        basic_color: 0,
        body: { hand: 0, foot: 0, tale: 0, special: 0 },
        special_color: { tale: 0, special: 0 },
        face: {
            eye: 0,
            ear: 0,
            lip: 0,
            nose: 0,
            hairFront: 0,
            hairBack: 0,
            topEar: 0,
        },
        face_color: { eye: 0, nose: 0, hairFront: 0, topEar: 0 },
    });
    const combinationTextCreate = JSON.stringify({
        hand: '饅頭',
        foot: '饅頭',
        bodyColor: '粉',
        specialColor: '',
        tale: '無',
        taleColor: '',
        eye: '瞇瞇眼',
        eyeColor: '灰',
        nose: '那個人',
        noseColor: '白',
        hair: '中分+不留長',
        hairColor: '黑',
        ear: '小饅頭',
        topearColor: '',
        lip: 'kitty',
    });
    const imgCreate = 'default.png';
    const sql = `SELECT * FROM showcase WHERE member_sid = ${mid}`;
    if (isNum(mid)) {
        const [r] = await db.query(sql, []);
        if (r.length === 5) {
            console.log('Meow 資料有5筆');
            output.success = true;
            output.data = r;
            output.msg = '拉取資料成功!';
        } else {
            const sqlcreate = `INSERT INTO showcase (member_sid, avatar_created_at, combination, combinationText, img_name, price) VALUES (?, NOW(), ?, ?, ?, 300), (?, NOW(), ?, ?, ?, 300), (?, NOW(), ?, ?, ?, 300), (?, NOW(), ?, ?, ?, 300), (?, NOW(), ?, ?, ?, 300)`;
            const [rCreate] = await db.query(sqlcreate, [
                mid,
                combinationCreate,
                combinationTextCreate,
                imgCreate,
                mid,
                combinationCreate,
                combinationTextCreate,
                imgCreate,
                mid,
                combinationCreate,
                combinationTextCreate,
                imgCreate,
                mid,
                combinationCreate,
                combinationTextCreate,
                imgCreate,
                mid,
                combinationCreate,
                combinationTextCreate,
                imgCreate,
            ]);
            const [rsec] = await db.query(sql, []);

            console.log('Meow 資料數量不對 建立5筆資料');
            output.success = true;
            output.data = rsec;
            output.msg = '初次建立資料!';
        }
    }
    output.msg = '未登入會員';
    res.json(output);
});
//MING:拉取單筆訂單詳細資料的東東還沒寫
router.post('/getAvatarData', async (req, res) => {
    const output = {
        success: false,
        error: true,
        msg: '',
    };
    //MING:送進來的會員編號及形象編號
    const mid = req.body.id;
    const aid = req.body.avatar_id;
    //MING:驗證機制 該訂單是否為該會員的形象
    const sqlVerify = `SELECT * FROM showcase WHERE avatar_id = ${aid};`;

    if (isNum(aid) && isNum(mid)) {
        const [rVerify] = await db.query(sqlVerify, []);
        if (rVerify[0].member_sid === mid) {
            const sql = `SELECT * FROM showcase WHERE avatar_id =${aid}`;
            const [r] = await db.query(sql, []);
            output.success = true;
            output.data = r;
        } else {
            output.msg = '這筆訂單不是你的';
        }
    } else {
        output.msg = '未登入或訂單不存在';
    }

    res.json(output);
});
router.post('/update', async (req, res) => {
    const output = {
        success: false,
        error: '',
        msg: '',
    };
    //console.log(JSON.stringify(req.body));
    //MING:送進來的訂單資料
    const mid = req.body.id;
    const aid = req.body.avatar_id;
    const combination = JSON.stringify(req.body.combination);
    const combinationText = JSON.stringify(req.body.combinationText);
    const imgName = `avatar${aid}.png`;
    const totalPrice = req.body.totalPrice;

    //MING:驗證機制 該訂單是否為該會員的形象
    const sqlVerify = `SELECT * FROM showcase WHERE avatar_id = ${aid};`;

    if (isNum(aid) && isNum(mid)) {
        const [rVerify] = await db.query(sqlVerify, []);
        if (rVerify[0].member_sid === mid) {
            const sql = `UPDATE showcase SET avatar_created_at=NOW(), combination=?, combinationText=?, img_name=?, price=? WHERE avatar_id =${aid}`;
            const [r] = await db.query(sql, [
                combination,
                combinationText,
                imgName,
                totalPrice,
            ]);
            if (r.affectedRows) {
                const data = req.body.img.replace(
                    /^data:image\/\w+;base64,/,
                    ''
                );
                const dir = __dirname + '/../public/uploads/images/avatar/';
                //TODO:檔名還沒取好

                if (!fs.existsSync(dir)) {
                    fs.promises.mkdir(dir, (err) => {
                        if (err) {
                            console.log(`mkdir ${dir} file failed~`);
                        } else {
                            console.log(`mkdir ${dir} file success~`);
                        }
                    });
                    fs.promises.writeFile(
                        __dirname +
                            '/../public/uploads/images/avatar/' +
                            imgName,
                        data,
                        'base64'
                    );
                    output.success = true;
                    output.msg = '重新建立目錄後儲存成功';
                } else {
                    fs.promises.writeFile(
                        __dirname +
                            '/../public/uploads/images/avatar/' +
                            imgName,
                        data,
                        'base64'
                    );
                    output.success = true;
                    output.msg = '儲存成功';
                }
            }
        } else {
            output.error = true;
            output.msg = '不是你的訂單';
        }
    } else {
        output.msg = '未登入或訂單不存在';
    }
    res.json(output);
});

module.exports = router;
