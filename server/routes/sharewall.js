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

// TODO: 建立一張各會員按讚貼文的對應表
// TABLE: share_avatar_likes (一對多)
// const row = {
//     share_post_like_sid, // 分享文章按讚流水號 // PK
//     share_post_sid, // 分享文章流水號 // FK
//     member_sid, // 留言者 sid // FK
// }
// ASK: (感覺是多對多...) 一篇文可以有很多人按讚
// ASK: 對這個會員來說 按讚哪些文章是重要的嗎
// ASK: 對這篇文章來說 是誰按了自己讚是重要的嗎 要顯示嗎 (NO!)
// DONE: 像 comment 一樣處理即可
// DONE: 新增假資料 會員會按讚 sid 因數的貼文

// TODO: 建立一張會員收藏貼文的對應表
// TABLE: share_avatar_collects (一對多) (感覺是多對多...)
// const row = {
//     share_post_collect_sid, // 分享文章按讚流水號 // PK
//     share_post_sid, // 分享文章流水號 // FK
//     member_sid, // 留言者 sid // FK
// }
// ASK: (感覺是多對多...) 一篇文可以有很多人收藏
// ASK: 對這個會員來說 收藏哪些文章是重要的吧 會員中心要用
// ASK: 對這篇文章來說 是誰收藏了自己是重要的嗎 感覺只有數字重要吧
// DONE: 像 comment 一樣處理即可
// DONE: 新增假資料 會員會收藏 11 - sid 因數的貼文

// DONE: 至寧醬: 可以用一個 type 欄位區分 就可以只建兩張表
// 但一般來說是分開 因為可能用途不同

// ASK: 會員是否喜歡此貼文的處理層級 (愛心是否實心)
// ASK: 會員是否收藏此貼文的處理層級 (旗幟是否實心)

// FIXME: 利用中介軟體 JOIN 表單資料後再送出有喜歡資訊的版本
// FIXME: 現在要加上會員狀態 預設 作者 或收藏

