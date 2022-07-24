# 寫在最前面：

    希望可以盡量保持 server/app.js 的簡潔

    建立路由管理的三步驟有用 TODO 標示在 server/app.js 中
    可以利用 TODO Highlight 這個 VSCODE 套件尋找
    這裡只是再度提醒一次：
    Step 1. 創建檔案並進行路由宣告
    Step 2. 進行第一層路由設定
    Step 3. 在路由宣告的位址撰寫自己的 RESTful API

### 後端架構 (使用 express-generator 並手動更新與刪減)：

    /server
        /bin
            www (執行檔案 其中 require('../app'))
        /modules
        /node_modules
        /public
            /uploads/images/用途名稱 (shared, events, news, avatars, ...)
        /routes
        /src
            /data (放一些可能不需要存在資料庫的東西)
                  (資料庫 sql 備份放這邊且檔名不需要更改)
        .env
        app.js
        package.json
        package-lock.json

### 使用套件一覽：

    可至 package.json 的 dependencies 中查看

### 使用套件：

#### 取得並設定 .env 內的資料用

    // npm i dotenv
    require('dotenv').config();

##### .env 相關
    
    # 註解 (Comments)
    # 不要有多餘的空格
    # 用來統一管理環境變數
    # 也可以用來管理私密資料
    
    # 不用放在版本控制中
    # 也可以有兩個 .env 檔案
    # 一個開發用 一個正式上線用
    
    # PORT 是 SERVER 的 PORT
    PORT=3500
    
    # DB_PORT 是 DATABASE 的 PORT
    # DB_PORT=3306
    
    # 補上自己開發時使用的帳號密碼及資料庫名稱
    DB_HOST=localhost
    DB_PORT=3306 
    DB_USER=myUserName
    DB_PASS=myPass
    DB_NAME=ourDatabaseName    

#### 自動重啟 Server 用

    // npm i nodemon
    // 正式上線可以考慮使用 pm2

