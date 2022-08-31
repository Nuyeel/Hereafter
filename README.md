![logo](https://user-images.githubusercontent.com/106054083/187720629-55c99dc7-7be6-4dc4-b5b6-5525a9b4be06.png)

# <h1> HereAfter 來生投放所

HereAfter 本質上較為接近活動平台，使用者可以在這裡藉由進行`陰德值測定心理測驗`、遊玩`行善小遊戲`、購買慈善活動參與票券或進行捐款來獲得相對應的陰德值獎勵，並用以兌換來生形象與來生投胎的良辰吉地，藉由這個過程為自己的來生做最好的規劃，同時成為一個更好的人。最後在前往來生之前，還可以藉由`希望方塊`留下一生的結語，為今生留下印證。

為了給予使用者對來生更具體的想像，我們規劃了`投胎速報`、`來生形象`、`良辰吉地`這三個頁面，讓使用者得以了解各種人生相關的新聞或訊息，並客製化其想要的來生形象與投胎轉世的時間地點。我們也設計了`交流分享`頁面，讓喜歡分享來生形象、日常生活或行善經驗的使用者在我們的自有社群上互動。`功德撲滿`是我們的主要商品頁面，提供使用者報名參加慈善活動與進行捐款的管道，同時獲得陰德值以換取來生相關商品。為了讓初來乍到的使用者更了解我們的服務，`Intro`頁面的滾動式動畫可以讓使用者快速進入故事，地圖式拖曳設計的`網站首頁`、`投放所介紹`頁面與視窗左下的`來生問事處`則幫助使用者更有脈絡地瀏覽全站。`會員中心`則提供了使用者快速了解當前用戶狀態的途徑，並利用`NodeMailer`寄送驗證信與來生速報電子報。

我們將使用者身份分成三類，未登入的訪客、仍在世的生者以及即將前往來生的亡魂。

:eyes:為了使設計風格突出並保有一致性，除了希望方塊頁面的素材之外，全數為四位 HereAfter UI 小組的成員設計並繪製而成。並規劃了淺色與深色兩種色彩配置主題，分別對應生者與亡魂兩種使用者身份，使用者也可以依心情自由切換。

如果可以選擇，來生的你想要怎麼活著？

# Menu-目錄
* [網站起源](#網站起源)
* [網站功能](#網站功能)
* [網站視覺](#網站視覺)
* [網站聲明](#網站聲明)
* [資料來源](#資料引用來源)

# 網站起源

為資策會第 26 屆前端工程師就業養成班的 D 組成員共同執行的專案，為了讓組長天馬行空的想像具體成形，同時也讓各個組員想學習的技術有發揮的空間，我們不設限地進行各種討論與發想，並將之彙整統一起來。全員皆負責自己的頁面 React 前台、使用者流程設計、串接後台資料庫與規劃 API 路徑。

# 網站功能

* 所有頁面
  * 生者／亡魂雙色彩佈景主題。

* 首頁
  * 採用拖曳式地圖設計，使用者可以點擊各區域前往對應頁面。
  * 根據使用者身份調整區塊顯示。

* Intro
  * 利用 Scroll Motion 進行的 CSS Animation。
  * Skip 按鈕方便使用者跳過動畫。

* 陰德值測定心理測驗
  * 根據使用者的選擇計算出加權值，存入資料庫會員資料並即時更新數值在 Navbar 上。

* 投放所介紹頁面與 Loading 動畫
  * CSS Animation。

* 投胎速報頁面
  * 可以標籤篩選各種分類的新聞，並點擊以查看詳細內容。
  * 閱讀新聞內容時也可以點擊側邊清單閱讀其他則新聞。
  * 可以點擊寄送電子報按鈕，有空時再閱讀。

* 來生問事處 (Chatbot)
  * 根據使用者遇到的問題導向各頁面。
  * 投胎相關卡牌占卜。

* 功德撲滿頁面
  * 活動地點、類型、關鍵字篩選、價格或陰德值回饋排序功能。
  * 會員可以將商品加入購物車，並即時顯示購物車內商品數量。
  * 會員可以瀏覽購物車內容，並刪除或選取想要結帳的慈善活動。
  * 可勾選填入會員資料直接作為結帳資料。
  * 信用卡與 LinePay 兩種結帳方式。

* 來生形象頁面
  * 可以從來生衣櫥分享來生形象，首個形象會自動作為會員頭像。
  * 客製化來生形象，可以選擇體型與各種部件，超過千種組合。
  * 隨機按鈕可隨機產生來生形象。
  * 部分部件有陰德值門檻，超過才可選配。

* 良辰吉地頁面
  * 國家、城市篩選與時間、陰德值排序功能。
  * 利用 react-window 進行效能優化。
  * 收藏良辰吉地與加入轉生購物車功能。
  * 分頁按鈕切換商品列表與收藏列表。
  * 以 react-leaflet 製作地圖區塊，且可以由商品列表點擊以導向對應位址。
  * 以 react-leaflet-cluster 將各良辰吉地地標化，可搜尋區域內的地標，點擊會跳出資訊。

* 交流分享頁面
  * 分頁按鈕切換主頁、個人主頁、我的收藏或發佈貼文頁面。
  * 關鍵字或標籤搜尋貼文功能。
  * 會員可以發佈貼文，並給予貼文標籤。
  * 會員可以按讚或收藏貼文，也可以查看來生形象細節，甚至一鍵套用來生形象。
  * 會員可以在討論區留言，留言區會自動捲動到最底部。
  * 凡走過必留下痕跡，貼文只能修改，留言則可以修改或刪除。
  * 留言時間會像 Instagram 轉換為幾秒鐘前、一分鐘內等標示方式依序排列。

* 會員中心頁面
  * 使用者可以註冊、登入、並隨時變更其會員資料。
  * 使用 debounce 處理欄位格式驗證優化效能。
  * 以 NodeMailer 寄送忘記密碼的驗證碼。
  * 會員資料正確呈現，並可點擊導向相關頁面。
  * 歷史訂單查詢功能。

* 行善小遊戲業面
  * 以 pure CSS 畫出大型機台視覺呈現。
  * 以 60FPS 在 canvas 上繪製遊戲畫面。
  * 每日限定遊玩次數。
  * 遊戲積分可以存入資料庫並即時更新陰德值顯示。

* 轉生購物車頁面
  * 對會員進行身份驗證，亡魂身份的會員方可進入。
  * 以 swiper 呈現會員所有來生形象。
  * 簡潔明瞭的介面設計與結帳流程，可導向相關頁面重新挑選商品。

* 希望方塊頁面
  * 較為柔和的轉場動畫設計。
  * 以 @react-three/fiber 作為 renderer 呈現 3D 場景。
  * 自行撰寫 shader 傳入 shaderMaterial 中計算方塊動畫。

# 網站視覺

<img width="1430" alt="截圖 2022-09-01 01 51 36" src="https://user-images.githubusercontent.com/106054083/187748496-eac7eee8-21d0-4dee-afb6-147bf19c4e12.png">
<img width="1436" alt="截圖 2022-09-01 01 43 10" src="https://user-images.githubusercontent.com/106054083/187748196-fc28bfa7-f9e1-4b7a-8603-23e4d3078d21.png">
<img width="1432" alt="截圖 2022-09-01 01 44 05" src="https://user-images.githubusercontent.com/106054083/187748623-126d75cb-a78a-4ca2-a651-2b162a14661a.png">
<img width="1432" alt="截圖 2022-09-01 01 45 25" src="https://user-images.githubusercontent.com/106054083/187748694-f96f30e0-efba-4b47-9890-d687330abd62.png">
<img width="1430" alt="截圖 2022-09-01 01 47 25" src="https://user-images.githubusercontent.com/106054083/187748783-368b1ac1-b739-4a0b-86c7-ba3f803bae97.png">
<img width="1433" alt="截圖 2022-09-01 01 47 47" src="https://user-images.githubusercontent.com/106054083/187748848-7cd78e3c-44d2-4bdb-b313-b02e2653f3b6.png">
<img width="1434" alt="截圖 2022-09-01 01 48 39" src="https://user-images.githubusercontent.com/106054083/187749548-e0e14404-d9c5-453d-820c-215bd7942f08.png">

<img width="1430" alt="截圖 2022-09-01 01 49 40" src="https://user-images.githubusercontent.com/106054083/187748911-d834fc29-aacf-4990-990f-f16bac37f381.png">
<img width="1430" alt="截圖 2022-09-01 01 53 20" src="https://user-images.githubusercontent.com/106054083/187748982-364dad3b-f3e0-4ab9-af2f-b91e37cd9a58.png">
<img width="1432" alt="截圖 2022-09-01 01 52 44" src="https://user-images.githubusercontent.com/106054083/187749032-443e6dea-3750-4051-9114-decdcd93108e.png">
<img width="1429" alt="截圖 2022-09-01 01 54 05" src="https://user-images.githubusercontent.com/106054083/187749102-5209f00b-6cbc-4ca1-9e04-88e9116bdf2e.png">
<img width="1432" alt="截圖 2022-09-01 01 54 25" src="https://user-images.githubusercontent.com/106054083/187749152-362c8a40-4b3a-4fb7-9f25-c39fd47d8896.png">
<img width="1432" alt="截圖 2022-09-01 01 56 31" src="https://user-images.githubusercontent.com/106054083/187749203-923b6370-4eb8-478b-9ca2-0cd8bd456586.png">
<img width="1432" alt="截圖 2022-09-01 01 58 01" src="https://user-images.githubusercontent.com/106054083/187749234-366b7690-9c07-4a13-9b6d-670152f1e112.png">
<img width="1423" alt="截圖 2022-09-01 02 00 10" src="https://user-images.githubusercontent.com/106054083/187749294-260b3cb2-575b-4302-87f9-e8db1bd74eb0.png">
<img width="1432" alt="截圖 2022-09-01 02 00 27" src="https://user-images.githubusercontent.com/106054083/187749321-4515f1f6-60f5-4704-9fa2-3ddcb2482a94.png">
<img width="1430" alt="截圖 2022-09-01 02 00 57" src="https://user-images.githubusercontent.com/106054083/187749378-20579e50-fb91-49cc-bec8-f4dd5d1794f5.png">
<img width="1431" alt="截圖 2022-09-01 02 01 29" src="https://user-images.githubusercontent.com/106054083/187749425-24f47cb1-04d5-4c09-8ba9-c1bc22651ae5.png">

# 網站聲明
  
* 本作品目前尚屬開發階段，商品圖片、內容等，純粹為演示前端使用，不做任何商業用途。

# 資料引用來源

* [キボウノアカリ](https://kibounoakari.com/)

# Hereafter-Design
Mfee-26 project

#### 小銘的讚讚css
<a href="https://codepen.io/akimouin/pen/KKoVwgW">CodePen Link</a>

### GoogleFont的引入
M PLUS Rounded 1c & Noto Fonts

<strong>1. 在public > index.html</strong>
```html
<!-- googlefont -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@100;300;400;500;700;800;900&family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap"
rel="stylesheet" />
```

<strong>2. css使用</strong>
```css
font-family: 'M PLUS Rounded 1c', 'Noto Sans TC', sans-serif;
```