// ASK: 上一頁時 怎麼保存頁面狀態
router.route('/').get(async (req, res) => {
    // 檢查是不是有篩選條件
    // if (req.query.isAuthor) {
    //     console.log(req.query.isAuthor);
    // } else if (req.query.isCollector) {
    //     console.log(req.query.isCollector);
    // }

    if (req.query.searchtag) {
        // 如果來的是標籤做標籤搜尋
        // console.log(req.query.searchtag);

        // console.log(res.locals.loginUser); // 取得 token 內容

        let searchtagString = '';
        if (!Array.isArray(req.query.searchtag)) {
            searchtagString = SqlString.escape(req.query.searchtag);
        } else {
            for (
                let i = 0, strLength = req.query.searchtag.length;
                i < strLength;
                i++
            ) {
                if (i !== 0) {
                    searchtagString += ', ';
                }
                searchtagString += SqlString.escape(req.query.searchtag[i]);
            }
        }
        // console.log(searchtagString);

        const $tag_sql = ` 
                SELECT share_post_tag_sid 
                FROM share_avatar_tags 
                WHERE share_post_tag_text 
                IN (${searchtagString}) 
            `;

        const [tag_results] = await db.query($tag_sql);
        // console.log(tag_results);

        if (!tag_results.length) {
            // 沒有匹配的標籤
            return res.json([]);
        }

        if (
            Array.isArray(req.query.searchtag) &&
            tag_results.length !== req.query.searchtag.length
        ) {
            // 具有多個搜尋標籤而且標籤對應結果與搜尋標籤數量對不上
            // 加一個假的項目給 tag_results
            // 由於沒有任何標籤 sid 為 0 會自動搜不到結果
            tag_results.push({ share_post_tag_sid: 0 });
        }

        // TODO: 進行標籤搜尋
        // DONE: 標籤搜尋 OK
        let $searchtag_sql = ` SELECT t1.* FROM `;
        let tableIndex = 1;
        for (let i = 0, strLength = tag_results.length; i < strLength; i++) {
            if (i !== 0) {
                $searchtag_sql += ` JOIN `;
            }
            $searchtag_sql += ` 
                    (SELECT share_post_sid 
                    FROM share_avatar_posts_to_tags 
                    WHERE share_post_tag_sid = ${tag_results[i].share_post_tag_sid}) t${tableIndex} 
                `;
            if (i !== 0) {
                $searchtag_sql += ` 
                        ON t${
                            tableIndex - 1
                        }.share_post_sid=t${tableIndex}.share_post_sid 
                    `;
            }
            tableIndex++;
        }
        // console.log($searchtag_sql);
        const [post_results] = await db.query($searchtag_sql);
        // console.log(post_results);

        if (!post_results.length) {
            // 沒有匹配的貼文
            return res.json([]);
        }

        // TODO: 製作搜尋字串
        // DONE: 標籤搜尋 OK
        let searchPostsString = '';
        for (let i = 0, strLength = post_results.length; i < strLength; i++) {
            if (i !== 0) {
                searchPostsString += ', ';
            }
            searchPostsString += `${post_results[i].share_post_sid}`;
        }
        // console.log(searchPostsString);

        // TODO: 製作三態搜尋
        let $sql = ` 
            SELECT t1.*, t2.*
            FROM (
                SELECT s.*, m.*, 
                sc.combinationText, sc.img_name, sc.price 
                FROM share_avatar_posts s 
                JOIN member m 
                ON s.member_sid = m.sid
                JOIN showcase sc
                ON sc.avatar_id = s.avatar_sid) t1
            JOIN (
                SELECT avatar_id, img_name as author_profile 
                FROM showcase) t2
            ON t1.profile_picture = t2.avatar_id
            WHERE t1.share_post_sid 
            IN (${searchPostsString}) 
        `;

        // 安全起見檔一下
        if (res.locals.loginUser) {
            if (req.query.isAuthor && req.query.isAuthor === 'true') {
                // console.log('作者');
                $sql += ` 
                        AND t1.sid = ${res.locals.loginUser.id} 
                    `;
            } else if (
                req.query.isCollector &&
                req.query.isCollector === 'true'
            ) {
                // TODO: 這比較難 要篩選收藏文章
                // console.log('收集');
                const $collect_sql = ` 
                        SELECT share_post_sid 
                        FROM share_avatar_collects 
                        WHERE member_sid = ? 
                    `;

                const [collect_results] = await db.query($collect_sql, [
                    res.locals.loginUser.id,
                ]);

                // console.log(collect_results);

                let collectString = '';
                for (
                    let i = 0, strLength = collect_results.length;
                    i < strLength;
                    i++
                ) {
                    if (i !== 0) {
                        collectString += ', ';
                    }
                    collectString += collect_results[i].share_post_sid;
                }

                // console.log(collectString);
                $sql += ` AND t1.share_post_sid IN (${collectString}) `;
            }
        }

        $sql += ` ORDER BY created_at DESC `;

        // console.log($sql);
        const [results] = await db.query($sql);

        // TODO: 篩選是否按讚
        // DONE: 登入才需要篩選
        if (res.locals.loginUser) {
            const $like_sql = ` 
                    SELECT share_post_sid
                    FROM share_avatar_likes 
                    WHERE member_sid = ? 
                `;

            const [like_results] = await db.query($like_sql, [
                res.locals.loginUser.id,
            ]);
            // console.log(like_results);

            // TODO: 加上是否喜歡的欄位
            // DONE: 先不要花時間去想 JOIN
            results.forEach((cardItem) => {
                cardItem.share_post_isliked = false; // 初始化
                for (let i = 0; i < like_results.length; i++) {
                    if (
                        cardItem.share_post_sid ===
                        like_results[i].share_post_sid
                    ) {
                        cardItem.share_post_isliked = true;
                    }
                }
            });
        }
        // console.log(results);

        res.json(results);
    } else {
        // 如果來的是純文字做標題搜尋或全搜尋
        // sql 前後多留空 多空不會錯 少空會錯
        // FIXME: 處理跳脫
        // DONE: 跳脫 OK
        // TODO: 製作三態搜尋
        if (req.query.search) {
            const escapeString = SqlString.escape(req.query.search);
            const likeString = `'%${escapeString.slice(1, -1)}%'`;
            // console.log(likeString);
            let $search_sql = ` 
                SELECT t1.*, t2.*
                FROM (
                    SELECT s.*, m.*, 
                    sc.combinationText, sc.img_name, sc.price 
                    FROM share_avatar_posts s 
                    JOIN member m 
                    ON s.member_sid = m.sid
                    JOIN showcase sc
                    ON sc.avatar_id = s.avatar_sid) t1
                JOIN (
                    SELECT avatar_id, img_name as author_profile 
                    FROM showcase) t2
                ON t1.profile_picture = t2.avatar_id
                WHERE t1.share_post_title 
                LIKE ${likeString} 
                `;

            // 安全起見檔一下
            if (res.locals.loginUser) {
                if (req.query.isAuthor && req.query.isAuthor === 'true') {
                    $search_sql += ` 
                    AND t1.sid = ${res.locals.loginUser.id} 
                    `;
                } else if (
                    req.query.isCollector &&
                    req.query.isCollector === 'true'
                ) {
                    // TODO: 這比較難 要篩選收藏文章
                    // console.log('收集');
                    const $collect_sql = ` 
                            SELECT share_post_sid 
                            FROM share_avatar_collects 
                            WHERE member_sid = ? 
                        `;

                    const [collect_results] = await db.query($collect_sql, [
                        res.locals.loginUser.id,
                    ]);

                    // console.log(collect_results);

                    let collectString = '';
                    for (
                        let i = 0, strLength = collect_results.length;
                        i < strLength;
                        i++
                    ) {
                        if (i !== 0) {
                            collectString += ', ';
                        }
                        collectString += collect_results[i].share_post_sid;
                    }

                    // console.log(collectString);
                    $search_sql += ` AND t1.share_post_sid IN (${collectString}) `;
                }
            }

            $search_sql += ` ORDER BY created_at DESC `;

            // console.log($sql);
            const [results] = await db.query($search_sql);

            // TODO: 篩選是否按讚
            // DONE: 登入才需要篩選
            if (res.locals.loginUser) {
                const $like_sql = ` 
                        SELECT share_post_sid
                        FROM share_avatar_likes 
                        WHERE member_sid = ? 
                    `;

                const [like_results] = await db.query($like_sql, [
                    res.locals.loginUser.id,
                ]);
                // console.log(like_results);

                // TODO: 加上是否喜歡的欄位
                // DONE: 先不要花時間去想 JOIN
                results.forEach((cardItem) => {
                    cardItem.share_post_isliked = false; // 初始化
                    for (let i = 0; i < like_results.length; i++) {
                        if (
                            cardItem.share_post_sid ===
                            like_results[i].share_post_sid
                        ) {
                            cardItem.share_post_isliked = true;
                        }
                    }
                });
            }

            res.json(results);
        } else {
            let $search_sql = ` 
                SELECT t1.*, t2.*
                FROM (
                    SELECT s.*, m.*, 
                    sc.combinationText, sc.img_name, sc.price 
                    FROM share_avatar_posts s 
                    JOIN member m 
                    ON s.member_sid = m.sid
                    JOIN showcase sc
                    ON sc.avatar_id = s.avatar_sid) t1
                JOIN (
                    SELECT avatar_id, img_name as author_profile 
                    FROM showcase) t2
                ON t1.profile_picture = t2.avatar_id
            `;

            // 安全起見檔一下
            if (res.locals.loginUser) {
                if (req.query.isAuthor && req.query.isAuthor === 'true') {
                    // console.log('作者');
                    $search_sql += ` 
                        AND t1.sid = ${res.locals.loginUser.id} 
                    `;
                } else if (
                    req.query.isCollector &&
                    req.query.isCollector === 'true'
                ) {
                    // TODO: 這比較難 要篩選收藏文章
                    // console.log('收集');
                    const $collect_sql = ` 
                            SELECT share_post_sid 
                            FROM share_avatar_collects 
                            WHERE member_sid = ? 
                        `;

                    const [collect_results] = await db.query($collect_sql, [
                        res.locals.loginUser.id,
                    ]);

                    // console.log(collect_results);

                    let collectString = '';
                    for (
                        let i = 0, strLength = collect_results.length;
                        i < strLength;
                        i++
                    ) {
                        if (i !== 0) {
                            collectString += ', ';
                        }
                        collectString += collect_results[i].share_post_sid;
                    }

                    // console.log(collectString);
                    $search_sql += ` AND t1.share_post_sid IN (${collectString}) `;
                }
            }

            $search_sql += ` ORDER BY created_at DESC `;

            // console.log($sql);
            const [results] = await db.query($search_sql);

            // TODO: 篩選是否按讚
            // DONE: 登入才需要篩選
            if (res.locals.loginUser) {
                const $like_sql = ` 
                        SELECT share_post_sid
                        FROM share_avatar_likes 
                        WHERE member_sid = ? 
                    `;

                const [like_results] = await db.query($like_sql, [
                    res.locals.loginUser.id,
                ]);
                // console.log(like_results);

                // TODO: 加上是否喜歡的欄位
                // DONE: 先不要花時間去想 JOIN
                results.forEach((cardItem) => {
                    cardItem.share_post_isliked = false; // 初始化
                    for (let i = 0; i < like_results.length; i++) {
                        if (
                            cardItem.share_post_sid ===
                            like_results[i].share_post_sid
                        ) {
                            cardItem.share_post_isliked = true;
                        }
                    }
                });
            }

            res.json(results);
        }
    }
});
// .post(async (req, res) => {
//     // TODO: 改成 GET 要資料
//     // 之後每次捲動都必須繼承條件來要
//     // ASK: 德醬
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // FIXME: 這個改成 GET
//     // 用 POST 方法的話會取得無限捲動的文章
//     // FIXME: 先用 Postman 測試
//     // console.log(req.body.num);
//     const pageNumStart = Number(req.body.num);
//     const pageNumEnd = pageNumStart + 10; // 目前一次十筆

