// 只要曾經 require 過就取得原本的參照 (Reference)
const express = require('express');

// 建立 Router 物件
const router = express.Router();

// 與資料庫連線 會建立連線池的 Promise 物件
const db = require(`${__dirname}/../modules/mysql2-connect`);

// 傳送 AJAX 用
const axios = require('axios');

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member
router.route('/').get(async (req, res) => {
    // 進行某動作...
});

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member/login
router.route('/login').get(async (req, res) => {
    // 進行某動作... (登入)
});

// FIXME: 實際路由設計可以自己決定
// 測試: http://localhost:3500/api/member/login
router.route('/logout').get(async (req, res) => {
    // 進行某動作... (登出)
});

// 輸出 router 這個 Middleware (Function)
module.exports = router;
