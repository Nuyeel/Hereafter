const express = require('express');
const router = express.Router();
const db = require(`${__dirname}/../modules/mysql2-connect`);

// 專用處理 sql 字串的工具，主要 format 與 escape
const SqlString = require('sqlstring');

// 路由裏面的 Top-level Middlewares

// TODO: 修改貼文標籤的版
// 分享貼文撰寫的版？ 直接跳過來嗎？

// TABLE: share_avatar_posts
// TODO: 新增圖片用的欄位 share_post_img
// DONE: 直接把 avatar_sid 存進檔名裡面就不可能重複 `ava${avatar_sid}.png`
// const row = {
//     share_post_sid: 1, // 分享文章流水號 // PK
//     member_sid: 1, // 會員流水號 // FK
//     avatar_sid: 1, // 來生形象流水號
//     share_post_title: '白肚肚貓貓人', // 分享時的形象名稱
//     share_post_text: '我是文章內容最多兩百個字元', // 文章內容
//     share_post_likes: 12, // 喜歡這篇貼文的人數
//     share_post_collects: 13, // 收藏這篇貼文的人數
//     created_at: '', // 分享時間
//     updated_at: '', // 最後修改時間
// };

// TABLE: share_avatar_tags
// TODO: 新增一個欄位代表被搜尋次數來排序這些標籤
// DONE: share_post_search_times
// const row = {
//     share_post_tag_sid: 1, // 分享文章標籤流水號 // PK
//     share_post_tag_text: '短髮', // 標籤內容
//     share_post_tag_search_times: 123 // 被搜尋次數
// };

// TABLE: share_avatar_posts_to_tags (多對多)
// 分享文章最多三個標籤
// TODO: 要讓標籤可以重複嗎? 很重要所以說三次之類的
// PK: share_p_to_t_sid
// FK: share_post_sid
// const rows = [
//     { share_p_to_t_sid: 1, share_post_sid: 1, share_post_tag_sid: 2 },
//     { share_p_to_t_sid: 2, share_post_sid: 2, share_post_tag_sid: 2 },
//     { share_p_to_t_sid: 3, share_post_sid: 1, share_post_tag_sid: 5 },
//     { share_p_to_t_sid: 4, share_post_sid: 5, share_post_tag_sid: 5 },
//     { share_p_to_t_sid: 5, share_post_sid: 1, share_post_tag_sid: 8 },
//     { share_p_to_t_sid: 6, share_post_sid: 8, share_post_tag_sid: 8 },
// ]

// TABLE: share_avatar_comments (一對多)
// const row = {
//     share_post_sid: 1, // 分享文章流水號
//     member_sid: 1, // 留言者 sid // FK
//     share_post_comment_sid: 1, // 分享文章留言流水號 // PK
//     share_post_comment_text: '哎呦～不錯喔！', // 分享文章留言內容
//     created_at: '' // 留言時間
//     updated_at: '' // 最後編輯時間
// };

// ASK: 會員是否喜歡此貼文的處理層級 (愛心是否實心)
// 這應該可以偷吃步啦... toggle-like things...
// ASK: 會員是否收藏此貼文的處理層級 (旗幟是否實心)
// TODO: 建立一張各會員按讚貼文的對應表
// TODO: 建立一張會員收藏貼文的對應表

// FIXME: 利用中介軟體 JOIN 表單資料後再送出有喜歡資訊的版本
router
    .route('/')
    .get(async (req, res) => {
        if (req.query.searchtag) {
            // 如果來的是標籤做標籤搜尋
            // ASK: Discuss with shinder
            console.log(req.query.searchtag);
            // console.log(req.query.search);

            // const [results] = await db.query($sql);
            // console.log(results);
            // res.json(results);

            res.json('searchtags');
        } else {
            // 如果來的是純文字做標題搜尋或全搜尋
            // sql 前後多留空 多空不會錯 少空會錯
            const $sql = req.query.search
                ? ` SELECT * FROM share_avatar_posts s JOIN member m ON s.member_sid = m.sid WHERE share_post_title like '%${req.query.search}%' ORDER BY created_at DESC `
                : ` SELECT * FROM share_avatar_posts s JOIN member m ON s.member_sid = m.sid ORDER BY created_at DESC `;
            const formatSql = SqlString.format($sql, [req.query.search]);
            console.log(formatSql);
            const [results] = await db.query(formatSql);
            // console.log(results);
            res.json(results);
        }
    })
    .post(async (req, res) => {
        // 用 POST 方法的話會取得無限捲動的文章
        // FIXME: 先用 Postman 測試
        // console.log(req.body.num);
        const pageNumStart = Number(req.body.num);
        const pageNumEnd = pageNumStart + 10; // 目前一次十筆

        // FIXME: 只拿需要的資料 先全拿
        // 寫法一：
        // const $sql =
        // ' SELECT * FROM `share_avatar_posts` s JOIN `member` m ON s.member_sid = m.sid ORDER BY created_at DESC LIMIT ?, ? ';
        // const [results] = await db.query($sql, [pageNumStart, pageNumEnd]);
        // res.json(results);
        // DONE: 目前可以成功取得貼文 剩下 setState
        // DONE: setState() 完成

        // 寫法二：
        // 先做出 formatSql
        const $sql =
            ' SELECT * FROM `share_avatar_posts` s JOIN `member` m ON s.member_sid = m.sid ORDER BY created_at DESC LIMIT ?, ? ';
        const formatSql = SqlString.format($sql, [pageNumStart, pageNumEnd]);
        // 這樣寫的好處是可以 console.log
        // console.log(formatSql);
        const [results] = await db.query(formatSql);
        // console.log(results);
        res.json(results);
    });

router.route('/tags').get(async (req, res) => {
    const $sql =
        ' SELECT `share_post_tag_text` FROM `share_avatar_tags` WHERE 1 ORDER BY `share_post_tag_search_times` DESC LIMIT 5; ';

    const [results] = await db.query($sql);
    res.json(results);
});

module.exports = router;
