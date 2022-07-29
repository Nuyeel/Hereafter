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
        const sql02 = `SELECT * FROM place WHERE 1 ORDER BY year ASC`;
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

module.exports = router;