#### 建立 Server 用

    // npm i express
    我們 Express 的 Server 只用來和資料庫建立連線
    並撰寫 API 路由 (routes) 來取得資料
    不需要有畫面 
    用 404 Not Found 攔截奇怪的訪問即可

    // Express 是一個以中介軟體 (Middleware) 為核心概念的伺服器
    // 使用大量的 Middlewares (Functions) 來對資料層層加工

    // 在 package.json scripts 處新增 "start": "nodemon server/app.js"
    // 並在根目錄新增 server/app.js

    // ./server/app.js
    // Step 1. 引入
    const express = require('express');

    // Step 2. 建立 express 物件
    const app = express();

    // Step 3. 路由
    // app. 後面接的是方法 (method)
    // use 代表接受所有方法
    // 也可以 app.get(), app.post()...
    // 也可以寫成如下 先決定路徑再決定方法
    app.route('/')
        .all(function(req, res, next) { 
        // do something 1... 
            next(); // 呼叫下一個 Middleware
        })
        .get(function(req, res, next) { // do something 2... })
        .post(function(req, res, next) { // do something 3... }
    );
    // 路由管理的概念就像篩子 越上面的越先執行 一旦被篩掉就不會進入後面的路由
    // 所以 404 Not Found 應作為最後一個 (或倒數第二個) 路由
    // req for Request , res for Respond
    app.use('/', (req, res) => {
        res.send('404 Not Found');
    });

    // Step 4. 偵聽
    // console 印出埠號方便判斷 API 位址要資料
    app.listen(process.env.PORT, () => {
        console.log(`server started at port: ${process.env.PORT}`);
    });

#### Top-level Middlewares 開始

    // 放在所有路由之前
    // 根據 headers 判斷需不需要對資料加工處理或解析
    // 只有最共通且常用的處理需要作為 Top-level Middlewares

##### 跨來源資源共用 (CORS, Cross-Origin Resource Sharing)

    // npm i cors
    // 會將網址列的 Protocol, Domain 和 Port 三個字串比對
    // 不完全相同時就會被視為非 Same Origin
    // CORS Policy 由瀏覽器時實作 所以只要不透過瀏覽器就不會被阻擋
    // 只會發生在 AJAX 的時候 
    // 透過和初次 Request 的來源比對得知是否同源

    const app = express();
    const cors = require('cors');
    // 一般的使用方式 (不需使用 Cookies 和 Session 時)
    app.use(cors());
    // 使用白名單 (whitelist) 的使用方式 (需使用 Cookies 和 Session 時)
    const whitelist = require(`${__dirname}/src/data/whitelist`);
    whitelist.push(undefined); // 未經過 AJAX 時 origin 是 undefined
    const corsOptions = {
        credentials: true, // 總是接受 cookie
        origin: (origin, callback) => {
            console.log('origin: ', origin);
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true); 
                // true: 將 origin 傳給 headers 的
                // Access-Control-Allow-Origin 這個 key 作為 value
                // 拿到後瀏覽器才能判斷同不同源
                // 然後決定允不允許 AJAX 回應
                // 即使設定了這麼多也要同源才能拿到回應
                // CORS: 跨來源依然會送出 但得不到回應
            } else {
                callback(new Error('Not Allowed by CORS'));
            }
        }
    }
    app.use(cors(corsOptions));

    // 瀏覽器 (UA, User Agent) 的機制是:
    // 不同源時預設根本不發送 Cookies
    // 即使用上白名單設定也只有相同 Domain 時可以設定發送 Cookies

    // 想解決這個問題可以使用 JWT (JSON Web Token)

##### 建立 Session 用 (如果之後想改用 JWT 可以移除)

    // npm i express-session
    // 注意 session 在手機等移動裝置實作非常麻煩

    // session 是將 sessionID 存在 Cookie 中
    // 並將資料儲存在伺服器主機中的一個 Session 物件裡
    // 利用 Cookie 每次發送 Request 都會包在 headers 中的特性
    // 一旦比對到 sessionID 就可以取得伺服器端的相關資料

    // ./server/app.js
    const session = require('express-session');
    app.use(session({
        // 新用戶沒有用到 session 物件時不會建立 session 和發送 cookie
        saveUninitialized: false,
        // 沒變更內容是否強迫回存
        resave: false,
        // 加密用的字串
        secret: 'anythingyouwanttoencryptyoursession',
        // 30 minutes 後過期 (expires)
        // 單位是毫秒
        cookie: {
            maxAge: 1800000,
        },
        // 以下部分會在 express-mysql-session 解釋
        store: sessionStore
    }))

    // ex.
    // http://localhost:3500/test/session/count
    router.route('/session/count')
        .get((req, res) => {
            req.session.count = req.session.count || 0;
            req.session.count++;
            res.json({
                count: req.session.count,
                session: req.session
            });
        }
    );

    // ex.
    // http://localhost:3500/test/session/delete-count
    router.route('/session/delete-count')
        .get((req, res) => {
            delete req.session.count;
            res.send('刪除 session.count 了');
        }
    );

##### 解析 body 用

    // body 指 http document 的 body
    // 也就是 post 的那個 body
    // 用來解析以 POST 方法傳送時放在 body 中的資料
    // 安裝 express 時 express 有相依於此套件的功能所以會順便安裝
    const badyParser = express.urlencoded({extended: false});

    // 中間陣列中的內容就是各種 Middlewares
    // 會依序經過 根據 headers 判斷需不需要對資料加工處理
    // 只放一個時不需要用陣列包住
    app.post('/try-post', [bodyParser, MiddlewareA, MiddlewareB], (req, res) => {
        // do something;
    });

    // 不過我們不會像上面那樣用
    // 會直接當成 Top-level Middlewares
    // 放在所有路由之前
    // 根據 headers 中的 Content-Type 判斷需不需要對資料加工處理或解析

    // 處理 x-www-form-urlencoded 格式
    // (Content-Type: application/x-www-form-urlencoded) 才處理
    // 注意: 無法處理 (Content-Type: multipart/form-data)
    app.use(express.urlencoded({extended: false}));

##### 解析 JSON

    // (Content-Type: application/json) 才處理
    app.use(express.json());

#### Top-level Middlewares 結束

#### 解析 (Content-Type: multipart/form-data) 用
    
    // npm i multer
    // 在根目錄新增一個 tmp-uploads 資料夾
    // 如果希望 git 上記得有空資料夾 在其中加入 .gitkeep 檔案即可
    const multer = require('multer');
    // dest for Destination
    const upload = multer({dest: 'tmp-uploads'});

    // 接受參數是表單欄位的 name
    // 上傳單個檔案 upload.single
    // 單欄上傳多個檔案 upload.arrays
    // 可以指定最多上傳數量 upload.array('photos', 12)
    // 多欄多值 upload.fields
    // upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]
    // 如果接收的是只有文字的內容 upload.none

    app.post('/try-upload', upload.single('avatar'), (req, res) => {
        // 注意這邊有用到 fs 這個 package 所以要 require 進來
        console.log(req.file); // 查看有哪些屬性
        if (req.file && req.file.originalname) {
            // TODO: 判斷是否為圖片檔案
            if (/\.(jpg|jpeg|png|gif)$/i.test(req.file.originalname)) {
                // TODO: 將檔案搬至公開的資料夾
                fs.rename(req.file.path, './public/imgs/' + req.file.originalname, error => {});
            } else {
                fs.unlink(req.file.path, error => {}); // 刪除暫存檔
            }
        }
        res.json(req.file);
    });

    // ============================================================

    // 也可以考慮用 multer.diskStorage()
    // 注意: __dirname 只有 commonJS (用 require 引入) 有
    const upload = require(__dirname + '/modules/upload-images'); // 改用另一支

    // ./modules/upload-images.js
    const multer = require('multer');
    const { v4: uuidv4 } = require('uuid');

    const extMap = {
        "image/jpeg": ".jpg",
        "image/png": ".png",
        "image/gif": ".gif",
    };

    // 錯誤先行
    function fileFilter(req, file, cb) {
        cb(null, !!extMap[file.mimetype]); // 第一個參數可以是 new Error('ERROR')
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../public/imgs');
        },
        filename: function (req, file, cb) {
            const filename = uuidv4() + extMap[file.mimetype];
            cb(null, filename);
        }
    });

    module.exports = multer({ fileFilter, storage });

