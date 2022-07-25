require('dotenv').config();

const db = require(`${__dirname}/../modules/mysql2-connect.js`);
const bcryptjs = require('bcryptjs');

// 想要修改的會員資料變數
const sid = 1;
const password = 'HappyCat01';

// 將會員資料的密碼修改成新的版本
(async () => {
    const $sql = ` UPDATE member SET \`password\`=? WHERE sid = ?; `;
    const salt = bcryptjs.genSaltSync(10);
    const hash = await bcryptjs.hash(password, salt);
    await db.execute($sql, [hash, sid]);
    process.exit();
})();
