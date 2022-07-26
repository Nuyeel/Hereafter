// 與資料庫連線用
const mysql2 = require('mysql2');

// 建立連線池
// require 第二次以上都是取得參照 所以只會產生一次連線池
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// 印出來看方便開發時除錯
console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// 傳出一個 Promise Pool
module.exports = pool.promise();