#### 錯誤處理用

    // npm i http-errors
    const createError = require('http-errors');

    // Http Status 404 (要寫在倒數第二個路由那邊 只是拉上來解釋)
    app.use((req, res, next) => {
        next(createError(404, '404 Not Found'));
    });

    // Http Status 500 (最後一個路由 發生嚴重錯誤才會到這裡)
    app.use((err, req, res, next) => {
        res.send(err.status || 500, err);
    });

#### 處理時間格式用

    // npm i dayjs
    // 比 Moment 更輕量因此比較快
    // 而且方法設計幾乎和 Moment.js 相同
    // 如果有人需要用到時區功能再換成 moment-timezone

    // Ref: https://day.js.org/docs/en/installation/installation

    // ./routes/test.js
    const dayjs = require('dayjs');
    // 啟用嚴格的日期格式檢查 避免 2022-02-29 被解析成 2022-03-01
    const customParseFormat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customParseFormat);
    // 現在也支援時區轉換功能了
    // const timezone = require('dayjs/plugin/timezone');

    // http://localhost:3500/test/time/dayjs
    router.route('/time/dayjs')
        .get((req, res) => {
            // fm for Format
            const fm = 'YYYY-MM-DD' 
            // m for Moment
            const m1 = dayjs();
            // true 代表啟用嚴格檢查 (strict validation)
            const m2 = dayjs('2022-02-28', fm, true);
            const m3 = dayjs('2022-02-55', fm, true);

            res.json({
                moment1: m1.format(fm),
                moment1validation: m1.isValid(),
                moment2: m2.format(fm),
                moment2validation: m2.isValid(),
                moment3: m3.format(fm), 
                moment3validation: m3.isValid(),
            });
        }
    );

#### 和資料庫連線用

    // npm i mysql2

    // 在根目錄建立 modules 資料夾
    // 並在其中建立一個 mysql2-connect.js

    // ./server/app.js
    const mysql2 = require('mysql2');

    // ./modules/mysql2-connect.js
    // 與資料庫連線用
    const mysql2 = require('mysql2');
    // 在 server/app.js require 過所以會取得參照
    // 建立連線池
    const pool = mysql2.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    // 傳出一個 Promise Pool
    module.exports = pool.promise();

    // ./routes/test.js
    // http://localhost:3500/test/database/mysql2
    router.route('/database/mysql2')
        .get(async (req, res) => {
            const [results, fields] = await db.query("SELECT * FROM `address_book` LIMIT 5");

            // 印出搜尋結果陣列
            console.log(results);

            // 印出此陣列中的欄位名稱
            fields.forEach(
                (value) => {
                    console.log(value.name)
                }
            );
            process.exit(); // 結束行程 
            // 將會關閉 Node.js 的行程 也就是關閉伺服器
        }
    );

