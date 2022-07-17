# 寫在最前面

    建議安裝 TODO Highlight 這個 VSCODE Extension
    內建兩個關鍵字 TODO: 和 FIXME: 
    注意要包含冒號 也可以自行新增關鍵字

    也建議安裝 Material Icon Theme 這類 VSCODE Extension
    副檔名為 .jsx 時會很清楚地標示其為 React Component
    比較不需要辛苦地判斷首字大寫

### 前端架構 (使用 CRA, create-react-app 並手動更新與刪減)：

    // Ref: https://github.com/mfee-react/use-cart-hook
    /client
        /node_modules
        /public
            favicon.ico
            index.html
        /src
            /components (共用元件)
                Nav.jsx
                Background.jsx
            /pages (請記得裡面可以有 index.js (也可以取名為 Index.jsx) (購物車範例))
                /NextLife (其中也可以有 components 資料夾)
                    Nextlife.jsx
            /styles (集中管理 css 檔案的地方 建議檔名跟 Component 大小寫完全一樣)
            App.jsx
            index.js
            reportWebVitals.js (CRA 相依的效能監控套件)
            /utils (目前沒有這個資料夾)
        .eslintignore
        .eslintrc
        .prettierignore
        .prettierrc
        package.json
        package-lock.json

### 使用套件一覽：

    可至 package.json 的 dependencies 中查看

### 使用套件：

#### fontawesome-free 6.1.1

    // npm i @fortawesome/fontawesome-free
    // 用量不大的話其實可以只引用用到的 svg
    // 便於多人開發先全部引用

### 筆記：

#### 可能將來會使用或學到的套件

    // Ref: https://github.com/mfee-react/use-cart-hook/blob/main/package.json
    bootstrap
    react-bootstrap
    react-icons
    react-router-dom
    sass
    @fortawesome/react-fontawesome (目前只到 fontawesome 5)

#### favicon

    要放在 public 中
    檔名為 favicon.ico

#### CRA (Create-React-App) 原架構

    /client
        /node_modules
        /public
            index.html
            favicon.ico
            logo192.png
            logo512.png
            manifest.json
            robots.txt
        /src
            App.css
            App.js
            App.test.js
            index.css
            index.js
            logo.svg
            reportWebVitals.js
            setupTests.js
        package.json
        package-lock.json
        README.md