//     // FIXME: 只拿需要的資料 先全拿
//     // 寫法一：
//     // const $sql =
//     // ' SELECT * FROM `share_avatar_posts` s JOIN `member` m ON s.member_sid = m.sid ORDER BY created_at DESC LIMIT ?, ? ';
//     // const [results] = await db.query($sql, [pageNumStart, pageNumEnd]);
//     // res.json(results);
//     // DONE: 目前可以成功取得貼文 剩下 setState
//     // DONE: setState() 完成

//     // 寫法二：
//     // 先做出 formatSql
//     const $sql = `
//         SELECT *
//         FROM share_avatar_posts s
//         JOIN member m
//         ON s.member_sid = m.sid
//         ORDER BY created_at DESC
//         LIMIT ?, ?
//     `;

//     const formatSql = SqlString.format($sql, [pageNumStart, pageNumEnd]);
//     // 這樣寫的好處是可以 console.log
//     // console.log(formatSql);
//     const [results] = await db.query(formatSql);
//     // console.log(results);

//     // TODO: 篩選是否按讚
//     // DONE: 登入才需要篩選
//     if (res.locals.loginUser) {
//         const $like_sql = `
//         SELECT *
//         FROM share_avatar_likes
//         WHERE member_sid = ?
//         `;

//         const [like_results] = await db.query($like_sql, [
//             res.locals.loginUser.id,
//         ]);
//         // console.log(like_results);

//         // TODO: 加上是否喜歡的欄位
//         // DONE: 先不要花時間去想 JOIN
//         results.forEach((cardItem) => {
//             cardItem.share_post_isliked = false; // 初始化
//             for (let i = 0; i < like_results.length; i++) {
//                 if (
//                     cardItem.share_post_sid ===
//                     like_results[i].share_post_sid
//                 ) {
//                     cardItem.share_post_isliked = true;
//                     break;
//                 }
//             }
//         });
//     }
//     // console.log(results);

//     res.json(results);
// });