#### 將 Session 存入資料庫用 (若之後不使用 Session 的話可以移除)

    // npm i express-mysql-session
    // 若之後不使用 Session 的話可以移除

    // ./server/app.js
    const MySQLStore = require('express-mysql-session')(session);
    const db = require(`${__dirname}/../modules/mysql2-connect`);
    // 有第二個參數時忽略第一個參數而使用既有的連線 (第二個參數)
    const sessionStore = new MySQLStore({}, db);
    // 會在資料庫建立一個 sessions 資料表
    // 而且同一個 sessionID 只會有一筆資料
    // 如此一來 pm2 的多個實體就可以從這邊共用 session

    // 測試: http://localhost:3500/test/session/count

#### 驗證表單資料用

    // npm i joi

    // ./server/app.js
    const Joi = require('joi');

    // ./routes/test.js
    // http://localhost:3500/test/formvalidation/joi
    // 請使用 Postman 進行測試
    // 使用了 multer 作為 Middleware
    // 所以可以用 POST 方法送 form-data 或 x-www-form-urlencoded 測試
    router.route('/formvalidation/joi')
        .post(upload.array(), (req, res) => {
            // schema 是結構的意思
            // 這個 object 的 key 是表單欄位的名稱
            const schema = Joi.object({
                name: Joi.string()
                    .min(3)
                    .required()
                    .label('姓名*'),
                email: Joi.string()
                    .email()
                    .required(),
                // 手機只驗證是字串不夠嚴謹 可以前端稍微處理過再送出資料
                mobile: Joi.string(),
                birthday: Joi.string()
                        .allow(null, ''),
                // 地址只驗證是字串不夠嚴謹 可以前端稍微處理過再送出資料
                address: Joi.string(),
            });

            // {abortEarly: false} 驗證所有欄位
            // 預設為 true 所以找到一個不符合的欄位就會終止驗證
            res.json(schema.validate(req.body, {abortEarly: false})); 
        }
    );
    
#### 發送 AJAX (Asynchronous JavaScript and XML) 用

    // npm i axios
    // 傳統的 Promise 只能得知做完的狀態
    // axios 可以得知傳送過程中的狀態以實作進度條之類的功能
    // 此外可以取消要求 且會自動轉換 JSON 資料
    // 還可以用 axios.create() 管理 API domain

    // axios 發送的是 Promise 包住 XMLHttpRequest
    // 所以可以用 .then() 方法

    // ./routes/test.js
    // http://localhost:3500/test/ajax/axios/yahoo
    router.route('/ajax/axios/yahoo').get((req, res) => {
        axios.get('https://tw.yahoo.com').then((response) => {
            // console.log(response);
            res.send(response.data);
        });
    });

    // 錯誤處理範例 (大專或許不用 但實務上這很重要)
    // ex.
    async function updateMyView() {
        try {
            const response = await fetch('http://example.com/items')
            const data = await response.json()
            updateView(data)
        } catch (error) {
            console.log('Update failed', error)
        }
    }

#### 生成雜湊 (hash) 字串用

    // npm i uuid
    // 用在將使用者上傳的圖片隨機改名的時候
    // v4 是用 Random() 產生亂數所以有很小的機率重複
    // Ref: https://www.npmjs.com/package/uuid
    // 套件 Readme 中的 API Summary 有列出各版本的雜湊方式

    // 引入時將 uuid 中的 v4 這個 function 改名為 uuidv4 以便識別
    const { v4: uuidv4 } = require('uuid');

    // ex.
    // ./modules/upload-images.js

#### 會員登入密碼和啟用帳號時加密用

    // npm i bcryptjs

    // ex.
    output.success = await bcrypt.compare(req.body.password, row.pass_hash);

    // 建議使用 compare() 而非 compareSync()
    // Ref: https://stackoverflow.com/questions/69324159/bcrypt-compare-or-bcrypt-comparesync

### 可以考慮使用的套件：

#### 處理使用者上傳的圖片

    // Ref: https://www.npmjs.com/package/jimp
    // Ref: https://www.npmjs.com/package/sharp
    
#### 生成雜湊 (hash) 字串

    // nanoid (Redux 官方使用)
    // Ref: https://www.npmjs.com/package/nanoid
    
#### 啟動伺服器相關
    
    // Ref: https://www.npmjs.com/package/pm2

