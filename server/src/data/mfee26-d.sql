-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2022-08-11 08:51:22
-- 伺服器版本： 10.4.24-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `mfee26-d`
--

-- --------------------------------------------------------

--
-- 資料表結構 `admin_test_jwt`
--

CREATE TABLE `admin_test_jwt` (
  `sid` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expires` varchar(255) DEFAULT NULL,
  `payload` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `admin_test_jwt`
--

INSERT INTO `admin_test_jwt` (`sid`, `member_sid`, `token`, `expires`, `payload`) VALUES
(20, 9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiYWNjb3VudCI6IkhhcHB5Q2F0MDkiLCJpYXQiOjE2NTkzNjAzOTJ9.L119afkYgJLyMgJmAAyuHr148_H5IfmrrbuonXcQDtw', '1659361592683', '{\"id\":9,\"account\":\"HappyCat09\"}'),
(21, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6IkhhcHB5Q2F0MDEiLCJpYXQiOjE2NTk0MTAyNDR9.FnevyouQqRWfOOYzPpPIO87-hqFWTVowIJvNoIeb7Sc', '1659411444353', '{\"id\":1,\"account\":\"HappyCat01\"}'),
(23, 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImFjY291bnQiOiJIYXBweUNhdDEwIiwiaWF0IjoxNjU5NDE0NjE3fQ.AsUBiqvKtd3BRIq28RONs3DWGGLrdoPtplH9a7tvj7U', '1659415817214', '{\"id\":10,\"account\":\"HappyCat10\"}'),
(24, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImFjY291bnQiOiJIYXBweUNhdDEyIiwiaWF0IjoxNjU5NDE1NDA2fQ.Sdb-iHJV936lBgaBaOGWESS78NIvV7QmCAxDBcBjkaA', '1659416606039', '{\"id\":12,\"account\":\"HappyCat12\"}'),
(25, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiYWNjb3VudCI6IkhhcHB5Q2F0MDciLCJpYXQiOjE2NTk0NDY1NDJ9.6hkhSxjE-gUvR0E4caVThp9BqehT2T6z_OFDiNbH6Nc', '1659447742919', '{\"id\":7,\"account\":\"HappyCat07\"}'),
(26, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudCI6IkhhcHB5Q2F0MDIiLCJpYXQiOjE2NTk0NDcyMTd9.kazSs15TlCgcy0ssLiwxwoXl-lAa7ICzAz26GB3WXGM', '1659448417609', '{\"id\":2,\"account\":\"HappyCat02\"}');

-- --------------------------------------------------------

--
-- 資料表結構 `body_parts`
--

CREATE TABLE `body_parts` (
  `parts_sid` int(11) NOT NULL,
  `part` varchar(255) DEFAULT NULL,
  `part_id` int(11) DEFAULT NULL,
  `part_cost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `city_type`
--

CREATE TABLE `city_type` (
  `city_sid` int(11) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `area_sid` int(11) DEFAULT NULL,
  `area_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `city_type`
--

INSERT INTO `city_type` (`city_sid`, `city`, `area_sid`, `area_name`) VALUES
(1, '基隆市', 1, '北部'),
(2, '台北市', 1, '北部'),
(3, '新北市', 1, '北部'),
(4, '桃園市', 1, '北部'),
(5, '新竹縣', 2, '中部'),
(6, '新竹市', 2, '中部'),
(7, '苗栗縣', 2, '中部'),
(8, '台中市', 2, '中部'),
(9, '彰化縣', 2, '中部'),
(10, '南投縣', 2, '中部'),
(11, '雲林縣', 2, '中部'),
(12, '嘉義縣', 3, '南部'),
(13, '嘉義市', 3, '南部'),
(14, '台南市', 3, '南部'),
(15, '高雄市', 3, '南部'),
(16, '屏東縣', 3, '南部'),
(17, '花蓮縣', 4, '東部'),
(18, '台東縣', 4, '東部'),
(19, '宜蘭縣', 4, '東部'),
(20, '澎湖縣', 5, '離島'),
(21, '金門縣', 5, '離島'),
(22, '連江縣', 5, '離島');

-- --------------------------------------------------------

--
-- 資料表結構 `cube`
--

CREATE TABLE `cube` (
  `member_sid` int(11) DEFAULT NULL,
  `cube_sid` int(11) NOT NULL,
  `cube_text` varchar(255) DEFAULT NULL,
  `cube_style_sid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `cube`
--

INSERT INTO `cube` (`member_sid`, `cube_sid`, `cube_text`, `cube_style_sid`) VALUES
(1, 1, '遇見你是我這一生中最美好的事！', 2),
(2, 2, '妳可知道妳的名字解釋了我的一生...', 3),
(3, 3, '讓我再嘗一口秋天的酒，一直往南方開不會太久。', 4),
(4, 4, '你若對自己誠實，日積月累，就無法對別人不忠了。', 5),
(5, 5, '我愛你，我愛你。', 7),
(6, 6, '我們總是記得一些逼自己忘記的事...', 8),
(7, 7, '有你我很開心！', 9),
(8, 8, '下輩子也要當一個柔軟的人，簡稱軟軟人。', 10),
(9, 10, '我和你道歉，也和你道別，再和自己道謝。', 11),
(11, 14, 'YEE', 16);

-- --------------------------------------------------------

--
-- 資料表結構 `cube_category`
--

CREATE TABLE `cube_category` (
  `cube_style_sid` int(11) NOT NULL,
  `cube_img_a` varchar(255) DEFAULT NULL,
  `cube_img_b` varchar(255) DEFAULT NULL,
  `cube_img_c` varchar(255) DEFAULT NULL,
  `cube_img_t` varchar(255) DEFAULT NULL,
  `cube_color_1` varchar(255) DEFAULT NULL,
  `cube_color_2` varchar(255) DEFAULT NULL,
  `cube_color_font` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `cube_category`
--

INSERT INTO `cube_category` (`cube_style_sid`, `cube_img_a`, `cube_img_b`, `cube_img_c`, `cube_img_t`, `cube_color_1`, `cube_color_2`, `cube_color_font`) VALUES
(2, '2_a', '2_b', '2_c', '2_t', '#ed1848', '#612680', '#612680'),
(3, '3_a', '3_b', '3_c', '3_t', '#612680', '#139dbf', '#ffc6d4'),
(4, '4_a', '4_b', '4_c', '4_t', '#e8b387', '#0f1746', '#e8b387'),
(5, '5_a', '5_b', '5_c', '5_t', '#e8b387', '#0f1746', '#0f1746'),
(7, '7_a', '7_b', '7_c', '7_t', '#ed1848', '#ffc6d4', '#eeeeee'),
(8, '8_a', '8_b', '8_c', '8_t', '#139dbf', '#0f1746', '#eeeeee'),
(9, '9_a', '9_b', '9_c', '9_t', '#006251', '#fdd31b', '#006251'),
(10, '10_a', '10_b', '10_c', '10_t', '#ed1848', '#612680', '#fdd31b'),
(11, '11_a', '11_b', '11_c', '11_t', '#ffc6d4', '#139dbf', '#139dbf'),
(12, '12_a', '12_b', '12_c', '12_t', '#ed1848', '#612680', '#006251'),
(13, '13_a', '13_b', '13_c', '13_t', '#fdd31b', '#612680', '#fdd31b'),
(14, '14_a', '14_b', '14_c', '14_t', '#006251', '#e8b387', '#006251'),
(16, '16_a', '16_b', '16_c', '16_t', '#139dbf', '#ffc6d4', '#139dbf'),
(17, '17_a', '17_b', '17_c', '17_t', '#0f1746', '#8890c1', '#0f1746'),
(18, '18_a', '18_b', '18_c', '18_t', '#006251', '#ffc6d4', '#e8b387'),
(19, '19_a', '19_b', '19_c', '19_t', '#139dbf', '#aee0d7', '#139dbf'),
(21, '21_a', '21_b', '21_c', '21_t', '#ffc6d4', '#139dbf', '#ffc6d4'),
(24, '24_a', '24_b', '24_c', '24_t', '#e8b387', '#006251', '#fdd31b'),
(28, '28_a', '28_b', '28_c', '28_t', '#fdd31b', '#006251', '#fdd31b'),
(30, '37_a', '37_b', '37_c', '37_t', '#ed1848', '#006251', '#e8b387'),
(31, '31_a', '31_b', '21_c', '31_t', '#ffc6d4', '#ed1848', '#eeeeee'),
(32, '32_a', '32_b', '32_c', '32_t', '#ffc6d4', '#ed1848', '#ed1848'),
(34, '34_a', '34_b', '34_c', '34_t', '#ffc6d4', '#139dbf', '#eeeeee'),
(35, '35_a', '35_b', '35_c', '35_t', '#ffc6d4', '#fdd31b', '#ed1848'),
(37, '37_a', '37_b', '37_c', '37_t', '#ed1848', '#006251', '#e8b387');

-- --------------------------------------------------------

--
-- 資料表結構 `cube_music`
--

CREATE TABLE `cube_music` (
  `cube_music_sid` int(11) NOT NULL,
  `cube_music_type` varchar(255) DEFAULT NULL,
  `cube_music_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `cube_music`
--

INSERT INTO `cube_music` (`cube_music_sid`, `cube_music_type`, `cube_music_name`) VALUES
(1, 'happiness', 'synthetic.mp3'),
(2, 'meditation', 'discovery.mp3'),
(3, 'sadness', 'undertow.mp3'),
(4, 'meditation', 'spacerain.mp3');

-- --------------------------------------------------------

--
-- 資料表結構 `date_price`
--

CREATE TABLE `date_price` (
  `year` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `date_price`
--

INSERT INTO `date_price` (`year`, `price`) VALUES
(2022, 10),
(2023, 20),
(2025, 20),
(2030, 80);

-- --------------------------------------------------------

--
-- 資料表結構 `event_cart`
--

CREATE TABLE `event_cart` (
  `order_sid` int(11) NOT NULL,
  `event_sid` int(11) DEFAULT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `event_cart`
--

INSERT INTO `event_cart` (`order_sid`, `event_sid`, `member_sid`, `created_at`) VALUES
(17, 23, 50, '2022-07-24 13:48:31'),
(18, 103, 50, '2022-07-24 13:48:35'),
(19, 24, 50, '2022-07-24 13:48:39'),
(97, 24, 100, '2022-07-30 16:03:20'),
(98, 22, 100, '2022-07-31 18:04:56');

-- --------------------------------------------------------

--
-- 資料表結構 `event_cart_creditcard`
--

CREATE TABLE `event_cart_creditcard` (
  `credit_sid` int(11) NOT NULL,
  `member_sid` varchar(255) DEFAULT NULL,
  `cardnumber` varchar(255) DEFAULT NULL,
  `cardholder` varchar(255) DEFAULT NULL,
  `ex_month` varchar(255) DEFAULT NULL,
  `ex_year` varchar(255) DEFAULT NULL,
  `cvv` varchar(255) DEFAULT NULL,
  `credit_created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `event_cart_creditcard`
--

INSERT INTO `event_cart_creditcard` (`credit_sid`, `member_sid`, `cardnumber`, `cardholder`, `ex_month`, `ex_year`, `cvv`, `credit_created_at`) VALUES
(6, '100', '32132132', '3213232132123123', '03', '2022', '321', '2022-07-29 17:36:03');

-- --------------------------------------------------------

--
-- 資料表結構 `event_cart_personinfo`
--

CREATE TABLE `event_cart_personinfo` (
  `sid` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile_city` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `ID` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `add_city` varchar(255) DEFAULT NULL,
  `add_town` varchar(255) DEFAULT NULL,
  `add_detail` varchar(255) DEFAULT NULL,
  `info_created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `event_cart_personinfo`
--

INSERT INTO `event_cart_personinfo` (`sid`, `member_sid`, `name`, `mobile_city`, `mobile`, `email`, `gender`, `ID`, `birthday`, `add_city`, `add_town`, `add_detail`, `info_created_at`) VALUES
(26, 100, '張容瑄', 'Vietnam +84', '0988681621', 'as840922@yahoo.com.tw', '男', 'R2241354564', '2022-07-06', NULL, NULL, '自立街174巷10號5樓', '2022-07-27 22:18:55'),
(27, 100, '張容瑄', 'Vietnam +84', '0988681621', 'as840922@yahoo.com.tw', '男', 'R2241354564', '2022-06-28', NULL, NULL, '自立街174巷10號5樓', '2022-07-27 22:19:36');

-- --------------------------------------------------------

--
-- 資料表結構 `event_order_detail`
--

CREATE TABLE `event_order_detail` (
  `event_order_sid` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `event_order_detail` varchar(255) DEFAULT NULL,
  `order_created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `event_order_detail`
--

INSERT INTO `event_order_detail` (`event_order_sid`, `member_sid`, `event_order_detail`, `order_created_at`) VALUES
(8, 100, '22,107', '2022-07-27'),
(9, 100, '22,107', '2022-07-27'),
(10, 100, '22,107,103', '2022-07-27'),
(11, 100, '22,107,103', '2022-07-27'),
(15, 100, '22,23,24,75', '2022-07-28'),
(16, 100, '22,23,24,75', '2022-07-28'),
(17, 100, '22,23,24,75', '2022-07-28'),
(19, 100, '22,23,24,75,24', '2022-07-28'),
(50, 100, '23,28', '2022-07-28');

-- --------------------------------------------------------

--
-- 資料表結構 `good_deed_games`
--

CREATE TABLE `good_deed_games` (
  `sid` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `game_name` varchar(255) DEFAULT NULL,
  `game_detail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `good_deed_games`
--

INSERT INTO `good_deed_games` (`sid`, `game_id`, `game_name`, `game_detail`) VALUES
(1, 1, '扶老奶奶過馬路遊戲', '在可怕的車流中 帶領老奶奶過馬路 實在是功德一件'),
(2, 2, '消業障遊戲', '透過小球碎掉業障');

-- --------------------------------------------------------

--
-- 資料表結構 `good_deed_games_record`
--

CREATE TABLE `good_deed_games_record` (
  `sid` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `member_account` varchar(255) DEFAULT NULL,
  `member_name` varchar(255) DEFAULT NULL,
  `member_birth` date DEFAULT NULL,
  `member_death` date DEFAULT NULL,
  `play_date` datetime DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `game_score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `good_deed_games_record`
--

INSERT INTO `good_deed_games_record` (`sid`, `member_sid`, `member_account`, `member_name`, `member_birth`, `member_death`, `play_date`, `game_id`, `game_score`) VALUES
(1, 1, 'snowvalley28', '蔣阿水', '1891-02-08', '1931-08-25', '2019-02-23 00:00:00', 1, 55),
(2, 2, 'showgi1103', '李秀枝', '1923-11-03', NULL, '2020-05-02 00:00:00', 1, 23);

-- --------------------------------------------------------

--
-- 資料表結構 `location`
--

CREATE TABLE `location` (
  `l_sid` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `location`
--

INSERT INTO `location` (`l_sid`, `location`) VALUES
(1, '全球'),
(2, '台灣'),
(3, '台北'),
(4, '桃園'),
(5, '新竹'),
(6, '苗栗'),
(7, '南投'),
(8, '台中'),
(9, '彰化'),
(10, '雲林'),
(11, '嘉義'),
(12, '台南'),
(13, '高雄'),
(14, '屏東'),
(15, '宜蘭'),
(16, '花蓮'),
(17, '台東');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `sid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `deathdate` date DEFAULT NULL,
  `isdead` varchar(255) DEFAULT 'false',
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gooddeed_score` int(11) DEFAULT NULL,
  `profile_picture` int(11) DEFAULT NULL,
  `passcode` varchar(255) DEFAULT NULL,
  `create_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`sid`, `name`, `birthdate`, `deathdate`, `isdead`, `mobile`, `email`, `account`, `password`, `gooddeed_score`, `profile_picture`, `create_at`) VALUES
(1, 'the first cat', NULL, NULL, 'false', '', 'HappyCat01@gmail.com', 'HappyCat01', '$2a$10$.Xh/TQA3aVJ.orVOX1JRZO8K3hB9rdoe7RydbkYih97T1msjAzpKq', NULL, NULL, '2022-06-09 05:52:24'),
(2, '貓貓貓', NULL, NULL, 'false', '', 'HappyCat02@gmail.com', 'HappyCat02', '$2y$10$NYuxH3UUfyHRr8yjeDo0Ou/zw83PT/hjbaAwWQ6u.MVlwhS2KMct6', NULL, NULL, '2022-06-09 05:52:51'),
(3, '九天玄女不在這', NULL, NULL, 'false', '', 'HappyCat03@gmail.com', 'HappyCat03', '$2y$10$QCyABgd5IjBYYmQhnK0bpeBjSOKzSjiPbyI8fFPpV.cBoclFe8f1.', NULL, NULL, '2022-06-09 05:53:34'),
(4, 'Bible Thumb', NULL, NULL, 'false', '', 'HappyCat04@gmail.com', 'HappyCat04', '$2y$10$xyN7xDkGJ5SustZEWCDyIuA/7RdTp0Y3yg4MhtFPFyzmnmayB9EZC', NULL, NULL, '2022-06-09 05:54:15'),
(5, '偷尼史塔克 Tony Stark ', '1990-06-14', '2022-06-02', 'false', '0977101050', 'HappyCat05@gmail.com', 'HappyCat05', '$2y$10$sFaM2bucSZ9h0bRb9vXYJuwSy1.YS7eHOutpxih.qfOieXQX1b6ze', NULL, NULL, '2022-06-09 05:54:42'),
(6, '怎一直下雨', '1990-03-05', '2022-05-31', 'false', '', 'HappyCat06@gmail.com', 'HappyCat06', '$2y$10$KQFhzDlfZFdk.stmlCA7U.il3fDWO2z0kkVzrHuF9SJPIgNXWKAp.', NULL, NULL, '2022-06-09 05:55:06'),
(7, '趕著投胎', NULL, NULL, 'false', '', 'HappyCat07@gmail.com', 'HappyCat07', '$2y$10$Wy1j.2RcH0cA565y0kP2I.yIGvH8rdoEFXhWRokuDHgOerj1NNG9u', NULL, NULL, '2022-06-09 05:55:27'),
(8, '咖啡因成癮重症患者', NULL, NULL, 'false', '', 'HappyCat08@gmail.com', 'HappyCat08', '$2y$10$hfdvXtFq2/leKrM2jLXxf.L1YiKAr5wMCq7.rp69fiSgoG3pnJlsK', NULL, NULL, '2022-06-09 05:55:47'),
(9, '陳怡君', NULL, NULL, 'false', '', 'HappyCat09@gmail.com', 'HappyCat09', '$2y$10$7zyt3mR2ghfGKn9xkEWgdeXlmxoRy4rm3DmrP/3kDFMXoIPPEj/wy', NULL, NULL, '2022-06-09 05:56:28'),
(10, '總有幾隻貓的', NULL, NULL, 'false', '', 'HappyCat10@gmail.com', 'HappyCat10', '$2y$10$n3p/32p42bi1QqX/U0KjBe4Yb0WdAI.8UaoZH3tiRR8NbBaxHGcOK', NULL, NULL, '2022-06-09 05:56:51'),
(11, 'unhappy cat', NULL, NULL, 'true', '', 'HappyCat11@gmail.com', 'HappyCat11', '$2y$10$JG.LjNM0flM7vAV8zkh6PO3Hb2bgA3c8xKW83W2qbgJgns/n/Hdoa', NULL, NULL, '2022-06-09 05:57:16'),
(12, '靈魂急轉彎', '1990-06-15', '2022-06-07', 'false', '', 'HappyCat12@gmail.com', 'HappyCat12', '$2y$10$7.aum6zzCAAX1XsrQyhOf.U8r5MrG586P2fdGiW27WfBOztqK4IHa', NULL, NULL, '2022-06-09 05:57:37'),
(13, '', NULL, NULL, 'false', '', 'admin@gmail.com', 'Admin', '$2y$10$0DADDxhf55DPxOKcyISJt.L0uHOkeiSh7J/lTqQ73jMYj1qhLBrBW', NULL, NULL, '2022-06-09 17:51:04'),
(14, '', NULL, NULL, 'false', '', 'HappyCat13@gmail.com', 'HappyCat13', '$2y$10$HX8f.Hc7la1jgapWVPVjtuSJ.RTjTgK9ZohqVUX5ean5kn2.OZgzC', NULL, NULL, '2022-06-09 19:26:43'),
(15, '', NULL, NULL, 'false', '', 'HappyCat14@gmail.com', 'HappyCat14', '$2y$10$rMPZyA.6wVgZHh2tskYwSOsHd0AiFNAdAU0rD5qS3SM1nZ0NTlsQ6', NULL, NULL, '2022-06-09 19:27:35'),
(16, '', NULL, NULL, 'false', '', 'HappyCat15@gmail.com', 'HappyCat15', '$2y$10$dIWMYfd8WvjFaDuPfr5FF.gSfzczdVnmuy591Ku3fcPF64e8hbPOO', NULL, NULL, '2022-06-09 19:28:13'),
(17, '', NULL, NULL, 'false', '', 'HappyCat16@gmail.com', 'HappyCat16', '$2y$10$h6azphKhwhRq8BeaTzAHQeUlH3grQEuFordDuUw2aFIo.EXdKiGmS', NULL, NULL, '2022-06-09 19:28:38'),
(18, '', NULL, NULL, 'false', '', 'HappyCat17@gmail.com', 'HappyCat17', '$2y$10$Z6UOfMHaJr8dleAdAWixNu6BZNXKK1q6kJofTHiTtnRXJ3./1P5i.', NULL, NULL, '2022-06-09 19:28:56'),
(19, '', NULL, NULL, 'false', '', 'HappyCat18@gmail.com', 'HappyCat18', '$2y$10$Evne7/6E0Ryb.c.ywAlj/.0zXlPfpvjPIAeWn6WNsu/AweIKcTh9a', NULL, NULL, '2022-06-09 19:29:10'),
(20, '', NULL, NULL, 'false', '', 'HappyCat19@gmail.com', 'HappyCat19', '$2y$10$oa7Bc0HTZ9dCfoOWxYJNaOomtguDOXlUfwAAQ7n955AFju6ccOIum', NULL, NULL, '2022-06-09 19:30:27'),
(21, '', NULL, NULL, 'false', '', 'HappyCat20@gmail.com', 'HappyCat20', '$2y$10$dulMYVhaUT8iNiYoUF78Oufc13.1bV7zTcsBlHjH0dtqX2JW1U/yG', NULL, NULL, '2022-06-09 19:30:39'),
(22, '', NULL, NULL, 'false', '', 'HappyCat21@gmail.com', 'HappyCat21', '$2y$10$agYKF2IL4CKcqQg4MEBqd.Kij2eJYsI2.OVJqRUMzZmeXx2K569Xq', NULL, NULL, '2022-06-09 19:30:49'),
(23, '', NULL, NULL, 'false', '', 'HappyCat22@gmail.com', 'HappyCat22', '$2y$10$7nvQ.ncWWItOddNTGDUGVOKOOVkKZHcNCiAyk85CjxAyNr9rH6yKK', NULL, NULL, '2022-06-09 19:31:01'),
(24, '', NULL, NULL, 'false', '', 'HappyCat23@gmail.com', 'HappyCat23', '$2y$10$ZGAPY7FVslnPzu6x63ad9OuyQ0g7ej/g8PDgz/k3p5Kv.WgkTM2N2', NULL, NULL, '2022-06-09 19:31:12'),
(25, '', NULL, NULL, 'false', '', 'HappyCat24@gmail.com', 'HappyCat24', '$2y$10$BHZAB6wTXsyvQVKz1ggpAOKoyz2aCnF7/tzbaCeZ5xK7pgtKF5c96', NULL, NULL, '2022-06-09 19:31:23'),
(26, '', NULL, NULL, 'false', '', 'HappyCat25@gmail.com', 'HappyCat25', '$2y$10$KP/vubfTBUf65ziMvrDnTuMTe35AkW9qQ65c0dzGj0G0lr62hRnnW', NULL, NULL, '2022-06-09 19:31:56'),
(27, '', NULL, NULL, 'false', '', 'HappyCat26@gmail.com', 'HappyCat26', '$2y$10$RP5WMjnK0lRgl2Y84aaZn.Zr9I.fCf5HF8BN1iomUD7v9QB0hSy3u', NULL, NULL, '2022-06-09 19:32:15'),
(28, '', NULL, NULL, 'false', '', 'HappyCat27@gmail.com', 'HappyCat27', '$2y$10$5446DawwHc8AOJAP1lc2QexLF4y1VNA0F1RN4OM18JcMO3wq/mlqm', NULL, NULL, '2022-06-09 19:32:46'),
(29, '', NULL, NULL, 'false', '', 'HappyCat28@gmail.com', 'HappyCat28', '$2y$10$8FJiwaznH232h48wk7lHR.uyDJnthf3ADnYsERlTbefUzB.CpoWcu', NULL, NULL, '2022-06-09 19:32:58'),
(30, '', NULL, NULL, 'false', '', 'HappyCat29@gmail.com', 'HappyCat29', '$2y$10$gP3HIA0EXMDh9qvUJHPQSe/hp2U7qqgaCn9/szImsEsj3sAlwlaEu', NULL, NULL, '2022-06-09 19:33:10'),
(31, '', NULL, NULL, 'false', '', 'HappyCat30@gmail.com', 'HappyCat30', '$2y$10$OpLdm4HUzxpgmE2AO1.VGuT9LNha8Uf3u7HPr5irykac.IzHsy5oq', NULL, NULL, '2022-06-09 19:33:22'),
(32, '', NULL, NULL, 'false', '', 'HappyCat31@gmail.com', 'HappyCat31', '$2y$10$otVp1Ic9lSyMKkJPbwJM/ObXPky23VVmAx4UU/OIU9dtUQBYxPCga', NULL, NULL, '2022-06-09 19:33:35'),
(33, '快 樂 貓', NULL, NULL, 'false', '0988000111', 'HappyCat32@gmail.com', 'HappyCat32', '$2y$10$A4479RQRwSNLT5nSFUCFhecaDcEshF980fhqCE9HzuLjW83GWys1i', NULL, NULL, '2022-06-09 19:33:49'),
(34, '', NULL, NULL, 'false', '', 'HappyCat33@gmail.com', 'HappyCat33', '$2y$10$nCEH1Lpgv82C.T7HsVbOJOU7Lhhi1I4CAlICGS5NOf/HEyFeclOhm', NULL, NULL, '2022-06-09 19:34:02'),
(35, '', NULL, NULL, 'false', '', 'HappyCat34@gmail.com', 'HappyCat34', '$2y$10$b6qvb7RlxSExUOPcASuQD.toGgWKuTJlqUQd/fT6nyI3d7Y2km7Pm', NULL, NULL, '2022-06-09 19:34:29'),
(36, '', NULL, NULL, 'false', '', 'HappyCat35@gmail.com', 'HappyCat35', '$2y$10$vRoey8TpPXJuH5osqirV/OAYl2vtPUYjgpbpSdd4bUENbGHN1gsCK', NULL, NULL, '2022-06-09 19:34:44'),
(37, '', NULL, NULL, 'false', '', 'HappyCat36@gmail.com', 'HappyCat36', '$2y$10$pM5FXJZl6YpPh/rkP/QXme.4oJa9ZgVZyWeamYUSG1z2VjaUH8/OW', NULL, NULL, '2022-06-09 19:34:56'),
(38, '', NULL, NULL, 'false', '', 'HappyCat37@gmail.com', 'HappyCat37', '$2y$10$ipQo49pUVhT0sMsEGfn2T.AhffoofpElG.6MoBBnD9FfqkuxutEBa', NULL, NULL, '2022-06-09 19:35:09'),
(39, '', NULL, NULL, 'false', '', 'HappyCat38@gmail.com', 'HappyCat38', '$2y$10$FZlahkLFTItFsZcL7YEgJOk76E/p7ar4R6XiKBB78C6g3mHFzEevC', NULL, NULL, '2022-06-09 19:35:22'),
(40, '', NULL, NULL, 'false', '', 'HappyCat39@gmail.com', 'HappyCat39', '$2y$10$OY5sUwd9AsfDjjd1EceA0OFd.ZfEi.GN8jbfQo1Btgqzfeq3MpKSK', NULL, NULL, '2022-06-09 19:35:40'),
(41, '', NULL, NULL, 'false', '', 'HappyCat40@gmail.com', 'HappyCat40', '$2y$10$gd8dE6FN/DqwapbjZtEN3uu.mfPei6Y0n4g5nqivLFWL1Zw4EoCp.', NULL, NULL, '2022-06-09 19:35:53'),
(42, '', NULL, NULL, 'false', '', 'HappyCat41@gmail.com', 'HappyCat41', '$2y$10$bd.yjSGmWpAWEiLudnHeRuttOa6Sn54dqtjtDrrwjjxfvd39.zsUu', NULL, NULL, '2022-06-09 19:36:06'),
(43, '', NULL, NULL, 'false', '', 'HappyCat42@gmail.com', 'HappyCat42', '$2y$10$fEnbjF3O3xyfHQR8WhCgXei3P3CzEu4m/b3eH3L6l0DXqo.UF1E/e', NULL, NULL, '2022-06-09 19:36:21'),
(44, '', NULL, NULL, 'false', '', 'HappyCat43@gmail.com', 'HappyCat43', '$2y$10$8bM6.kEcw2Rt6yAeS3Tap.tAa/H4w.5lM0GBghC0wsOk11bqlC6tu', NULL, NULL, '2022-06-09 19:36:33'),
(45, '', NULL, NULL, 'false', '', 'HappyCat44@gmail.com', 'HappyCat44', '$2y$10$Ajm96pUGSvdNpaQWAPyRiuNTt2Xf6r2/Nmf9JgRu4lBTSly3BevE2', NULL, NULL, '2022-06-09 19:37:33'),
(46, '', NULL, NULL, 'false', '', 'HappyCat45@gmail.com', 'HappyCat45', '$2y$10$xxuG/2G2koeshecupsmbaO3Ro3qnxsACAvQsCQbeuO8wM7LuAJq8O', NULL, NULL, '2022-06-09 19:37:43'),
(47, '', NULL, NULL, 'false', '', 'HappyCat46@gmail.com', 'HappyCat46', '$2y$10$ij1SYBtEzFnUaJu93aWjhu9xhoEmKnjMwCgjt99VVhK5VHTqUfF/G', NULL, NULL, '2022-06-09 19:37:55'),
(48, '', NULL, NULL, 'false', '', 'HappyCat47@gmail.com', 'HappyCat47', '$2y$10$Fgw/ds47YItdV5MpXMobnuNGraiUdo7rzImZRYs/Rm42xcsASK2m6', NULL, NULL, '2022-06-09 19:38:07'),
(49, '', NULL, NULL, 'false', '', 'HappyCat48@gmail.com', 'HappyCat48', '$2y$10$.mrsX56BQMK/xqi2SR6xGOysfnyx0BRkjPaajY0X3AiEaSVW/kgsW', NULL, NULL, '2022-06-09 19:38:19'),
(50, '', NULL, NULL, 'false', '', 'HappyCat49@gmail.com', 'HappyCat49', '$2y$10$pdsmbCihG98YAGamMQS/F.VWC0ZqZqcStTPRKCX7QzENwNZqsxIlK', NULL, NULL, '2022-06-09 19:38:30'),
(51, '', NULL, NULL, 'false', '', 'HappyCat50@gmail.com', 'HappyCat50', '$2y$10$.9QHiWdOhPm/vwq2f/XlGOdu/5VSCEftWlxT7T.4D/Q3yv2yY6BYu', NULL, NULL, '2022-06-09 19:38:42'),
(52, '', NULL, NULL, 'false', '', 'HappyCat51@gmail.com', 'HappyCat51', '$2y$10$6A83d7hqQkRtgTbtiMrGqunUjsiUiHNFe5P/UVA04JXlmJMEtncd6', NULL, NULL, '2022-06-09 19:38:59'),
(53, '', NULL, NULL, 'false', '', 'HappyCat52@gmail.com', 'HappyCat52', '$2y$10$.9GoHgdzK96cbf3m8gqy1.K6TtepALCRehvCL8VAvYA6fccvs2DBi', NULL, NULL, '2022-06-09 19:39:10'),
(54, '', NULL, NULL, 'false', '', 'HappyCat53@gmail.com', 'HappyCat53', '$2y$10$SLP40Q0AJ7D4lIdb62sC5OuVQMiy3zqpMgn1ua/ltJ4Ssv5MuwmVa', NULL, NULL, '2022-06-09 19:39:22'),
(55, '', NULL, NULL, 'false', '', 'HappyCat54@gmail.com', 'HappyCat54', '$2y$10$BdICP6cq1mmSBq2kRKuppuyltkVHhbCtLhTID2rtpqtq6OI0Jf4um', NULL, NULL, '2022-06-09 19:39:39'),
(56, '', NULL, NULL, 'false', '', 'HappyCat55@gmail.com', 'HappyCat55', '$2y$10$0kU9UB.idFLLuXaoJFB14./NFJPEGlLjPcqqrrb68rC3uR9/zycDe', NULL, NULL, '2022-06-09 19:39:51'),
(57, '', NULL, NULL, 'false', '', 'HappyCat56@gmail.com', 'HappyCat56', '$2y$10$fYDIgfNbawaKuf.XHS9jae8zvNqG050SMoUv2hTz3Yo5dSV7zK646', NULL, NULL, '2022-06-09 19:40:13'),
(58, '', NULL, NULL, 'false', '', 'HappyCat57@gmail.com', 'HappyCat57', '$2y$10$8JZEm/4C3NE9nPUb4gC/AeYXmviYGHfIkGf9BkLRztOF4SsvpVA42', NULL, NULL, '2022-06-09 19:40:26'),
(59, '', NULL, NULL, 'false', '', 'HappyCat58@gmail.com', 'HappyCat58', '$2y$10$trfGqH3BxYf.5h6111Jngeg476d/wI/lFdQ2/OumhqJv8QVgsDHpu', NULL, NULL, '2022-06-09 19:40:39'),
(60, '', NULL, NULL, 'false', '', 'HappyCat59@gmail.com', 'HappyCat59', '$2y$10$Z8IDndgNS/kwSrNAHt1xd.X.3DL4jKZ28RUHylFiTFpWzRofjkrwO', NULL, NULL, '2022-06-09 19:40:50'),
(61, '', NULL, NULL, 'false', '', 'HappyCat60@gmail.com', 'HappyCat60', '$2y$10$SPM8Ftb51pzdpG3GJPoAjuqYPHztHo/uR2QpUFLgB/oUK2dDzSofe', NULL, NULL, '2022-06-09 19:41:03'),
(62, '', NULL, NULL, 'false', '', 'HappyCat61@gmail.com', 'HappyCat61', '$2y$10$k1H9MnKnudr76CJ/3Axlt.rHyDyNx1wgpll/lBOakJXNuamFeNoRi', NULL, NULL, '2022-06-09 19:41:14'),
(63, '', NULL, NULL, 'false', '', 'HappyCat62@gmail.com', 'HappyCat62', '$2y$10$hdqf0iZw9NSTAON89V6QCOtv7I7Q2QjvQKv9Sp6naHSfTNeeFSaiS', NULL, NULL, '2022-06-09 19:41:34'),
(64, '', NULL, NULL, 'false', '', 'HappyCat63@gmail.com', 'HappyCat63', '$2y$10$5oA0Xn9p6KzH1Zz0axO2ceUQjYUbsnsQaeZ.roI37dEw5xmGnwqMK', NULL, NULL, '2022-06-09 19:42:03'),
(65, '', NULL, NULL, 'false', '', 'HappyCat64@gmail.com', 'HappyCat64', '$2y$10$AFKm3fddtESWbIOJoHY5peSpHWOUBTHDG90HiR3/k2z/gj.KUaR7K', NULL, NULL, '2022-06-09 19:42:22'),
(66, '', NULL, NULL, 'false', '', 'HappyCat65@gmail.com', 'HappyCat65', '$2y$10$kBCZt1NkU3ESn9sLl.jjLuF7WvWnIgced4J6Pjqqc6Cnjq9TWypc.', NULL, NULL, '2022-06-09 19:42:33'),
(67, '', NULL, NULL, 'false', '', 'HappyCat66@gmail.com', 'HappyCat66', '$2y$10$juJHFomlxpWf4eLQXQNzLOMmYISl8e.XZuhhp9fSvw6jxJ9BV6KZ2', NULL, NULL, '2022-06-09 19:42:45'),
(68, '', NULL, NULL, 'false', '', 'HappyCat67@gmail.com', 'HappyCat67', '$2y$10$tzu3RhCxRXFl8fmQIafCD.XnW3tdZU/.T.RGyU5hnRjK0af.INstC', NULL, NULL, '2022-06-09 19:42:59'),
(69, '', NULL, NULL, 'false', '', 'HappyCat68@gmail.com', 'HappyCat68', '$2y$10$uqjh2NeH.cgF8GJwNr2dJecRZIt5Z6TsLOrqCwarcAOVqWO3XGwsu', NULL, NULL, '2022-06-09 19:43:29'),
(70, '', NULL, NULL, 'false', '', 'HappyCat69@gmail.com', 'HappyCat69', '$2y$10$.OSdRIt/R9NWruh3gIex8.BN3OcL65SIsUhaMLI86efaai5D.ZdEq', NULL, NULL, '2022-06-09 19:43:40'),
(71, '', NULL, NULL, 'false', '', 'HappyCat70@gmail.com', 'HappyCat70', '$2y$10$FvdIZpomJviDE.shvxSrBeiXhxVQs7pOg1Qf3SedRdzE1IqaYT4Em', NULL, NULL, '2022-06-09 19:43:56'),
(72, '', NULL, NULL, 'false', '', 'HappyCat71@gmail.com', 'HappyCat71', '$2y$10$49yU4rxHhgYbZGe1PH5Mbe31u9ydRwbsNnAdmplkl4bCpAaQ3MXh.', NULL, NULL, '2022-06-09 19:44:09'),
(73, '', NULL, NULL, 'false', '', 'HappyCat72@gmail.com', 'HappyCat72', '$2y$10$jF7H..8R7I4sx31c3hwjlOK710iPlPr5pd3WsQc5MC7PlllMU6/2O', NULL, NULL, '2022-06-09 19:44:18'),
(74, '', NULL, NULL, 'false', '', 'HappyCat73@gmail.com', 'HappyCat73', '$2y$10$G4L6kn4WcjefItdFz2KdpebL7WVJpbbOW/edLZ2v/zFXlbkjyxZoG', NULL, NULL, '2022-06-09 19:44:32'),
(75, '', NULL, NULL, 'false', '', 'HappyCat74@gmail.com', 'HappyCat74', '$2y$10$QKcXwYG1245itLJPsXeSTOqwtCXsaTiod0T4cXu84uGtQwdCVsFzW', NULL, NULL, '2022-06-09 19:44:43'),
(76, '', NULL, NULL, 'false', '', 'HappyCat75@gmail.com', 'HappyCat75', '$2y$10$duWwdsiBLafSbtntJcpnFO2ekTEr9cLRZ/IL1AK7inXXOEOpSWl5G', NULL, NULL, '2022-06-09 19:44:54'),
(77, '', NULL, NULL, 'false', '', 'HappyCat76@gmail.com', 'HappyCat76', '$2y$10$k2M5XoSSkzSR57r3zPeB/eQTe.1FxwU2fBD1gW0lAhmUl/CSNF..e', NULL, NULL, '2022-06-09 19:45:04'),
(78, '', NULL, NULL, 'false', '', 'HappyCat77@gmail.com', 'HappyCat77', '$2y$10$YQ4TK7JVPWOdMJOty61I8O172FYdC1WTI8xFRpUMrl.pzx8q5Rztu', NULL, NULL, '2022-06-09 19:45:15'),
(79, '', NULL, NULL, 'false', '', 'HappyCat78@gmail.com', 'HappyCat78', '$2y$10$6yKR6oZQ63JD3seB2YV5a.8l4EgYY8JeMAca/LF40it88ajGA0PTi', NULL, NULL, '2022-06-09 19:45:26'),
(80, '', NULL, NULL, 'false', '', 'HappyCat79@gmail.com', 'HappyCat79', '$2y$10$5J0OZ/SAdIT6xL3qRF1I2.KenZNjxaCUzmFTo.73JiYobvByemQ16', NULL, NULL, '2022-06-09 19:45:36'),
(81, '', NULL, NULL, 'false', '', 'HappyCat80@gmail.com', 'HappyCat80', '$2y$10$mC5PqOLTH2vBX.38RuB.5eg0PS1CGYmlAqJutcEKBq0sahcsZbJKK', NULL, NULL, '2022-06-09 19:45:48'),
(82, '', NULL, NULL, 'false', '', 'HappyCat81@gmail.com', 'HappyCat81', '$2y$10$xQNe9Q2hO5hkLZjL/JYKJelEW8yTtUipcJv5HnNLJk6UnXt.F5sp.', NULL, NULL, '2022-06-09 19:46:00'),
(83, '', NULL, NULL, 'false', '', 'HappyCat82@gmail.com', 'HappyCat82', '$2y$10$bGqXt7.kSjEPaW.W06CU4u492AQEZIXNyvTA7GXxuNP8p5jeW800G', NULL, NULL, '2022-06-09 19:46:10'),
(84, '', NULL, NULL, 'false', '', 'HappyCat83@gmail.com', 'HappyCat83', '$2y$10$rCgyBnD0GXEiI3FuedDzReGTeWgy6znclo7F9h6FYgJBiv/Z2w0E6', NULL, NULL, '2022-06-09 19:46:22'),
(85, '', NULL, NULL, 'false', '', 'HappyCat84@gmail.com', 'HappyCat84', '$2y$10$pPIOMPi3yXXgW.RrUDnlQOTbXTe2PQux64XTDJF5.w.ZTrn24i1Le', NULL, NULL, '2022-06-09 19:46:35'),
(86, '', NULL, NULL, 'false', '', 'HappyCat85@gmail.com', 'HappyCat85', '$2y$10$aq2q/rDhcAodrii0LuSyi..BzMdvf6BaqARpU1Ws5CSuQ53R6WHVC', NULL, NULL, '2022-06-09 19:46:45'),
(87, '', NULL, NULL, 'false', '', 'HappyCat86@gmail.com', 'HappyCat86', '$2y$10$Aw5ji0J7d2lwsfiPvtD2peiN972QtXx4xs1vkRWAX6xyNm8mYnIXG', NULL, NULL, '2022-06-09 19:47:16'),
(88, '', NULL, NULL, 'false', '', 'HappyCat87@gmail.com', 'HappyCat87', '$2y$10$xoIBgG/eLLQkT7gWnaPOieLStDlCdJLvsUbLoKR52PsV4sZydKtkC', NULL, NULL, '2022-06-09 19:47:30'),
(89, '', NULL, NULL, 'false', '', 'HappyCat88@gmail.com', 'HappyCat88', '$2y$10$VYbXm4J.SP3xwioUQY62JOu3R.q9AVuFBk3u7IDCrp5BV0U1BquBO', NULL, NULL, '2022-06-09 19:47:44'),
(90, '', NULL, NULL, 'false', '', 'HappyCat89@gmail.com', 'HappyCat89', '$2y$10$UfSIVdnMzRG/GIh0XZhvpO6BJ2k1GEF0IzbVP9pUdMpwwJHJlDaCe', NULL, NULL, '2022-06-09 19:47:59'),
(91, '', NULL, NULL, 'false', '', 'HappyCat90@gmail.com', 'HappyCat90', '$2y$10$PxsVj0OwAqHrZdmzgofzH.ubkfJEwr8rNHF.KMcY1JL1kKwnwa/4e', NULL, NULL, '2022-06-09 19:48:11'),
(92, '', NULL, NULL, 'false', '', 'HappyCat91@gmail.com', 'HappyCat91', '$2y$10$Pcj0QNHU6KzdATk1wXrVP.mLvs5Il/.Dh5Q2BcAsWsZFZJxxDH8VK', NULL, NULL, '2022-06-09 19:48:30'),
(93, '', NULL, NULL, 'false', '', 'HappyCat92@gmail.com', 'HappyCat92', '$2y$10$VP1S3X5Cs4y0nb1d7Dij6exD/6.GmlbrvxipVAfY9GvmdoycXp49C', NULL, NULL, '2022-06-09 19:48:42'),
(94, '', NULL, NULL, 'false', '', 'HappyCat93@gmail.com', 'HappyCat93', '$2y$10$vWd4ghdJ/uvgCItzwJT4muZzJwPpQdNgF79WgKdIPFYV9qOTbF15y', NULL, NULL, '2022-06-09 19:49:07'),
(95, '', NULL, NULL, 'false', '', 'HappyCat94@gmail.com', 'HappyCat94', '$2y$10$vW/zubmPsnn83grTYA63mOLLN0QMEZ9HVZ6ODp9Lgkp/VjyZZKoOC', NULL, NULL, '2022-06-09 19:49:23'),
(96, '', NULL, NULL, 'false', '', 'HappyCat95@gmail.com', 'HappyCat95', '$2y$10$6kY58NIrhoOMO44E4ESlsO.5Oc64Y1OYDZ4qXHKhlYTh1tO4Y.doa', NULL, NULL, '2022-06-09 19:49:37'),
(97, '', NULL, NULL, 'false', '', 'HappyCat96@gmail.com', 'HappyCat96', '$2y$10$I2JM6zs.tvk5CmaHCoIW.ei6Hi2ruz9TWydbeAN/6Mg9qSO8bC1J6', NULL, NULL, '2022-06-09 19:49:49'),
(98, '', NULL, NULL, 'false', '', 'HappyCat97@gmail.com', 'HappyCat97', '$2y$10$ioWw7u0Zk5l7C/1UDjQPt.01/3bOL5LPqIPVqYKLtWYuZ8H/0bTIq', NULL, NULL, '2022-06-09 19:49:59'),
(99, '', NULL, NULL, 'false', '', 'HappyCat98@gmail.com', 'HappyCat98', '$2y$10$.CdtzoocaY4YOYIxkxm6j.B5QeG01NbHPhwXkQrWB9L7NwUVjRG3S', NULL, NULL, '2022-06-09 19:50:09'),
(100, '', NULL, NULL, 'false', '', 'HappyCat99@gmail.com', 'HappyCat99', '$2y$10$Aaoh2lzg8fPn4Mb/ScmnEOhglXdwr8mLL0hf4CY3X4A.BC8tLIo3y', NULL, NULL, '2022-06-09 19:50:20'),
(101, '快樂貓', NULL, NULL, 'false', '0900111222', 'HappyCat100@gmail.com', 'HappyCat100', '$2y$10$RscDUr0vT/ndUx9ndYpvNe49wvxixQYYBQmL7rUNP1frBs/Tc9FVG', NULL, NULL, '2022-06-09 19:51:04'),
(102, '涼枕', '1993-03-08', '2022-03-08', 'true', '0955667788', 'coolpilla@ggqq.com', 'coolpillow', '$2y$10$a11J3a0Jruj0y2dr3z2vYuYaqwMt4QB/puKbyQxphIJRc8t5tuZce', NULL, NULL, '2022-06-10 13:35:14'),
(104, NULL, NULL, NULL, 'false', NULL, 'CarCat999@gmail.com', 'CarCat999', '$2y$10$Dz/WmrGg/nerW7t/sJmfaumz64j26FVWD6BzWmWZGBmcRbohmdSy6', NULL, NULL, '2022-06-13 04:51:54');

-- --------------------------------------------------------

--
-- 資料表結構 `music_category`
--

CREATE TABLE `music_category` (
  `music_type_sid` int(11) NOT NULL,
  `music_type_en` varchar(255) DEFAULT NULL,
  `music_type_ch` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `music_category`
--

INSERT INTO `music_category` (`music_type_sid`, `music_type_en`, `music_type_ch`) VALUES
(1, 'happiness', '快樂'),
(2, 'meditation', '沉思'),
(3, 'sadness', '悲傷');

-- --------------------------------------------------------

--
-- 資料表結構 `news`
--

CREATE TABLE `news` (
  `sid` int(11) NOT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `event_time` date DEFAULT NULL,
  `type_sid` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `location_sid` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `publish_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `news`
--

INSERT INTO `news` (`sid`, `topic`, `event_time`, `type_sid`, `img`, `location_sid`, `content`, `publish_date`) VALUES
(1, '台灣出生率下降', '2019-06-07', 2, '8045d65e4d833e6fb6c56447a7ee9a4e.jpg', 1, '台灣內政部統計顯示，2020年台灣只有16萬5249名新生兒，創下新低點，死亡人數卻首次超越出生人數，人口首度出現負成長。', '2019-07-07'),
(2, '台灣最宜居、幸福感最高城市？', '2020-09-25', 3, '2fe1a74ee11608da158891dc4bcc3010.jpg', 8, '由台中市奪冠，擁有18.1%的支持度，其次是台北市16.7%，其餘縣市支持率都低於10%，第三名為台南僅有7.2%，六都之中以桃園市最低，僅4.9%。\r\n', '2020-10-20'),
(3, '想輕鬆上大學嗎?投胎吧！！', '2020-03-21', 2, '1ff123f659c37aecb87d07707b6d389b.jpg', 1, '2021新生兒不到16萬！「全入時代」來臨 今年高中畢業生都有大學讀 輕輕鬆鬆上大學\r\n', '2021-03-23'),
(5, '2023無性別新選擇', '2023-01-01', 1, '3b7fa3757454d35740f84d464909b6e7.jpg', 1, '台灣嬰兒「男多於女」數值偏高，重男輕女觀念未除？ 推出無性別選擇!無性別新時代來臨!\r\n', '2022-12-01'),
(7, '來生的命運沒辦法預知，但外表可以', '2022-03-03', 1, 'ee4367ef9abf0bd4ed848880fcf889b2.jpg', 1, '陰德值小遊戲上架，多做善事不保證有好報但可以有更酷的外表！', '2022-02-03'),
(9, '好想擁有貓貓肉球..喵喵喵', '2022-12-07', 1, 'd0d1059c115e6e981c8b75d427291e49.jpg', 2, '貓掌概念款新發表!發表會於5月31日晚間7點開始，請勿錯過，喵!喵喵！\r\n', '2022-11-01'),
(21, '胖寶寶最高！！', '2019-02-08', 2, '263e34486b4febadafc418da204331d9.jpg', 1, '新生兒越胖越好?擔心選擇重量級軀幹會有健康疑慮嗎?新產品移除糖寶寶基因~就要胖!胖的健康沒煩惱!\r\n', '2019-01-08'),
(24, '被鳥叫聲喚醒的每一天♥', '2018-03-23', 3, 'ff26c0974744293dba28506e719c0682.jpg', 10, '悠閒No.1！想逃離城市的吵鬧與喧囂，安靜的鄉村生活也是最近的熱門新選擇喔\r\n', '2019-02-20'),
(25, '狼的孩子', '2022-06-22', 1, 'e2114329b655c2bf1bb652300e2f0c87.jpg', 7, '特殊設定釋出，可以獲得與狼群溝通的技能（此設定有售命保證！不會被吃掉喔）\r\n', '2022-05-09'),
(26, '上班上到很生氣想揍老闆嗎？？？', '2023-06-12', 3, '6fcfafb207422b89a3aa94a69a871b06.jpg', 1, '無人島地點新開放！下輩子不必上班囉～\r\n生存極限挑戰！加油！努力活下去', '2022-05-10');

-- --------------------------------------------------------

--
-- 資料表結構 `news_tag`
--

CREATE TABLE `news_tag` (
  `nt_sid` int(11) NOT NULL,
  `news_sid` int(11) DEFAULT NULL,
  `tag_sid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `news_tag`
--

INSERT INTO `news_tag` (`nt_sid`, `news_sid`, `tag_sid`) VALUES
(77, 21, 5),
(78, 21, 8),
(79, 21, 11),
(80, 21, 13),
(81, 21, 14),
(84, 2, 2),
(85, 2, 4),
(86, 2, 16),
(93, 7, 5),
(94, 7, 6),
(95, 7, 7),
(96, 7, 8),
(97, 7, 12),
(98, 7, 13),
(99, 7, 21),
(100, 9, 5),
(101, 9, 6),
(102, 9, 7),
(103, 9, 9),
(104, 9, 22),
(109, 22, 2),
(110, 22, 15),
(111, 22, 17),
(112, 22, 23),
(113, 23, 2),
(114, 23, 17),
(115, 23, 23),
(116, 24, 2),
(117, 24, 15),
(118, 24, 17),
(119, 24, 23),
(120, 25, 1),
(121, 25, 4),
(122, 25, 7),
(123, 25, 14),
(124, 25, 25),
(138, 1, 4),
(139, 1, 15),
(140, 3, 3),
(141, 3, 14),
(142, 3, 19),
(196, 5, 1),
(197, 5, 4),
(198, 5, 7),
(199, 5, 8),
(200, 5, 13),
(201, 5, 26),
(219, 26, 1),
(220, 26, 2),
(221, 26, 14),
(222, 26, 15),
(223, 26, 23),
(224, 26, 27),
(225, 26, 28),
(226, 27, 1),
(227, 27, 2),
(229, 28, 1),
(230, 28, 2),
(231, 28, 3),
(232, 28, 4),
(233, 28, 5),
(234, 28, 6),
(235, 28, 7),
(236, 28, 12),
(237, 28, 29);

-- --------------------------------------------------------

--
-- 資料表結構 `npo_act`
--

CREATE TABLE `npo_act` (
  `sid` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `type_sid` int(11) DEFAULT NULL,
  `program_type` varchar(255) DEFAULT NULL,
  `comment_star` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `start` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end` date DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `npo_name` varchar(255) DEFAULT NULL,
  `act_title` varchar(255) DEFAULT NULL,
  `place_city` int(11) DEFAULT NULL,
  `place_other` varchar(255) DEFAULT NULL,
  `place_location` varchar(255) DEFAULT NULL,
  `limit_num` int(255) DEFAULT NULL,
  `intro` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `npo_act`
--

INSERT INTO `npo_act` (`sid`, `img`, `type_sid`, `program_type`, `comment_star`, `price`, `value`, `start`, `start_time`, `end`, `end_time`, `npo_name`, `act_title`, `place_city`, `place_other`, `place_location`, `limit_num`, `intro`) VALUES
(22, '01.svg', 3, '贊助', '4.2', 100, 50, '2022-07-14', '19:00:00', '2022-07-22', '22:00:00', '華山基金會', '「疫」起助老-愛心義賣', 16, '中正路420號7樓', '里民活動中心', 3, '※因現場人員需處理照護動物工作，場地/導覽人員人力有限，本會將視天候狀況及人力狀況審核是否同意志工服務，若天候不佳或是已有團體預約，就需要另擇他日喔!'),
(23, '02.svg', 3, '志工', '4.5', 100, 50, '2022-06-11', '09:00:00', '2022-07-22', '12:00:00', '華山基金會', '家庭照顧者支持計畫', 2, '文山區萬和街6號4樓', '里民活動中心', 15, '1. 以弱勢社區及服務據點所提出的需求提供服務，並體驗當地生活和文化。\r\n2. 協助當地教學、活動帶領等為主，服務內容依實際狀況調整。'),
(24, '03.svg', 3, '贊助', '3.5', 200, 50, '2022-07-22', '12:00:00', '2022-07-21', '13:00:00', '中華長照協會', '食物銀行送愛', 2, '中華路一段', '里民活動中心', 10, '服務內容：\r\n1.關懷服務：電話問安、送餐服務及社區關懷活動。\r\n2.陪伴服務：陪同就醫、讀報、陪伴運動及陪伴至社區或據點參與活動等服務。'),
(28, '04.svg', 5, '志工', '3.3', 50, 50, '2022-07-13', '13:00:00', '2022-06-22', '15:00:00', '愛盲基金會', '「看不見，我努力」', 4, '大溪老街', '里民活動中心', 4, '今年度，中心想透過志工協同領導的模式，由一位志工搭配 4 名身障者組成小隊，活動期間陪伴身障者於大溪老街中完成任務，中心期待透過此模式，增加身障者與一般民眾的接觸，雙方能夠進行良性互動，進而提升一般民眾對於身障者的認知，亦透過數位遊戲作為媒介，促使身心障礙者能活用網路科技、學習團隊合作、培養社會參與意識。'),
(30, '05.svg', 6, '贊助', '2.8', 50, 50, '2022-06-29', '15:00:00', '2022-06-18', '16:00:00', '寶貝潛能發展中心', '伴弱勢癌友翻轉抗癌路', 2, '大安區敦化南路一段233巷28號B1台北愛樂文教基金會', '里民活動中心', 40, 'TICF18台北國際合唱音樂節規模龐大，涵蓋20餘場大小音樂會、4項合唱專業課程及首屆台北國際合唱大賽。行政團隊計畫培養節慶活動之幕後籌備人才，歡迎熱愛藝文活動的你/妳，加入我們一起來完成今夏亞洲最具規模的合唱盛事！'),
(75, '06.svg', 2, '志工', '2.1', 50, 50, '2022-06-22', '12:00:00', '2022-07-15', '14:00:00', '荒野保護協會', '一起手護台灣', 16, '國聖燈塔', '里民活動中心', 100, '會提供手套和垃圾袋，保險自理、自行攜帶飲用水 (盡量避免保特瓶或手搖飲)\r\nP.S我們民眾自發性舉辦的活動，故無法提供志工時數或感謝狀唷'),
(102, '07.svg', 6, '贊助', '3.7', 200, 50, '2022-06-22', '18:00:00', '2022-06-22', '15:00:00', '台灣圖書室文化協會', '中部地區電話協談志工', 15, '中正路420號7樓', '里民活動中心', 30, NULL),
(103, '08.svg', 1, '志工', '4.5', 100, 250, '2022-06-30', '18:00:00', '2022-07-07', '16:00:00', '荒野保護協會', '淨灘一起GO', 9, '濱海公路', '里民活動中心', 100, NULL),
(104, '09.svg', 1, '贊助', '4.4', 150, 200, '2022-06-29', '08:00:00', '2022-06-30', '20:00:00', '荒野保護協會', '海好有你，守護海洋', 18, '三仙台遊憩區', '里民活動中心', 100, NULL),
(105, '10.svg', 4, '志工', '4.6', 100, 100, '2022-06-28', '09:00:00', '2022-06-28', '15:00:00', '兒少安置機構聯盟', '兒童權利教育志工', 21, '中正路694巷1弄3號', '里民活動中心', 5, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `npo_act_type`
--

CREATE TABLE `npo_act_type` (
  `typesid` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `npo_act_type`
--

INSERT INTO `npo_act_type` (`typesid`, `name`) VALUES
(1, '環境'),
(2, '動保'),
(3, '長照'),
(4, '兒少'),
(5, '身心障礙'),
(6, '其他');

-- --------------------------------------------------------

--
-- 資料表結構 `npo_name`
--

CREATE TABLE `npo_name` (
  `npo_sid` int(11) NOT NULL,
  `npo_name` varchar(255) DEFAULT NULL,
  `npo_img` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` int(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `npo_intro` varchar(255) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `npo_name`
--

INSERT INTO `npo_name` (`npo_sid`, `npo_name`, `npo_img`, `email`, `phone`, `mobile`, `npo_intro`, `create_at`) VALUES
(4, '陽光社會福利基金會', '20cf1ded90114f8006b46904ce7e981e.png', 'awslfkdnwqfkj@gmail.com', 25513456, '', '', '2022-05-15 21:02:00'),
(67, '財團法人桃園市私立寶貝潛能發展中心', 'b7613770120accced6b0e760c53af9ee.jpg', '123@yahoo.com.tw', 29901234, '0912095815', '之所以名為「寶貝」是意謂著每一個孩子都是我們的寶貝，我們真心疼愛每一個孩子，也希望每一個身心障礙的孩子都能得到良好的照顧。', '2022-06-01 23:59:07'),
(85, '華山基金會', 'e6468e81e9f99248127f02ce35743dea.jpg', '788221sfs@yahoo.com.tw', NULL, '0978456123', '華山基金會於1999年正式成立，投入三失(失能、失依、失智)老人免費到宅服務。 \r\n目前於台澎金馬設有約 400 個社區愛心天使站，服務近 3 萬名弱勢長輩。 ', '2022-06-12 01:26:55'),
(86, '中華長照協會', 'f5f4ad87475efb5fd103b53bcc9eda9a.png', '456213@yahoo.com.tw', NULL, '0975645871', '中華長照協會旨在提供完善之長照服務，以解決家屬之照顧負擔與現今高齡化、獨居依等社會問題，建構幼有所長、壯有所用、老有所終之良善社會。', '2022-06-12 01:34:34'),
(87, '愛盲基金會', '607897f2760ef943e495337671590bd8.png', '45622@yahoo.com.tw', 0, '0954678541', '財團法人愛盲基金會正式成立於民國八十年(1991年)底，原隸屬台北市政府教育局，八十六年(1997年)底改制為全國性的社會福利團體，九十五年改隸於內政部，一O二年八月主管機關改為「衛生福利部社會及家庭署」，是國內第一個為視覺障礙朋友以及其他身障朋友，在文教、職訓與視障福利政策方面，提供全面性服務與前瞻性規劃的基金會。', '2022-06-12 02:01:12'),
(88, '台灣圖書室文化協會', '011d477857868aeedab2a26c1efe410c.jpg', 'adads@gmail.com', NULL, '0912645789', '1995年7月1日，當時任職省立嘉義醫院的張宏榮醫師與朋友們在嘉義市中正路成立台灣圖書室，聚集關心台灣本土文化的朋友一起舉辦讀書會與文化講座，而後於1997年底隨著張宏榮醫師返回屏東故里服務，圖書室因而結束營運。', '2022-06-12 02:04:42'),
(89, '台灣全國兒少安置機構聯盟', '314715dd85c4deaae4fbe4a4b7a3a39a.jpg', '4562sfsv@gmail.com', 0, '0915478645', '我們以自律、平等、共學、共好為價值主張，期待透過安置機構間的串聯交流倡議完善安置政策環境，成為兒少保護的最後一道防線，不漏接任何一個孩子。郵政信箱23599中和郵局3-91號信箱', '2022-06-12 02:35:35'),
(90, '瞇瞇瞇', 'ab3b2c7f994ff2f38f2e6633215fd804.png', '000@gmail.com', NULL, '', '', '2022-06-13 11:25:07'),
(91, '二路兇一點協會', 'c7401e31f9a22748ea1d7c413245542a.jpg', 'nievesQQ@gmail.com', NULL, '0912345678', '二路兇一點', '2022-06-13 13:02:41');

-- --------------------------------------------------------

--
-- 資料表結構 `place`
--

CREATE TABLE `place` (
  `sid` int(11) NOT NULL,
  `year` year(4) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `country` varchar(225) DEFAULT NULL,
  `city` varchar(225) DEFAULT NULL,
  `dist` varchar(225) DEFAULT NULL,
  `quota` int(11) DEFAULT NULL,
  `booked` int(11) DEFAULT NULL,
  `place_price` int(11) DEFAULT 2000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `place`
--

INSERT INTO `place` (`sid`, `year`, `month`, `country`, `city`, `dist`, `quota`, `booked`, `place_price`) VALUES
(2, 2025, 10, '美國', '紐約', '布魯克林', 2, 1, 5000),
(4, 2032, 1, '台灣', '新北市', '三峽區', 5, 4, 3200),
(5, 2072, 2, '台灣', '臺南市', '安平區', 2, 1, 2500),
(6, 2030, 5, '台灣', '臺南市', '中西區', 5, 3, 2500),
(7, 2055, 8, '台灣', '臺北市', '大安區', 5, 5, 3600),
(10, 2025, 12, '台灣', '臺南市', '安平區', 4, 2, 2500),
(12, 2025, 12, '台灣', '臺北市', '大安區', 3, 2, 3600),
(13, 2022, 12, '美國', '加州', '聖荷西', 2, 0, 5000),
(14, 2027, 5, '台灣', '臺北市', '大安區', 2, 1, 3600),
(15, 2026, 10, '台灣', '臺北市', '大安區', 3, 1, 3600),
(16, 2030, 6, '台灣', '臺北市', '內湖區', 1, 1, 3600),
(17, 2029, 6, '台灣', '臺南市', '中西區', 2, 1, 2500),
(18, 2029, 5, '台灣', '桃園市', '蘆竹區', 3, 1, 200),
(19, 2027, 5, '美國', '紐約', '皇后區', 4, 2, 5000),
(20, 2027, 12, '美國', '加州', '比佛利山莊', 1, 0, 5000),
(21, 2023, 5, '台灣', '新竹縣', '竹北市', 2, 0, 2800),
(22, 2025, 6, '台灣', '臺北市', '大安區', 2, 1, 3600),
(23, 2052, 2, '台灣', '臺北市', '大安區', 1, 1, 3600),
(24, 2045, 6, '台灣', '臺北市', '大安區', 3, 1, 3600),
(25, 2105, 10, '台灣', '臺北市', '大安區', 2, 0, 3600),
(26, 2023, 8, '台灣', '臺北市', '大安區', 4, 2, 3600),
(27, 2065, 9, '台灣', '臺北市', '大安區', 2, 0, 3600),
(28, 2044, 2, '台灣', '新北市', '三峽區', 5, 1, 3200),
(29, 2048, 12, '台灣', '新北市', '三峽區', 2, 1, 3200),
(30, 2064, 4, '台灣', '新北市', '三峽區', 3, 2, 3200),
(31, 2098, 10, '台灣', '新北市', '三峽區', 5, 2, 3200),
(32, 2084, 2, '台灣', '新北市', '三峽區', 2, 0, 3200),
(33, 2100, 7, '台灣', '新北市', '三峽區', 5, 2, 3200),
(34, 2088, 12, '台灣', '臺北市', '內湖區', 2, 1, 3600),
(35, 2054, 4, '台灣', '臺北市', '內湖區', 3, 2, 3600),
(36, 2028, 10, '台灣', '臺北市', '內湖區', 5, 2, 3600),
(37, 2034, 2, '台灣', '臺北市', '內湖區', 2, 0, 3600),
(38, 2070, 7, '台灣', '臺北市', '內湖區', 5, 2, 3600),
(39, 2039, 3, '台灣', '桃園市', '中壢區', 4, 2, 200),
(40, 2069, 9, '台灣', '桃園市', '大園區', 2, 1, 200),
(41, 2089, 3, '台灣', '桃園市', '中壢區', 2, 0, 200),
(42, 2027, 5, '台灣', '桃園市', '大園區', 3, 2, 200),
(43, 2039, 12, '台灣', '桃園市', '大園區', 2, 1, 200),
(44, 2039, 9, '台灣', '桃園市', '蘆竹區', 4, 2, 200),
(45, 2039, 11, '台灣', '桃園市', '蘆竹區', 2, 1, 200),
(46, 2052, 3, '台灣', '新北市', '三峽區', 4, 1, 3200),
(47, 2077, 12, '台灣', '新北市', '三重區', 4, 2, 3200),
(48, 2099, 7, '台灣', '新北市', '三重區', 2, 1, 3200),
(49, 2054, 6, '台灣', '新北市', '三重區', 4, 0, 3200),
(50, 2068, 8, '台灣', '新北市', '蘆洲區', 3, 2, 3200),
(51, 2084, 2, '台灣', '新北市', '蘆洲區', 4, 2, 3200),
(52, 2072, 3, '台灣', '臺北市', '中山區', 4, 1, 3600),
(53, 2077, 11, '台灣', '臺北市', '中山區', 4, 2, 3600),
(54, 2069, 7, '台灣', '臺北市', '中山區', 3, 1, 3600),
(55, 2074, 6, '台灣', '宜蘭縣', '宜蘭市', 4, 0, 200),
(56, 2038, 8, '台灣', '宜蘭縣', '宜蘭市', 3, 2, 200),
(57, 2094, 2, '台灣', '台中市', '烏日區', 4, 2, 200),
(58, 2040, 11, '台灣', '臺北市', '北投區', 2, 0, 3600),
(59, 2055, 12, '台灣', '高雄市', '左營區', 3, 1, 200),
(60, 2075, 2, '台灣', '高雄市', '左營區', 2, 1, 200),
(61, 2035, 8, '台灣', '高雄市', '三民區', 3, 1, 200),
(62, 2033, 4, '台灣', '臺南市', '仁德區', 2, 0, 2500),
(63, 2023, 1, '台灣', '臺南市', '中西區', 2, 1, 2500),
(64, 2041, 12, '台灣', '臺南市', '中西區', 3, 1, 2500),
(65, 2062, 7, '台灣', '臺南市', '仁德區', 3, 2, 2500),
(66, 2055, 9, '台灣', '臺南市', '仁德區', 5, 1, 2500),
(67, 2022, 10, '台灣', '臺北市', '中山區', 4, 2, 3800),
(68, 2022, 10, '台灣', '臺北市', '北投區', 3, 1, 4100),
(69, 2025, 12, '台灣', '臺北市', '中山區', 4, 2, 3500),
(70, 2024, 1, '台灣', '臺北市', '北投區', 3, 1, 4000),
(71, 2027, 12, '台灣', '臺北市', '內湖區', 3, 1, 3500),
(72, 2034, 3, '台灣', '臺北市', '北投區', 3, 2, 2900),
(73, 2030, 5, '台灣', '臺南市', '中西區', 4, 1, 3400),
(74, 2028, 7, '台灣', '臺南市', '中西區', 3, 0, 2800),
(75, 2037, 11, '台灣', '宜蘭縣', '宜蘭市', 4, 1, 3200),
(76, 2022, 11, '台灣', '宜蘭縣', '宜蘭市', 4, 1, 3000),
(77, 2067, 1, '台灣', '宜蘭縣', '羅東鎮', 4, 2, 3800),
(78, 2062, 6, '台灣', '宜蘭縣', '羅東鎮', 4, 0, 4000),
(79, 2054, 2, '台灣', '臺北市', '北投區', 3, 1, 4300),
(80, 2029, 12, '台灣', '新北市', '三峽區', 4, 2, 3700),
(81, 2029, 12, '台灣', '新北市', '三峽區', 4, 2, 3700),
(82, 2033, 12, '台灣', '桃園市', '中壢區', 3, 1, 3000),
(83, 2038, 3, '台灣', '桃園市', '蘆竹區', 3, 2, 2600),
(84, 2038, 5, '台灣', '臺南市', '中西區', 4, 1, 3000),
(85, 2040, 7, '台灣', '臺南市', '中西區', 3, 2, 3600),
(86, 2030, 11, '台灣', '新竹縣', '竹北市', 4, 1, 3900),
(87, 2039, 1, '台灣', '新竹縣', '竹北市', 3, 1, 4000),
(88, 2024, 7, '台灣', '新竹縣', '竹東鎮', 2, 1, 3000),
(89, 2050, 10, '台灣', '新竹縣', '竹北市', 2, 1, 4300),
(90, 2026, 8, '台灣', '臺中市', '西區', 4, 2, 3800),
(91, 2032, 10, '台灣', '臺中市', '烏日區', 3, 1, 3800),
(92, 2066, 6, '台灣', '臺中市', '烏日區', 4, 2, 4800),
(93, 2028, 8, '台灣', '臺中市', '北屯區', 3, 0, 3600);

-- --------------------------------------------------------

--
-- 資料表結構 `place_city`
--

CREATE TABLE `place_city` (
  `country` varchar(225) DEFAULT NULL,
  `city` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `place_city`
--

INSERT INTO `place_city` (`country`, `city`) VALUES
('台灣', '南投縣'),
('台灣', '基隆市'),
('台灣', '宜蘭縣'),
('台灣', '屏東縣'),
('台灣', '新北市'),
('台灣', '新竹市'),
('台灣', '新竹縣'),
('台灣', '桃園市'),
('台灣', '澎湖縣'),
('台灣', '臺中市'),
('台灣', '臺北市'),
('台灣', '臺南市'),
('台灣', '臺東縣'),
('台灣', '花蓮縣'),
('台灣', '金門縣'),
('台灣', '高雄市'),
('美國', '加州'),
('美國', '夏威夷'),
('美國', '紐約');

-- --------------------------------------------------------

--
-- 資料表結構 `place_country`
--

CREATE TABLE `place_country` (
  `country` varchar(225) NOT NULL,
  `country_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `place_country`
--

INSERT INTO `place_country` (`country`, `country_price`) VALUES
('台灣', 100),
('美國', 500);

-- --------------------------------------------------------

--
-- 資料表結構 `place_country_list`
--

CREATE TABLE `place_country_list` (
  `sid` int(11) NOT NULL,
  `country` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `place_country_list`
--

INSERT INTO `place_country_list` (`sid`, `country`) VALUES
(1, '台灣'),
(2, '美國');

-- --------------------------------------------------------

--
-- 資料表結構 `place_dist`
--

CREATE TABLE `place_dist` (
  `country` varchar(225) DEFAULT NULL,
  `city` varchar(225) DEFAULT NULL,
  `dist` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `place_dist`
--

INSERT INTO `place_dist` (`country`, `city`, `dist`) VALUES
('台灣', '新北市', '三峽區'),
('台灣', '高雄市', '三民區'),
('台灣', '新北市', '三重區'),
('台灣', '桃園市', '中壢區'),
('台灣', '臺北市', '中山區'),
('台灣', '臺南市', '中西區'),
('台灣', '臺南市', '仁德區'),
('台灣', '臺北市', '內湖區'),
('台灣', '臺中市', '北區'),
('台灣', '臺中市', '北屯區'),
('台灣', '臺北市', '北投區'),
('台灣', '桃園市', '大園區'),
('台灣', '臺北市', '大安區'),
('台灣', '臺南市', '安平區'),
('台灣', '宜蘭縣', '宜蘭市'),
('台灣', '高雄市', '左營區'),
('美國', '紐約', '布魯克林'),
('台灣', '臺南市', '新化區'),
('台灣', '臺南市', '歸仁區'),
('美國', '加州', '比佛利山莊'),
('台灣', '臺中市', '烏日區'),
('美國', '紐約', '皇后區'),
('台灣', '新竹縣', '竹北市'),
('台灣', '新竹縣', '竹東鎮'),
('台灣', '宜蘭縣', '羅東鎮'),
('美國', '加州', '聖地牙哥'),
('美國', '加州', '聖荷西'),
('美國', '加州', '舊金山'),
('台灣', '新北市', '蘆洲區'),
('台灣', '桃園市', '蘆竹區'),
('台灣', '臺中市', '西區'),
('台灣', '臺中市', '豐原區'),
('台灣', '宜蘭縣', '頭城鄉');

-- --------------------------------------------------------

--
-- 資料表結構 `place_in_cart`
--

CREATE TABLE `place_in_cart` (
  `sid` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `place_sid` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `place_in_cart`
--

INSERT INTO `place_in_cart` (`sid`, `member_sid`, `place_sid`, `created_at`) VALUES
(3, 21, 4, '2022-07-25 13:27:38'),
(4, 21, 13, '2022-07-25 13:27:38'),
(5, 21, 23, '2022-07-25 13:27:57'),
(6, 21, 24, '2022-07-25 13:27:57'),
(7, 12, 23, '2022-07-25 13:28:27'),
(8, 12, 18, '2022-07-25 13:28:27'),
(16, 10, 13, '2022-07-31 13:32:33'),
(18, 10, 93, '2022-07-31 13:36:45'),
(20, 10, 76, '2022-07-31 15:13:57'),
(22, 10, 67, '2022-08-02 17:48:12'),
(26, 100, 67, '2022-08-02 18:37:31'),
(31, 100, 68, '2022-08-02 18:47:37'),
(33, 100, 13, '2022-08-02 19:01:55');

-- --------------------------------------------------------

--
-- 資料表結構 `place_liked`
--

CREATE TABLE `place_liked` (
  `sid` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `place_sid` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `place_liked`
--

INSERT INTO `place_liked` (`sid`, `member_sid`, `place_sid`, `created_at`) VALUES
(1, 21, 11, '2022-07-31 12:02:22'),
(2, 21, 4, '2022-07-31 12:02:22'),
(3, 21, 17, '2022-07-31 12:02:42'),
(4, 21, 18, '2022-07-31 12:02:42'),
(5, 21, 20, '2022-07-31 12:02:55'),
(6, 21, 21, '2022-07-31 12:02:55'),
(7, 21, 22, '2022-07-31 12:03:09'),
(8, 21, 23, '2022-07-31 12:03:09'),
(9, 4, 21, '2022-07-31 12:16:08'),
(10, 4, 10, '2022-07-31 12:16:08'),
(11, 10, 10, '2022-07-31 13:41:37'),
(12, 10, 76, '2022-07-31 13:41:54'),
(13, 10, 68, '2022-07-31 13:46:01'),
(14, 10, 87, '2022-07-31 13:59:21'),
(15, 10, 67, '2022-07-31 13:59:28'),
(16, 10, 29, '2022-07-31 14:49:58');

-- --------------------------------------------------------

--
-- 資料表結構 `reborn_order`
--

CREATE TABLE `reborn_order` (
  `sid` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `avatar_id` int(11) DEFAULT NULL,
  `place_sid` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `reincarnation`
--

CREATE TABLE `reincarnation` (
  `member_sid` int(11) DEFAULT NULL,
  `soul_id` int(11) DEFAULT NULL,
  `generation` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `reincarnation`
--

INSERT INTO `reincarnation` (`member_sid`, `soul_id`, `generation`) VALUES
(11, 1, 1),
(12, 2, 1),
(13, 1, 2),
(14, 2, 2),
(15, 1, 3),
(16, 2, 3),
(17, 1, 4),
(18, 2, 4);

-- --------------------------------------------------------

--
-- 資料表結構 `reincarnation_order`
--

CREATE TABLE `reincarnation_order` (
  `reincarnation_order_sid` int(11) NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `avatar_id` int(11) DEFAULT NULL,
  `time_id` date DEFAULT NULL,
  `place_id` varchar(255) DEFAULT NULL,
  `avatar_price` int(11) DEFAULT NULL,
  `time_price` int(11) DEFAULT NULL,
  `place_price` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT 0,
  `order_datetime` datetime DEFAULT NULL,
  `order_last_modified_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `share_avatar_collects`
--

CREATE TABLE `share_avatar_collects` (
  `share_post_collect_sid` int(11) NOT NULL,
  `share_post_sid` int(11) DEFAULT NULL,
  `member_sid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `share_avatar_collects`
--

INSERT INTO `share_avatar_collects` (`share_post_collect_sid`, `share_post_sid`, `member_sid`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 5, 1),
(4, 10, 1),
(5, 1, 2),
(6, 3, 2),
(7, 9, 2),
(8, 1, 3),
(9, 2, 3),
(10, 4, 3),
(11, 8, 3),
(12, 1, 4),
(13, 7, 4),
(14, 1, 5),
(15, 2, 5),
(16, 3, 5),
(17, 6, 5),
(18, 1, 6),
(19, 5, 6),
(20, 1, 7),
(22, 4, 7),
(23, 1, 8),
(24, 3, 8),
(25, 1, 9),
(26, 2, 9),
(27, 1, 10),
(28, 2, 7);

-- --------------------------------------------------------

--
-- 資料表結構 `share_avatar_comments`
--

CREATE TABLE `share_avatar_comments` (
  `share_post_comment_sid` int(11) NOT NULL,
  `share_post_sid` int(11) DEFAULT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `share_post_comment_text` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `share_avatar_comments`
--

INSERT INTO `share_avatar_comments` (`share_post_comment_sid`, `share_post_sid`, `member_sid`, `share_post_comment_text`, `created_at`, `updated_at`) VALUES
(1, 1, 10, '雙馬尾好可愛喔～', '2022-07-22 23:31:37', '2022-07-22 23:40:55'),
(2, 1, 7, '小美人魚', '2022-07-22 23:32:28', NULL),
(3, 1, 2, '有種不倒翁的感覺', '2022-07-22 23:32:48', NULL),
(4, 2, 1, '這到底什麼造型喔喔喔喔', '2022-07-22 23:33:06', NULL),
(5, 2, 3, '這到底什麼造型喔喔喔喔', '2022-07-22 23:33:22', NULL),
(6, 2, 4, '這到底什麼造型喔喔喔喔', '2022-07-22 23:37:51', NULL),
(7, 2, 5, '這到底什麼造型喔喔喔喔', '2022-07-22 23:38:21', NULL),
(8, 2, 6, '這到底什麼造型喔喔喔喔', '2022-07-22 23:38:34', NULL),
(9, 2, 7, '這到底什麼造型喔喔喔喔', '2022-07-22 23:38:48', NULL),
(10, 2, 8, '這到底什麼造型喔喔喔喔', '2022-07-22 23:38:59', NULL),
(11, 2, 9, '這到底什麼造型喔喔喔喔', '2022-07-22 23:39:11', NULL),
(12, 2, 10, '這到底什麼造型喔喔喔喔', '2022-07-22 23:39:41', NULL),
(13, 3, 1, '應該要新增單眼標籤 #單眼', '2022-07-22 23:40:00', NULL),
(14, 4, 8, '狐狸尾巴露出來啦！', '2022-07-22 23:40:16', NULL),
(15, 4, 2, '我抓！', '2022-07-22 23:40:27', NULL),
(16, 4, 7, '我抓！', '2022-07-22 23:40:40', NULL),
(17, 4, 4, '不要抓QQ', '2022-07-22 23:41:12', NULL),
(18, 4, 10, '我抓！', '2022-07-22 23:41:23', '2022-07-22 23:43:19'),
(19, 6, 10, '你的新形象好酷～', '2022-07-22 23:41:33', NULL),
(20, 6, 3, '感覺很適合你欸', '2022-07-22 23:41:50', NULL),
(21, 6, 6, '被家裡的長輩嫌棄嗚嗚', '2022-07-22 23:42:02', NULL),
(22, 6, 10, '他們不懂', '2022-07-22 23:42:11', NULL),
(23, 6, 7, '他們不懂', '2022-07-22 23:42:20', NULL),
(24, 6, 2, '#我看你是不懂喔～', '2022-07-22 23:42:30', NULL),
(25, 6, 8, '杰哥不要', '2022-07-22 23:42:39', NULL),
(26, 7, 1, '這已經是藝術了...', '2022-07-22 23:43:00', '2022-07-22 23:46:29'),
(27, 7, 10, '雙馬尾好可愛喔～', '2022-07-22 23:44:03', NULL),
(28, 7, 4, '樓上也太控馬尾了吧！', '2022-07-22 23:44:18', NULL),
(29, 7, 10, '我十二生肖是屬馬的', '2022-07-22 23:44:34', NULL),
(30, 7, 4, '???????', '2022-07-22 23:44:43', NULL),
(31, 8, 5, '矮矮der', '2022-07-22 23:44:54', NULL),
(32, 8, 3, '感覺是看待世界的方式會改變的身高', '2022-07-22 23:45:05', NULL),
(33, 8, 2, '我也要改成這個！', '2022-07-22 23:45:38', NULL),
(34, 9, 4, '芝麻眼睛好酷～', '2022-07-22 23:45:48', NULL),
(35, 2, 2, '我怎麼會知道喔喔喔喔', '2022-07-22 23:45:56', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `share_avatar_likes`
--

CREATE TABLE `share_avatar_likes` (
  `share_post_like_sid` int(11) NOT NULL,
  `share_post_sid` int(11) DEFAULT NULL,
  `member_sid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `share_avatar_likes`
--

INSERT INTO `share_avatar_likes` (`share_post_like_sid`, `share_post_sid`, `member_sid`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 1, 3),
(5, 3, 3),
(6, 1, 4),
(7, 2, 4),
(8, 4, 4),
(9, 1, 5),
(10, 5, 5),
(11, 1, 6),
(12, 2, 6),
(13, 3, 6),
(14, 6, 6),
(15, 1, 7),
(16, 7, 7),
(17, 1, 8),
(18, 2, 8),
(19, 4, 8),
(20, 8, 8),
(21, 1, 9),
(22, 3, 9),
(23, 9, 9),
(24, 1, 10),
(25, 2, 10),
(26, 5, 10),
(27, 10, 10);

-- --------------------------------------------------------

--
-- 資料表結構 `share_avatar_posts`
--

CREATE TABLE `share_avatar_posts` (
  `share_post_sid` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `avatar_sid` int(11) DEFAULT NULL,
  `share_post_title` varchar(255) DEFAULT NULL,
  `share_post_text` varchar(255) DEFAULT NULL,
  `share_post_likes` int(11) DEFAULT NULL,
  `share_post_collects` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `share_avatar_posts`
--

INSERT INTO `share_avatar_posts` (`share_post_sid`, `member_sid`, `avatar_sid`, `share_post_title`, `share_post_text`, `share_post_likes`, `share_post_collects`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '海豚灣戀人', '我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號我是文章一號', 11, 12, '2022-07-22 22:36:40', '2022-07-22 22:48:17'),
(2, 2, 2, '周杰倫半獸人', '我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號我是文章二號', 22, 23, '2022-07-22 22:38:42', NULL),
(3, 3, 3, '綠色史瑞克人', '我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號我是文章三號', 33, 34, '2022-07-22 22:39:04', NULL),
(4, 4, 4, '青色馬尾人', '我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號我是文章四號', 44, 45, '2022-07-22 22:39:35', '2022-07-22 23:31:59'),
(5, 5, 5, '粉紫色大肚人', '我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號我是文章五號', 55, 56, '2022-07-22 22:39:55', NULL),
(6, 6, 6, '白海豚轉彎人', '我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號我是文章六號', 66, 67, '2022-07-22 22:43:20', NULL),
(7, 7, 7, '我是什麼人', '我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號我是文章七號', 77, 78, '2022-07-22 22:46:34', '2022-07-22 23:43:46'),
(8, 8, 8, '綠野仙蹤矮人', '我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號我是文章八號', 88, 89, '2022-07-22 22:46:48', NULL),
(9, 9, 9, '藍色小精靈', '我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號我是文章九號', 99, 100, '2022-07-22 22:47:04', NULL),
(10, 10, 10, '三眼姆哈哈', '我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號我是文章十號', 1010, 1011, '2022-07-22 22:47:17', NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `share_avatar_posts_to_tags`
--

CREATE TABLE `share_avatar_posts_to_tags` (
  `share_p_to_t_sid` int(11) NOT NULL,
  `share_post_sid` int(11) DEFAULT NULL,
  `share_post_tag_sid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `share_avatar_posts_to_tags`
--

INSERT INTO `share_avatar_posts_to_tags` (`share_p_to_t_sid`, `share_post_sid`, `share_post_tag_sid`) VALUES
(1, 1, 1),
(2, 1, 8),
(3, 1, 9),
(4, 2, 14),
(5, 2, 17),
(6, 2, 5),
(7, 3, 10),
(8, 4, 5),
(9, 4, 11),
(10, 5, 12),
(11, 5, 16),
(12, 6, 7),
(13, 6, 9),
(14, 7, 1),
(15, 7, 15),
(16, 7, 11),
(17, 8, 6),
(18, 8, 4),
(19, 9, 11),
(20, 10, 12),
(21, 10, 16),
(22, 10, 17);

-- --------------------------------------------------------

--
-- 資料表結構 `share_avatar_tags`
--

CREATE TABLE `share_avatar_tags` (
  `share_post_tag_sid` int(11) NOT NULL,
  `share_post_tag_text` varchar(255) DEFAULT NULL,
  `share_post_tag_search_times` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `share_avatar_tags`
--

INSERT INTO `share_avatar_tags` (`share_post_tag_sid`, `share_post_tag_text`, `share_post_tag_search_times`) VALUES
(1, '藍色', 13),
(2, '洋紅色', 5413),
(3, '灰灰', 9),
(4, '橘色', 442),
(5, '青色', 81),
(6, '綠色', 7544),
(7, '讚美太陽', 234),
(8, '魚尾', 367),
(9, '雙馬尾', 938),
(10, '矮萌', 1295),
(11, '露出狐狸尾巴', 9999),
(12, '顆顆', 45),
(13, '三眼', 973),
(14, '三角鼻', 2355),
(15, '喵喵嘴', 674),
(16, '大肚腩', 323),
(17, '粉紫色', 21);

-- --------------------------------------------------------

--
-- 資料表結構 `showcase`
--

CREATE TABLE `showcase` (
  `avatar_id` int(11) NOT NULL,
  `member_sid` int(11) DEFAULT NULL,
  `avatar_created_at` datetime DEFAULT NULL,
  `combination` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`combination`)),
  `combinationText` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `img_name` mediumtext NOT NULL,
  `price` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `showcase`
--

INSERT INTO `showcase` (`avatar_id`, `member_sid`, `avatar_created_at`, `combination`, `combinationText`, `img_name`, `price`) VALUES
(1123, 19960409, '2022-08-06 16:21:30', '{\"basic\":[1,1,1],\"basic_color\":\"0\",\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1124, 19960409, '2022-08-06 16:21:30', '{\"basic\":[1,1,1],\"basic_color\":\"0\",\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1125, 19960409, '2022-08-06 16:21:30', '{\"basic\":[1,1,1],\"basic_color\":\"0\",\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1126, 19960409, '2022-08-06 16:21:30', '{\"basic\":[1,1,1],\"basic_color\":\"0\",\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1127, 19960409, '2022-08-06 16:21:30', '{\"basic\":[1,1,1],\"basic_color\":\"0\",\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1128, 7, '2022-08-09 09:23:04', '{\"basic\":[1,1,1],\"basic_color\":0,\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1129, 7, '2022-08-09 09:23:04', '{\"basic\":[1,1,1],\"basic_color\":0,\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1130, 7, '2022-08-09 09:23:04', '{\"basic\":[1,1,1],\"basic_color\":0,\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1131, 7, '2022-08-09 09:23:04', '{\"basic\":[1,1,1],\"basic_color\":0,\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300),
(1132, 7, '2022-08-09 09:23:04', '{\"basic\":[1,1,1],\"basic_color\":0,\"body\":{\"hand\":0,\"foot\":0,\"tale\":0,\"special\":0},\"special_color\":{\"tale\":0,\"special\":0},\"face\":{\"eye\":0,\"ear\":0,\"lip\":0,\"nose\":0,\"hairFront\":0,\"hairBack\":0,\"topEar\":0},\"face_color\":{\"eye\":0,\"nose\":0,\"hairFront\":0,\"topEar\":0}}', '{\"hand\":\"饅頭\",\"foot\":\"饅頭\",\"bodyColor\":\"粉\",\"specialColor\":\"\",\"tale\":\"無\",\"taleColor\":\"\",\"eye\":\"瞇瞇眼\",\"eyeColor\":\"灰\",\"nose\":\"那個人\",\"noseColor\":\"白\",\"hair\":\"中分+不留長\",\"hairColor\":\"黑\",\"ear\":\"小饅頭\",\"topearColor\":\"\",\"lip\":\"kitty\"}', 'default.png', 300);

-- --------------------------------------------------------

--
-- 資料表結構 `tag`
--

CREATE TABLE `tag` (
  `tg_sid` int(11) NOT NULL,
  `tag_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `tag`
--

INSERT INTO `tag` (`tg_sid`, `tag_name`) VALUES
(1, '名額'),
(2, '地點'),
(3, '時間'),
(4, '投胎'),
(5, '陰德值'),
(6, '遊戲'),
(7, '我的衣櫥'),
(8, '可愛'),
(9, '貓貓'),
(10, '狗狗'),
(11, '胖寶寶'),
(12, '髮型'),
(13, '新造型'),
(14, '酷'),
(15, '新聞'),
(16, '城市'),
(17, '鄉村'),
(18, '飛機'),
(19, '大學'),
(21, '捲毛'),
(22, '猫の日'),
(23, '田園生活'),
(24, '機票'),
(25, '狼小孩'),
(26, '性別平等'),
(27, '無人島'),
(28, '生存挑戰'),
(29, 'hello');

-- --------------------------------------------------------

--
-- 資料表結構 `type`
--

CREATE TABLE `type` (
  `ty_sid` int(11) NOT NULL,
  `type_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `type`
--

INSERT INTO `type` (`ty_sid`, `type_name`) VALUES
(1, '角色'),
(2, '新聞'),
(3, '地點'),
(4, '名額'),
(5, '陰德值'),
(6, '投胎');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `admin_test_jwt`
--
ALTER TABLE `admin_test_jwt`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `body_parts`
--
ALTER TABLE `body_parts`
  ADD PRIMARY KEY (`parts_sid`);

--
-- 資料表索引 `city_type`
--
ALTER TABLE `city_type`
  ADD PRIMARY KEY (`city_sid`);

--
-- 資料表索引 `cube`
--
ALTER TABLE `cube`
  ADD PRIMARY KEY (`cube_sid`),
  ADD KEY `member_sid` (`member_sid`);

--
-- 資料表索引 `cube_category`
--
ALTER TABLE `cube_category`
  ADD PRIMARY KEY (`cube_style_sid`);

--
-- 資料表索引 `cube_music`
--
ALTER TABLE `cube_music`
  ADD PRIMARY KEY (`cube_music_sid`);

--
-- 資料表索引 `date_price`
--
ALTER TABLE `date_price`
  ADD PRIMARY KEY (`year`);

--
-- 資料表索引 `event_cart`
--
ALTER TABLE `event_cart`
  ADD PRIMARY KEY (`order_sid`);

--
-- 資料表索引 `event_cart_creditcard`
--
ALTER TABLE `event_cart_creditcard`
  ADD PRIMARY KEY (`credit_sid`);

--
-- 資料表索引 `event_cart_personinfo`
--
ALTER TABLE `event_cart_personinfo`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `event_order_detail`
--
ALTER TABLE `event_order_detail`
  ADD PRIMARY KEY (`event_order_sid`);

--
-- 資料表索引 `good_deed_games`
--
ALTER TABLE `good_deed_games`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `good_deed_games_record`
--
ALTER TABLE `good_deed_games_record`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`l_sid`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `music_category`
--
ALTER TABLE `music_category`
  ADD PRIMARY KEY (`music_type_sid`);

--
-- 資料表索引 `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `location_sid` (`location_sid`),
  ADD KEY `type_sid` (`type_sid`);

--
-- 資料表索引 `news_tag`
--
ALTER TABLE `news_tag`
  ADD PRIMARY KEY (`nt_sid`),
  ADD KEY `news_sid` (`news_sid`),
  ADD KEY `tag_sid` (`tag_sid`);

--
-- 資料表索引 `npo_act`
--
ALTER TABLE `npo_act`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `type_sid` (`type_sid`),
  ADD KEY `place_city` (`place_city`);

--
-- 資料表索引 `npo_act_type`
--
ALTER TABLE `npo_act_type`
  ADD PRIMARY KEY (`typesid`);

--
-- 資料表索引 `npo_name`
--
ALTER TABLE `npo_name`
  ADD PRIMARY KEY (`npo_sid`);

--
-- 資料表索引 `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `place_city`
--
ALTER TABLE `place_city`
  ADD PRIMARY KEY (`city`),
  ADD KEY `place_city_ibfk_1` (`country`);

--
-- 資料表索引 `place_country`
--
ALTER TABLE `place_country`
  ADD PRIMARY KEY (`country`);

--
-- 資料表索引 `place_country_list`
--
ALTER TABLE `place_country_list`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `place_dist`
--
ALTER TABLE `place_dist`
  ADD PRIMARY KEY (`dist`),
  ADD KEY `place_dist_ibfk_2` (`country`);

--
-- 資料表索引 `place_in_cart`
--
ALTER TABLE `place_in_cart`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `place_liked`
--
ALTER TABLE `place_liked`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `reborn_order`
--
ALTER TABLE `reborn_order`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `reincarnation`
--
ALTER TABLE `reincarnation`
  ADD KEY `member_sid` (`member_sid`);

--
-- 資料表索引 `reincarnation_order`
--
ALTER TABLE `reincarnation_order`
  ADD PRIMARY KEY (`reincarnation_order_sid`);

--
-- 資料表索引 `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- 資料表索引 `share_avatar_collects`
--
ALTER TABLE `share_avatar_collects`
  ADD PRIMARY KEY (`share_post_collect_sid`);

--
-- 資料表索引 `share_avatar_comments`
--
ALTER TABLE `share_avatar_comments`
  ADD PRIMARY KEY (`share_post_comment_sid`);

--
-- 資料表索引 `share_avatar_likes`
--
ALTER TABLE `share_avatar_likes`
  ADD PRIMARY KEY (`share_post_like_sid`);

--
-- 資料表索引 `share_avatar_posts`
--
ALTER TABLE `share_avatar_posts`
  ADD PRIMARY KEY (`share_post_sid`);

--
-- 資料表索引 `share_avatar_posts_to_tags`
--
ALTER TABLE `share_avatar_posts_to_tags`
  ADD PRIMARY KEY (`share_p_to_t_sid`);

--
-- 資料表索引 `share_avatar_tags`
--
ALTER TABLE `share_avatar_tags`
  ADD PRIMARY KEY (`share_post_tag_sid`);

--
-- 資料表索引 `showcase`
--
ALTER TABLE `showcase`
  ADD PRIMARY KEY (`avatar_id`);

--
-- 資料表索引 `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`tg_sid`);

--
-- 資料表索引 `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`ty_sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `admin_test_jwt`
--
ALTER TABLE `admin_test_jwt`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `body_parts`
--
ALTER TABLE `body_parts`
  MODIFY `parts_sid` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `city_type`
--
ALTER TABLE `city_type`
  MODIFY `city_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cube`
--
ALTER TABLE `cube`
  MODIFY `cube_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cube_category`
--
ALTER TABLE `cube_category`
  MODIFY `cube_style_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `cube_music`
--
ALTER TABLE `cube_music`
  MODIFY `cube_music_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `event_cart`
--
ALTER TABLE `event_cart`
  MODIFY `order_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `event_cart_creditcard`
--
ALTER TABLE `event_cart_creditcard`
  MODIFY `credit_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `event_cart_personinfo`
--
ALTER TABLE `event_cart_personinfo`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `event_order_detail`
--
ALTER TABLE `event_order_detail`
  MODIFY `event_order_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `good_deed_games`
--
ALTER TABLE `good_deed_games`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `good_deed_games_record`
--
ALTER TABLE `good_deed_games_record`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `location`
--
ALTER TABLE `location`
  MODIFY `l_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `music_category`
--
ALTER TABLE `music_category`
  MODIFY `music_type_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news`
--
ALTER TABLE `news`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `news_tag`
--
ALTER TABLE `news_tag`
  MODIFY `nt_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=238;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `npo_act`
--
ALTER TABLE `npo_act`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `npo_act_type`
--
ALTER TABLE `npo_act_type`
  MODIFY `typesid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `npo_name`
--
ALTER TABLE `npo_name`
  MODIFY `npo_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `place`
--
ALTER TABLE `place`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `place_country_list`
--
ALTER TABLE `place_country_list`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `place_in_cart`
--
ALTER TABLE `place_in_cart`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `place_liked`
--
ALTER TABLE `place_liked`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `reborn_order`
--
ALTER TABLE `reborn_order`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `reincarnation_order`
--
ALTER TABLE `reincarnation_order`
  MODIFY `reincarnation_order_sid` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `share_avatar_collects`
--
ALTER TABLE `share_avatar_collects`
  MODIFY `share_post_collect_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `share_avatar_comments`
--
ALTER TABLE `share_avatar_comments`
  MODIFY `share_post_comment_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `share_avatar_likes`
--
ALTER TABLE `share_avatar_likes`
  MODIFY `share_post_like_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `share_avatar_posts`
--
ALTER TABLE `share_avatar_posts`
  MODIFY `share_post_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `share_avatar_posts_to_tags`
--
ALTER TABLE `share_avatar_posts_to_tags`
  MODIFY `share_p_to_t_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `share_avatar_tags`
--
ALTER TABLE `share_avatar_tags`
  MODIFY `share_post_tag_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `showcase`
--
ALTER TABLE `showcase`
  MODIFY `avatar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1133;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `tag`
--
ALTER TABLE `tag`
  MODIFY `tg_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `type`
--
ALTER TABLE `type`
  MODIFY `ty_sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`location_sid`) REFERENCES `location` (`l_sid`),
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`type_sid`) REFERENCES `type` (`ty_sid`);

--
-- 資料表的限制式 `place_city`
--
ALTER TABLE `place_city`
  ADD CONSTRAINT `place_city_ibfk_1` FOREIGN KEY (`country`) REFERENCES `place_country` (`country`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 資料表的限制式 `place_dist`
--
ALTER TABLE `place_dist`
  ADD CONSTRAINT `place_dist_ibfk_2` FOREIGN KEY (`country`) REFERENCES `place_country` (`country`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