// DONE: 撰文
router.route('/post').post(async (req, res) => {
    let output = {
        postCreateResult: false,
        tagsCreateResult: false,
        postsToTagsResult: false,
    };

    // console.log(req.body);

    if (!res.locals.loginUser) {
        return res.send('請先登入');
    }

    // TODO: 統一跳脫
    const sharePostAvatarSid = SqlString.escape(req.body.sharePostAvatarSid);
    const sharePostTitle = SqlString.escape(req.body.sharePostTitle);
    const sharePostTag_1 = SqlString.escape(req.body.sharePostTag_1);
    const sharePostTag_2 = SqlString.escape(req.body.sharePostTag_2);
    const sharePostTag_3 = SqlString.escape(req.body.sharePostTag_3);
    const sharePostTextarea = SqlString.escape(req.body.sharePostTextarea);

    // if (sharePostAvatarSid.indexOf('\\') !== -1) {
    //     console.log('sharePostAvatarSid 被跳脫了');
    //     return res.json('跳脫');
    // }

    if (isNaN(Number(sharePostAvatarSid))) {
        console.log('sharePostAvatarSid 不是數字');
        return res.json('請不要想要攻擊');
    }

    if (sharePostTitle.indexOf('\\') !== -1) {
        console.log('sharePostTitle 被跳脫了');
        return res.json('跳脫');
    }

    if (sharePostTag_1.indexOf('\\') !== -1) {
        console.log('sharePostTag_1 被跳脫了');
        return res.json('跳脫');
    }

    if (sharePostTag_2.indexOf('\\') !== -1) {
        console.log('sharePostTag_2 被跳脫了');
        return res.json('跳脫');
    }

    if (sharePostTag_3.indexOf('\\') !== -1) {
        console.log('sharePostTag_3 被跳脫了');
        return res.json('跳脫');
    }

    // FIXME: 這樣英文不能有 ' 看狀況決定修不修
    if (sharePostTextarea.indexOf('\\') !== -1) {
        console.log('sharePostTextarea 被跳脫了');
        return res.json('跳脫');
    }

    if (req.body.sharePostTitle.length > 6) {
        return res.send('來生形象標題太長');
    }

    if (req.body.sharePostTag_1.length > 6) {
        return res.send('標籤一太長');
    }

    if (req.body.sharePostTag_2.length > 6) {
        return res.send('標籤二太長');
    }

    if (req.body.sharePostTag_3.length > 6) {
        return res.send('標籤三太長');
    }

    if (req.body.sharePostTextarea.length === 0) {
        return res.send('文章是空的啊');
    }

    if (req.body.sharePostTextarea.length > 168) {
        return res.send('文章太長');
    }

    // TODO: 新增文章
    const $post_create_sql = ` 
        INSERT 
        INTO share_avatar_posts ( 
            member_sid, avatar_sid, share_post_title, share_post_text, share_post_likes, share_post_collects, created_at
        ) VALUES (
            ?, ?, ?, ?,
            0, 0, NOW()
        ) 
    `;
    const formatSql = SqlString.format($post_create_sql, [
        res.locals.loginUser.id,
        Number(req.body.sharePostAvatarSid),
        req.body.sharePostTitle,
        req.body.sharePostTextarea,
    ]);

    // console.log(formatSql);
    const [post_create_results] = await db.execute(formatSql);
    // console.log(post_create_results);

    if (!post_create_results.affectedRows) {
        return res.send('寫入文章失敗');
    }

    output.postCreateResult = true;

    // DONE: 新增標籤與否
    let tag_1_ID = 0; // 初始化
    let tag_2_ID = 0; // 初始化
    let tag_3_ID = 0; // 初始化

    // Tag_1
    // console.log('tag 1', sharePostTag_1);
    if (req.body.sharePostTag_1 !== '') {
        const $tag_1_isSet_sql = ` 
            SELECT share_post_tag_sid 
            FROM share_avatar_tags 
            WHERE share_post_tag_text = ${sharePostTag_1} 
        `;
        const [tag_1_sid_isSet_result] = await db.query($tag_1_isSet_sql);

        // console.log(tag_1_sid_isSet_result);
        if (!tag_1_sid_isSet_result.length) {
            // 不存在就新增
            const $tag_create_sql = ` 
                INSERT 
                INTO share_avatar_tags ( 
                    share_post_tag_text, share_post_tag_search_times
                ) VALUES (
                    ${sharePostTag_1}, 0
                ) 
            `;

            const [tag_create_result] = await db.execute($tag_create_sql);

            if (!tag_create_result.affectedRows) {
                return res.send('標籤一新增失敗');
            }

            tag_1_ID = tag_create_result.insertId;
        }
    }

    // Tag 2
    // console.log('tag 2', sharePostTag_2);
    if (req.body.sharePostTag_2 !== '') {
        const $tag_2_isSet_sql = ` 
            SELECT share_post_tag_sid 
            FROM share_avatar_tags 
            WHERE share_post_tag_text = ${sharePostTag_2} 
        `;
        const [tag_2_sid_isSet_result] = await db.query($tag_2_isSet_sql);

        // console.log(tag_2_sid_isSet_result);
        if (!tag_2_sid_isSet_result.length) {
            // 不存在就新增
            const $tag_create_sql = ` 
                INSERT 
                INTO share_avatar_tags ( 
                    share_post_tag_text, share_post_tag_search_times
                ) VALUES (
                    ${sharePostTag_2}, 0
                ) 
            `;

            const [tag_create_result] = await db.execute($tag_create_sql);

            if (!tag_create_result.affectedRows) {
                return res.send('標籤二新增失敗');
            }

            tag_2_ID = tag_create_result.insertId;
        }
    }

    // Tag 3
    // console.log('tag 3', sharePostTag_3);
    if (req.body.sharePostTag_3 !== '') {
        const $tag_3_isSet_sql = ` 
            SELECT share_post_tag_sid 
            FROM share_avatar_tags 
            WHERE share_post_tag_text = ${sharePostTag_3} 
        `;
        const [tag_3_sid_isSet_result] = await db.query($tag_3_isSet_sql);

        // console.log(tag_3_sid_isSet_result);
        if (!tag_3_sid_isSet_result.length) {
            // 不存在就新增
            const $tag_create_sql = ` 
                INSERT 
                INTO share_avatar_tags ( 
                    share_post_tag_text, share_post_tag_search_times
                ) VALUES (
                    ${sharePostTag_3}, 0
                ) 
            `;

            const [tag_create_result] = await db.execute($tag_create_sql);

            if (!tag_create_result.affectedRows) {
                return res.send('標籤三新增失敗');
            }

            tag_3_ID = tag_create_result.insertId;
        }
    }

    output.tagsCreateResult = true;

    // TODO: 處理文章標籤對應
    // 首先要取得剛剛新增的文章 sid
    const postID = post_create_results.insertId;

    let tagsArray = [];

    if (tag_1_ID !== 0) {
        tagsArray.push(tag_1_ID);
    }

    if (tag_2_ID !== 0) {
        tagsArray.push(tag_2_ID);
    }

    if (tag_3_ID !== 0) {
        tagsArray.push(tag_3_ID);
    }

    for (let i = 0; i < tagsArray.length; i++) {
        const $posts_to_tags_create_sql = ` 
            INSERT 
            INTO share_avatar_posts_to_tags ( 
                share_post_sid, share_post_tag_sid 
            ) VALUES (
                ${postID}, ${tagsArray[i]}
            )  
        `;

        const [posts_to_tags_create_result] = await db.execute(
            $posts_to_tags_create_sql
        );

        if (posts_to_tags_create_result.affectedRows !== 1) {
            return res.json('新增標籤對應文章時出錯啦');
        }
    }

    output.postsToTagsResult = true;

    res.json(output);
});