#### 解析 Cookie 用 (Top-level Middlewares)

    // Ref: https://www.npmjs.com/package/cookie-parser

#### 驗證表單資料用

    // Ref: https://www.npmjs.com/package/validator
    // 週下載量比 joi 多一點點
    // 但是前端的 joi 是首字小寫的 後端的 Joi 是首字大寫的
    // 可以在前端如下宣告來獲得一致的程式碼 
    const Joi = joi;

#### 寄信 (啟用帳號 忘記密碼...)

    // Ref: https://www.npmjs.com/package/nodemailer

#### 使用社群網站連動登入

    // https://www.npmjs.com/package/passport

### 筆記：

#### 處理檔案的核心套件

    // NodeJS 原生功能
    // fs for File System
    const fs = require('fs');

#### 自動重新啟動 server 的套件 (package)

    // nodemon 和 pm2
    
    // nodemon 在偵測到專案內容改變時會重啟伺服器
    // 但發生中斷錯誤 (Uncaught Error) 後不會重啟
    // 因為 Node.js 是單執行緒 所以 nodemon 當然也就使用單執行緒
    
    // pm2 可以建立多個實體 每個實體用一個執行緒
    // 發生錯誤時也會在有限次數內嘗試重啟
    // 但不同執行緒間的 .env 無法互通 如果有建立多個要另外處理

#### 錯誤處理

    async(req, res) => {
        try {
            await doSomething();
            res.send('something');
        } catch (ex) {
            // ex for Exception
            console.log(ex); // 把錯誤印出來看看
            res.send('error description');
        }
    }

#### process

    // process 代表整個 node 執行的行程 (process)
    // process.env 可以取得作業系統的環境變數
    // process.argv 為執行程式時所下的命令列參數

    // ./src/argv.js
    console.log(process.argv);

    // cmd || bash || zsh
    node src/argv.js aaa bbbb -ac

    // console 將會印出 
    // "node 位址"
    // "執行檔案位址"
    // 'aaa'
    // 'bbbb'
    // '-ac'

#### 關於 package-lock.json

    // package-lock.json 是 package.json 的相依性 (dependencies) 的展開
    // package.json 這隻檔案並不會紀錄套件相依的套件的版本
    // 這些資訊會記錄在 package-lock.json 中

    // 有些人認為這隻檔案可以不用放在版本控制 (VC, Version Control) 中
    
#### 遇到用 XML 回傳資料的 API 怎麼辦

    // 丟到隱形的 div 的 innerHTML 中存取資料
    
    // 可以用 querySelector 等方式取得 XML 的標籤 (tag) 內容

    // ex. 
    
    // 假設有 ./src/data/data.xml
    <Name>Bill<Name />
    
    // AJAX 取得內容並放入 display: none 的 div#xml 中後
    const dataXML = document.querySelector('#xml');
    dataXML.querySelector('name').innerText; // 'Bill'

#### Router 處理

    // 使用變數代稱設定路由
    // 也可以使用 regular expression (RegExp) 設定路由
    // 可以達成路由的模組化
    // 記得規範得較明確的要放在上面 較模糊的放在下面

    // ex.
    // : 後會被視為變數名稱
    // 可以用 req.params 取得
    app.get('/try-params-01/:action/:id', (req, res) => {
        res.json({code: 2, params: req.params});
    });
    app.get('/try-params-01/:action/', (req, res) => {
        res.json({code: 3, params: req.params});
    });
    // 可以用 ? 後綴代表選擇性的 可有可無 (從 RegExp 來的表達方式)
    app.get('/try-params-01/:action?/:id?', (req, res) => {
        res.json({code: 1, params: req.params});
    });

    // 雖然前面說明確的放上面
    // 有時候會只寫一個
    app.get('/try-params-01/:action?/:id?', (req, res) => {
        // 在這裡判斷只有拿到 action 時做什麼
        // 只拿到 id 時做什麼
        // ...
    });

    // 使用 RegExp 的範例
    app.get(/^\/hi\/?/i, (req, res) => {
        res.send({ url: req.url })
    });

    // 使用 Array 的範例
    app.get(['/aaa', '/bbb'], (req, res) => {
        res.send({ url: req.url, code: 'array' })
    });

