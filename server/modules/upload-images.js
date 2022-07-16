const multer = require('multer');
// 引入時將 uuid 中的 v4 這個 function 改名為 uuidv4 以便識別
const { v4: uuidv4 } = require('uuid');

const extMap = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
};

function fileFilter(req, file, cb) {
    cb(null, !!extMap[file.mimetype]); // 第一個參數可以是 new Error('ERROR')
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // TODO: 資料夾需要更細部的定義方式 應該使用模板字串
        cb(null, __dirname + '/../src/imgs');
    },
    filename: function (req, file, cb) {
        const filename = uuidv4() + extMap[file.mimetype];
        cb(null, filename);
    }
});

module.exports = multer({ fileFilter, storage });