router.route('/:sharepostID').get(async (req, res) => {
    const sharepostID = Number(req.params.sharepostID);

    if (isNaN(sharepostID)) {
        // TODO: 更好的處理方式？
        console.log('這不是文章ID');
        return res.json({});
    }

    // FIXME: 之後要詳細寫出需要的欄位 或許可以加上狀態碼等資訊
    let results = {
        postResults: {},
        postTagsResults: [],
        postCommentsResults: [],
        loginUserResults: {
            id: 0, // 預設值 沒有 sid 是 0 的會員
            account: '',
            profile: null, // 其實 0 也可以
            isLiked: false, // 預設沒有按讚
            isCollected: false, // 預設沒有收藏
        },
    };

    // 取得貼文內容
    const $post_sql = ` 
        SELECT * 
        FROM share_avatar_posts s
        JOIN member m 
        ON s.member_sid = m.sid 
        JOIN showcase sc
        ON sc.avatar_id = s.avatar_sid
        WHERE share_post_sid = ? 
    `;

    const [[post_results]] = await db.query($post_sql, [sharepostID]);
    results.postResults = post_results;

    // 取得發布此篇貼文的會員頭貼
    const $author_profile_sql = ` 
        SELECT s.*
        FROM member m
        JOIN showcase s
        ON s.avatar_id = m.profile_picture
        WHERE sid = ?
    `;

    const [[author_profile_result]] = await db.query($author_profile_sql, [
        post_results.sid,
    ]);

    // console.log(author_profile_result);

    results.postResults.authorProfile = author_profile_result;

    // 藉由文章編號取得內含所有標籤中文陣列
    const $post_tags_sql = ` 
        SELECT sat.share_post_tag_text, sat.share_post_tag_sid  
        FROM share_avatar_posts sap 
        JOIN share_avatar_posts_to_tags saptt 
        ON sap.share_post_sid = saptt.share_post_sid 
        JOIN share_avatar_tags sat 
        ON saptt.share_post_tag_sid = sat.share_post_tag_sid 
        WHERE sap.share_post_sid = ? 
    `;

    const [post_tags_results] = await db.query($post_tags_sql, [sharepostID]);
    results.postTagsResults = post_tags_results;

    // 取得評論內容並按照留言時間排序
    // FIXME: 如果有編輯過要多顯示已編輯？
    const $post_comments_sql = ` 
        SELECT sac.*, m.account 
        FROM share_avatar_comments sac
        JOIN member m
        ON sac.member_sid = m.sid
        WHERE share_post_sid = ?  
        ORDER BY created_at ASC 
    `;

    const [post_comments_results] = await db.query($post_comments_sql, [
        sharepostID,
    ]);

    if (res.locals.loginUser) {
        // 加上是否可刪除的屬性 有登入才給
        post_comments_results.forEach((commentItem) => {
            commentItem.comment_isEditable = false; // 初始化
            for (let i = 0; i < post_comments_results.length; i++) {
                if (commentItem.member_sid === res.locals.loginUser.id) {
                    commentItem.comment_isEditable = true;
                }
            }
        });
    }
    // console.log(post_comments_results);
    results.postCommentsResults = post_comments_results;

    // 取得現在登入會員相關狀態 是否收藏 是否按讚 以及頭像 為登入要有預設圖示
    // FIXME: 為登入會員頭貼素材 尺寸應該完全跟現有素材相同
    // 要登入狀態才做這些事
    if (res.locals.loginUser) {
        // console.log(res.locals.loginUser);
        results.loginUserResults.id = res.locals.loginUser.id;
        results.loginUserResults.account = res.locals.loginUser.account;

        // 取得此時登入會員的大頭貼 SID
        const $member_profile_sql = ` 
            SELECT s.*
            FROM member m
            JOIN showcase s
            ON s.avatar_id = m.profile_picture
            WHERE sid = ?
        `;

        // 解構賦值同時改名
        const [[member_profile_result]] = await db.query($member_profile_sql, [
            res.locals.loginUser.id,
        ]);

        // console.log(member_profile_result);
        results.loginUserResults.profile = member_profile_result;

        // 進行是否按讚確認
        const $post_isliked_sql = ` 
            SELECT COUNT(*) 
            FROM share_avatar_likes 
            WHERE member_sid = ? 
            AND share_post_sid = ? 
        `;

        // 解構賦職同時改名
        const [[{ 'COUNT(*)': post_isliked_result }]] = await db.query(
            $post_isliked_sql,
            [res.locals.loginUser.id, sharepostID]
        );
        // console.log(post_isliked_result); // 0 或 1 (出錯會更多)

        if (post_isliked_result) {
            // 如果會員有按讚才需要改
            results.loginUserResults.isLiked = true;
        }

        // 進行是否收藏確認
        const $post_iscollected_sql = ` 
            SELECT COUNT(*) 
            FROM share_avatar_collects 
            WHERE member_sid = ? 
            AND share_post_sid = ?  
        `;

        // 解構賦職同時改名
        const [[{ 'COUNT(*)': post_iscollected_result }]] = await db.query(
            $post_iscollected_sql,
            [res.locals.loginUser.id, sharepostID]
        );
        // console.log(post_iscollected_result); // 0 或 1 (出錯會更多)

        if (post_iscollected_result) {
            // 如果會員有收藏才需要改
            results.loginUserResults.isCollected = true;
        }
    }

    // 送出最終結果
    // console.log(results);
    res.json(results);
});