#### 進階 Router 處理 (建議使用)

    // ./server/app.js
    // 用 use 接受所有方法 各種處理在 ./routes 中的檔案各自定義
    // ex.
    // http://localhost:3500/test/
    app.use('/test', require(`${__dirname}/routes/test`));

    // 在根目錄建立 routes 資料夾
    // 並在其中撰寫 JavaScript 檔案 (範例檔名為 test.js)
    const express = require('express');
    const router = express.Router(); // 建立 Router 物件

    // ex.
    // http://localhost:3500/test/
    router.route('/')
        .get((req, res) => {
            // do something for GET
            // ex.
            res.json({method: 'GET', query: req.query});
        })
        .post((req, res) => {
            // do something for POST
            // ex.
            res.json({method: 'POST', body: req.body});
        }
    );

    ex.
    // http://localhost:3500/test/rocknroll
    router.route('/:musictype')
        .get((req, res) => {
            // do something for GET
            // ex.
            res.json({musictype: req.params});
        }
    );

    // 最後記得輸出 router 這個 Middleware (Function)
    module.exports = router;

    // 可以參考教材的 ./routes/admin.js
    // 裏面有關於 req.url, req.baseUrl, req.originalUrl 的範例

#### 設定路由比對時重視大小寫

    app.set('case sensitive routing', true);

#### 用戶搜尋時使用單引號等破壞 SQL 語法時

    const db = require(`${__dirname}/../modules/mysql2-connect`);
    // 可以使用 db.escape() 方法
    // ex.
    // 假設搜尋欄位的資料會用 GET 方法從網址列的 Query String 送出
    // ?search=pet
    const search = req.query.search || ''; // 取得搜尋字串
    const WHERE += ` AND name LIKE ${ db.escape('%'+search+'%') } `;
    // 如果想查看到底是怎麼跳脫的話
    console.log(db.escape('%'+search+'%'));

#### SQL 語法字串片段的小提醒

    // 最好頭尾都留空白 多空不會出錯 少空會出錯

#### db (mysql2 資料庫連線) 的 result

    const db = require(`${__dirname}/modules/mysql2-connect`);
    // 假設透過 POST 送進來的資料被這樣使用
    router.post('/', async (req, res) => {
        const sql =
            "INSERT INTO `address_book` (
                `name`, `email`, `mobile`,
                `birthday`, `address`, `created_at`
            ) VALUES (
                ?, ?, ?,
                ?, ?, NOW()
            )"
        ;
        // 解構賦值 (Destructuring Assignment)
        const {name, email, mobile, birthday, address} = req.body;
        const [result] = await db.query(sql, [
            name,
            email,
            mobile,
            birthday,
            address
        ]);

        res.json(result);

        // result 大概是這樣的內容
        // {
        //     "fieldCount": 0,
        //     "affectedRows": 1,
        //     "insertId": 1113,
        //     "info": "",
        //     "serverStatus": 2,
        //     "warningStatus": 0
        // }
        // fieldCount 回傳的資料欄位數 新增資料不回傳 所以是 0
        // affectedRows 相當於 PHP 時的 rowCount() 影響欄位數
    });

#### 希望使用者點選下一頁切換列表資料時維持住搜尋字串的做法

    // 使用 URLSearchParams 這個 Web APIs
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    // 可以取得 Query String 的資料

    // ex.
    // 假設 API 回傳物件中有 page 和 query 這兩個 key
    new URLSearchParams({page: i, search: query.search});

#### 靜態內容的路由調整方法

    // 靜態資料夾 (static folder)
    // 所謂的靜態內容指的是不會受後端改變的內容
    // 可以是圖檔, .css 或 .js
    // 這個資料夾中只能放靜態內容
    // 大專時 React 就可以放在 static 這個資料夾中

    // 通常這部分放在最後面但在 404 Not Found 之前

    // ex.
    // 其實是動態對express.static() 這個 function 新增屬性
    app.use(express.static('public'));
    // 相當於 app.use('/', express.static('public'));
    // 複雜路徑建議改用以下寫法
    // app.use(express.static(`${__dirname}/public`));
    app.use('/joi',express.static('node_modules/joi/dist'));
    app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

    // 請注意靜態路由必須精準定義
    // 前端取資料時不能再前往子資料夾

#### Helper Function

    // 可以在 ./modules 中撰寫一些處理資料格式的 function
    // 並 exports 出來在別的地方使用