router.route('/tagbar/tags').get(async (req, res) => {
    const $sql = ` 
        SELECT share_post_tag_text
        FROM share_avatar_tags 
        WHERE 1 
        ORDER BY share_post_tag_search_times DESC 
        LIMIT 5; 
    `;

    const [results] = await db.query($sql);
    // console.log(results);
    res.json(results);
});

// DONE: 留言
// TODO: 想辦法讓前端留言跳到最底
router.route('/:sharepostID/comment').post(async (req, res) => {
    const sharepostID = Number(req.params.sharepostID);

    // 錯誤處理
    if (isNaN(sharepostID)) {
        return res.send('這不是文章 ID');
    }

    // 進行登入驗證
    if (!res.locals.loginUser) {
        return res.send('沒有登入');
    }

    // 處理文章不存在的狀況
    const $post_exist_sql = `
        SELECT COUNT(*) 
        FROM share_avatar_posts 
        WHERE share_post_sid = ? 
    `;

    const [[{ 'COUNT(*)': post_exist_result }]] = await db.query(
        $post_exist_sql,
        [sharepostID]
    );
    // console.log(post_exist_result); // 0 或 1 (出錯會更多)

    if (!post_exist_result) {
        return res.send('才...才沒有這篇文章呢！');
    }

    const $comment_create_sql = ` 
        INSERT 
        INTO share_avatar_comments (
            share_post_sid, member_sid, share_post_comment_text, created_at
        ) VALUES (
            ?, ?, ?, NOW()
        ) 
    `;

    const formatSql = SqlString.format($comment_create_sql, [
        sharepostID,
        res.locals.loginUser.id,
        req.body.data.comment,
    ]);

    // console.log(formatSql);

    const [comment_create_results] = await db.execute(formatSql);
    // console.log(comment_create_results);
    return res.json(comment_create_results);
});

// DONE: 要放在 tagbar 區後面以免 tagber/tags 的 tagbar 被當成 sharepostID
// ASK: 直接發送到四個不同的 actionType 路由資料庫應該會比較輕鬆？
router.route('/:sharepostID/:actionType?').get(async (req, res) => {
    const sharepostID = Number(req.params.sharepostID);

    // 錯誤處理
    if (isNaN(sharepostID)) {
        return res.send('這不是文章 ID');
    }

    // 進行登入驗證
    if (!res.locals.loginUser) {
        return res.send('沒有登入');
    }

    // 處理文章不存在的狀況
    const $post_exist_sql = `
        SELECT COUNT(*) 
        FROM share_avatar_posts 
        WHERE share_post_sid = ? 
    `;

    const [[{ 'COUNT(*)': post_exist_result }]] = await db.query(
        $post_exist_sql,
        [sharepostID]
    );
    // console.log(post_exist_result); // 0 或 1 (出錯會更多)

    if (!post_exist_result) {
        return res.send('才...才沒有這篇文章呢！');
    }

    // DONE: LIKE
    if (req.params.actionType === 'like') {
        // FIXME: 有心人用路徑重複按讚有空再處理
        const $like_sql = ` 
            INSERT 
            INTO share_avatar_likes (
                share_post_sid, member_sid
            ) VALUES (
                ?, ?
            ) 
        `;
        const formatSql = SqlString.format($like_sql, [
            sharepostID,
            res.locals.loginUser.id,
        ]);

        const [like_results] = await db.execute(formatSql);
        // console.log(like_results);

        // DONE: 去文章資料對喜歡數 + 1
        const $post_like_update_sql = ` 
            UPDATE share_avatar_posts 
            SET share_post_likes = share_post_likes + 1 
            WHERE share_post_sid = ${sharepostID}
        `;

        const [post_like_update_results] = await db.execute(
            $post_like_update_sql
        );

        if (post_like_update_results.affectedRows !== 1) {
            return res.send('按讚數加一出錯');
        }

        return res.json(like_results);
    }

    // DONE: DISLIKE
    if (req.params.actionType === 'dislike') {
        const $dislike_sql = ` 
            DELETE 
            FROM share_avatar_likes 
            WHERE share_post_sid = ? 
            AND member_sid = ? 
        `;
        const formatSql = SqlString.format($dislike_sql, [
            sharepostID,
            res.locals.loginUser.id,
        ]);

        const [dislike_results] = await db.execute(formatSql);
        // console.log(dislike_results);

        // DONE: 去文章資料對喜歡數 - 1
        const $post_dislike_update_sql = ` 
            UPDATE share_avatar_posts 
            SET share_post_likes = share_post_likes - 1 
            WHERE share_post_sid = ${sharepostID}
        `;

        const [post_dislike_update_results] = await db.execute(
            $post_dislike_update_sql
        );

        if (post_dislike_update_results.affectedRows !== 1) {
            return res.send('按讚數減一出錯');
        }

        return res.json(dislike_results);
    }

    // DONE: COLLECT
    if (req.params.actionType === 'collect') {
        // FIXME: 有心人用路徑重複按讚有空再處理
        const $collect_sql = ` 
            INSERT 
            INTO share_avatar_collects (
                share_post_sid, member_sid
            ) VALUES (
                ?, ?
            ) 
        `;
        const formatSql = SqlString.format($collect_sql, [
            sharepostID,
            res.locals.loginUser.id,
        ]);

        const [collect_results] = await db.execute(formatSql);
        // console.log(collect_results);

        // DONE: 去文章資料對收藏數 + 1
        const $post_collect_update_sql = ` 
            UPDATE share_avatar_posts 
            SET share_post_collects = share_post_collects + 1 
            WHERE share_post_sid = ${sharepostID}
        `;

        const [post_collect_update_results] = await db.execute(
            $post_collect_update_sql
        );

        if (post_collect_update_results.affectedRows !== 1) {
            return res.send('收藏數加一出錯');
        }

        return res.json(collect_results);
    }

    // DONE: DISCOLLECT
    if (req.params.actionType === 'discollect') {
        const $discollect_sql = ` 
            DELETE 
            FROM share_avatar_collects 
            WHERE share_post_sid = ? 
            AND member_sid = ? 
        `;
        const formatSql = SqlString.format($discollect_sql, [
            sharepostID,
            res.locals.loginUser.id,
        ]);

        const [discollect_results] = await db.execute(formatSql);
        // console.log(discollect_results);

        // DONE: 去文章資料對收藏數 - 1
        const $post_discollect_update_sql = ` 
            UPDATE share_avatar_posts 
            SET share_post_collects = share_post_collects - 1 
            WHERE share_post_sid = ${sharepostID}
        `;

        const [post_discollect_update_results] = await db.execute(
            $post_discollect_update_sql
        );

        if (post_discollect_update_results.affectedRows !== 1) {
            return res.send('收藏數減一出錯');
        }

        return res.json(discollect_results);
    }

    return res.send('其他的請求都不接受喔～');
});

// 整理格式稍微討 M 所以分開來寫
router.route('/:sharepostID/:actionType?').put(async (req, res) => {
    // DONE: REVISE COMMENT
    if (req.params.actionType === 'comment_revise') {
        // TODO: 照理來說要處理跳脫啦...
        const commentReviseStrEscaped = SqlString.escape(
            req.body.data.commentReviseStr
        );

        if (commentReviseStrEscaped.indexOf('\\') !== -1) {
            console.log('commentReviseStr 被跳脫了');
            return res.json('跳脫');
        }

        const $comment_revise_sql = ` 
            UPDATE share_avatar_comments 
            SET share_post_comment_text = ?, updated_at = NOW() 
            WHERE share_post_comment_sid = ?
        `;
        const formatSql = SqlString.format($comment_revise_sql, [
            req.body.data.commentReviseStr,
            req.body.data.commentSid,
        ]);

        const [comment_revise_results] = await db.execute(formatSql);
        // console.log(comment_revise_results);

        if (comment_revise_results.affectedRows !== 1) {
            return res.send('評論修改出錯');
        }

        return res.json(comment_revise_results);
    }

    // TODO: REVISE POST
    if (req.params.actionType === 'post_revise') {
        let output = {
            postUpdateResult: false,
            tagsCreateResult: false,
            postsToTagsResult: false,
        };

        console.log(req.body);

        if (!res.locals.loginUser) {
            return res.send('請先登入');
        }

        // DONE: 統一跳脫
        const sharePostSid = SqlString.escape(req.body.sharePostSid);
        const sharePostTitle = SqlString.escape(req.body.sharePostTitle);
        const sharePostTag_1 = SqlString.escape(req.body.sharePostTag_1);
        const sharePostTag_2 = SqlString.escape(req.body.sharePostTag_2);
        const sharePostTag_3 = SqlString.escape(req.body.sharePostTag_3);
        const sharePostTextarea = SqlString.escape(req.body.sharePostTextarea);

        if (isNaN(Number(sharePostSid))) {
            console.log('sharePostAvatarSid 不是數字');
            return res.json('請不要想要攻擊');
        }

        if (sharePostTitle.indexOf('\\') !== -1) {
            console.log('sharePostTitle 被跳脫了');
            return res.json('跳脫');
        }

        if (sharePostTag_1.indexOf('\\') !== -1) {
            console.log('sharePostTag_1 被跳脫了');
            return res.json('跳脫');
        }

        if (sharePostTag_2.indexOf('\\') !== -1) {
            console.log('sharePostTag_2 被跳脫了');
            return res.json('跳脫');
        }

        if (sharePostTag_3.indexOf('\\') !== -1) {
            console.log('sharePostTag_3 被跳脫了');
            return res.json('跳脫');
        }

        // FIXME: 這樣英文不能有 ' 看狀況決定修不修
        if (sharePostTextarea.indexOf('\\') !== -1) {
            console.log('sharePostTextarea 被跳脫了');
            return res.json('跳脫');
        }

        if (req.body.sharePostTitle.length > 6) {
            return res.send('來生形象標題太長');
        }

        if (req.body.sharePostTag_1.length > 6) {
            return res.send('標籤一太長');
        }

        if (req.body.sharePostTag_2.length > 6) {
            return res.send('標籤二太長');
        }

        if (req.body.sharePostTag_3.length > 6) {
            return res.send('標籤三太長');
        }

        if (req.body.sharePostTextarea.length === 0) {
            return res.send('文章是空的啊');
        }

        if (req.body.sharePostTextarea.length > 168) {
            return res.send('文章太長');
        }

        // DONE: 修改文章
        const $post_update_sql = ` 
            UPDATE share_avatar_posts 
            SET share_post_text = ?, updated_at = NOW() 
            WHERE share_post_sid = ? 
        `;
        const formatSql = SqlString.format($post_update_sql, [
            req.body.sharePostTextarea,
            req.body.sharePostSid,
        ]);

        // console.log(formatSql);
        const [post_update_results] = await db.execute(formatSql);
        // console.log(post_update_results);

        if (!post_update_results.affectedRows) {
            return res.send('更新文章失敗');
        }

        output.postUpdateResult = true;

        // DONE: 新增標籤與否
        let tag_1_ID = 0; // 初始化
        let tag_2_ID = 0; // 初始化
        let tag_3_ID = 0; // 初始化

        // Tag_1
        // console.log('tag 1', sharePostTag_1);
        if (req.body.sharePostTag_1 !== '') {
            const $tag_1_isSet_sql = `
                SELECT share_post_tag_sid
                FROM share_avatar_tags
                WHERE share_post_tag_text = ${sharePostTag_1}
            `;
            const [tag_1_sid_isSet_result] = await db.query($tag_1_isSet_sql);

            // console.log(tag_1_sid_isSet_result);
            if (!tag_1_sid_isSet_result.length) {
                // 不存在就新增
                const $tag_create_sql = `
                    INSERT
                    INTO share_avatar_tags (
                        share_post_tag_text, share_post_tag_search_times
                    ) VALUES (
                        ${sharePostTag_1}, 0
                    )
                `;

                const [tag_create_result] = await db.execute($tag_create_sql);

                if (!tag_create_result.affectedRows) {
                    return res.send('標籤一新增失敗');
                }

                tag_1_ID = tag_create_result.insertId;
            }
        }

        // Tag 2
        // console.log('tag 2', sharePostTag_2);
        if (req.body.sharePostTag_2 !== '') {
            const $tag_2_isSet_sql = `
                SELECT share_post_tag_sid
                FROM share_avatar_tags
                WHERE share_post_tag_text = ${sharePostTag_2}
            `;
            const [tag_2_sid_isSet_result] = await db.query($tag_2_isSet_sql);

            // console.log(tag_2_sid_isSet_result);
            if (!tag_2_sid_isSet_result.length) {
                // 不存在就新增
                const $tag_create_sql = `
                    INSERT
                    INTO share_avatar_tags (
                        share_post_tag_text, share_post_tag_search_times
                    ) VALUES (
                        ${sharePostTag_2}, 0
                    )
                `;

                const [tag_create_result] = await db.execute($tag_create_sql);

                if (!tag_create_result.affectedRows) {
                    return res.send('標籤二新增失敗');
                }

                tag_2_ID = tag_create_result.insertId;
            }
        }

        // Tag 3
        // console.log('tag 3', sharePostTag_3);
        if (req.body.sharePostTag_3 !== '') {
            const $tag_3_isSet_sql = `
                SELECT share_post_tag_sid
                FROM share_avatar_tags
                WHERE share_post_tag_text = ${sharePostTag_3}
            `;
            const [tag_3_sid_isSet_result] = await db.query($tag_3_isSet_sql);

            // console.log(tag_3_sid_isSet_result);
            if (!tag_3_sid_isSet_result.length) {
                // 不存在就新增
                const $tag_create_sql = `
                    INSERT
                    INTO share_avatar_tags (
                        share_post_tag_text, share_post_tag_search_times
                    ) VALUES (
                        ${sharePostTag_3}, 0
                    )
                `;

                const [tag_create_result] = await db.execute($tag_create_sql);

                if (!tag_create_result.affectedRows) {
                    return res.send('標籤三新增失敗');
                }

                tag_3_ID = tag_create_result.insertId;
            }
        }

        output.tagsCreateResult = true;

        // TODO: 處理文章標籤對應
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // TODO:
        // 就的怎麼處理 新的譖麼錊理？

        // let tagsArray = [];

        // if (tag_1_ID !== 0) {
        //     tagsArray.push(tag_1_ID);
        // }

        // if (tag_2_ID !== 0) {
        //     tagsArray.push(tag_2_ID);
        // }

        // if (tag_3_ID !== 0) {
        //     tagsArray.push(tag_3_ID);
        // }

        // for (let i = 0; i < tagsArray.length; i++) {
        //     const $posts_to_tags_create_sql = `
        //         INSERT
        //         INTO share_avatar_posts_to_tags (
        //             share_post_sid, share_post_tag_sid
        //         ) VALUES (
        //             ${postID}, ${tagsArray[i]}
        //         )
        //     `;

        //     const [posts_to_tags_create_result] = await db.execute(
        //         $posts_to_tags_create_sql
        //     );

        //     if (posts_to_tags_create_result.affectedRows !== 1) {
        //         return res.json('新增標籤對應文章時出錯啦');
        //     }
        // }

        // output.postsToTagsResult = true;

        // res.json(output);
    }

    return res.send('其他的請求都不接受喔～');
});

router.route('/:sharepostID/:actionType?').delete(async (req, res) => {
    // DONE: DELETE COMMENT
    if (req.params.actionType === 'comment_delete') {
        // 稍微保護一下 不要隨便被亂刪資料
        // console.log(res.locals.loginUser);
        if (!res.locals.loginUser) {
            return res.send('請勿攻擊');
        }

        const $comment_delete_sql = ` 
            DELETE 
            FROM share_avatar_comments 
            WHERE share_post_comment_sid = ? 
            AND member_sid = ? 
        `;
        const formatSql = SqlString.format($comment_delete_sql, [
            req.body.commentSid,
            res.locals.loginUser.id,
        ]);

        const [comment_delete_results] = await db.execute(formatSql);
        // console.log(comment_delete_results);

        if (comment_delete_results.affectedRows !== 1) {
            return res.send('評論刪除出錯');
        }

        return res.json(comment_delete_results);
    }

    return res.send('其他的請求都不接受喔～');
});

module.exports = router;