#### 後端登出轉向

    // 大概像這樣
    app.get('/logout', (req, res) => {
        delete req.session.admin;
        res.redirect('/');
    })
    // 也可以用條件判斷 大概像這樣
    router.get('/', async (req, res) => {
        const output = await getListHandler(req, res);
        switch(output.code) {
            case 410:
                return res.redirect('?page=1');
                break;
            case 420:
                return res.redirect(`?page=${output.totalPages}`);
                break;
        }
        if (!req.session.admin) {
            res.render('address-book/main-noadmin', output);
        } else {
            res.render('address-book/main', output);
        }
    });

#### req 的方法 (method)

    // req.query 可以取得 Query String 中的資料
    // ex. req.query.a

    app.get('/try-qs', (req, res) => {
        res.json(req.query);
    });

    // http://localhost:3500/try-qs?a=1&b=3
    // 以下兩行等價
    // http://localhost:3500/try-qs?a=2&a=bill
    // http://localhost:3500/try-qs?a[]=2&a[]=bill
    // http://localhost:3500/try-qs?a[age]=20&a[name]=bill

    // ============================================================

    // req.params 可以取得網址列的 Parameters
    // ex. 
    app.get('/try-params-01/:action/:id', (req, res) => {
        res.json({params: req.params});
    });

    // http://localhost:3500/try-params-01/aaa/bbb
    // {
    //      "params": {
    //          "action": "aaa",
    //          "id": "bbb"
    //      }
    // }

    // ============================================================

    // req.body 可以取得 POST 方法傳送的表單資料
    // multipart/form-data 用 multer 處理過
    // x-www-form-urlencoded 用 body-parser 處理過

    // ============================================================

    req.file // 客戶端上傳的單個檔案
    req.files // 客戶端上傳的多個檔案

    // ============================================================

    req.session // 客戶端傳送過來的 session 資料 (COOKIE)
    // session 還是存在伺服器端 
    // 這個方法會比對 request cookie 中的 session ID 
    // 去取得伺服器端的 session 資料

#### res 的方法 (method)

    // 只能進行其中之一 且一旦執行就不會執行函式後續內容

    // (req, res) => { // do somtething } 是個 Function
    // 只能有一個 return
    // 也可以這樣理解:
    // 一個請求 (Request) 只能有一個回應 (Respond) (是配對的)

    res.end() // node.js 原生
    // 直接回傳內容 不設定 headers

    // ============================================================

    res.send() // express 才有
    // 會判斷內容設定 headers
    // 如果是純文字 設定為 text/html
    // 如果是 Object 或 Array 會設定為 application/JSON

    // ============================================================

    res.json() // express 才有
    // 轉換為 JSON 並設定 headers 為 application/JSON

    // ============================================================

    res.render() // Embedded JavaScript templating 
    // 以樣板傳入 ejs 等樣版引擎中輸出頁面

    // ============================================================

    res.redirect() // 使頁面重新跳轉

#### RESTful API

    # CRUD

    # 列表 (GET)
    /products
    /products?page=2
    /products?page=2&search=pet

    # 單一商品 (GET)
    /products/:id

    # 新增商品 (POST)
    /products

    # 修改商品 (PUT)
    # Step 1. 先用 GET 讀取商品取得商品資料
    # Step 2. 再用 PUT 來修改
    /products/:id

    # 刪除商品 (DELETE)
    /products/:id

#### 購物車資料表與 SQL TRANSACTION

    // 也就是在資料庫中用一張資料表儲存購物車的內容 (登入狀態)
    // 未登入時可以把這些資料存在 localStorage
    // 登入時一旦在 localStorage 發現這些資料就存入資料表
    
    Primary Key:
    id or sid

    Foreign Key:
    user_id
    item_id

    item_type: product, event, ...
    quantity
    created_at

    // 可以有一個欄位標註已結帳
    // 也可以把資料轉去訂單表 移除這裡的資料
    // 這個過程可以考慮用 SQL 的 TRANSACTION (交易)
    // 啟動 TRANSACTION 後會記得初始狀態 (資料轉移前)
    // 然後執行資料轉移後移除元資料的動作
    // 這個過程一旦出錯 就會回復初始狀態
    // 可以顯示因為網路連線不佳結帳失敗等等的內容
    
    // 簡而言之 啟用 TRANSACTION 後資料表中的資料只會有兩種情況之一
    // 執行成功後的完成狀態 或是執行之前的初始狀態 (全有全無)