# 寫在最前面

    建議安裝 TODO Highlight 這個 VSCODE Extension
    內建兩個關鍵字 TODO: 和 FIXME: 
    注意要包含冒號 也可以自行新增關鍵字

    也建議安裝 Material Icon Theme 這類 VSCODE Extension
    副檔名為 .jsx 時會很清楚地標示其為 React Component
    比較不需要辛苦地判斷首字大寫

    CRA 產生的專案在 node 環境會被警告有 6 high severity vulnerabilities
    意思是有六個高威脅性的脆弱處 這有可能是誤報 可以先不用緊張
    Ref: https://github.com/facebook/create-react-app/issues/11174

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
            /images (固定供前端使用的圖片放這裡)
                    (但如果是使用者或管理員上傳的圖片就統一放後端)
                    (才不會部分在前端 部分在後端反而亂掉)
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

#### bootstrap 5.1.3

    // npm i bootstrap
    // Eason 建議只使用 bootstrap-grid.css

#### Coding Style 檢查工具

    // npm i eslint-config-react-app
    // npm i eslint-plugin-import
    // npm i eslint-plugin-jsx-a11y
    // npm i eslint-plugin-prettier
    // npm i eslint-plugin-react
    // npm i eslint-plugin-react-hooks
    // npm i prettier

#### 希望方塊使用

    // npm i three 
    // npm i @react-three/fiber
    // 因為是必須跟 Real DOM 交互的動畫
    // 所以會大量使用 useRef()

#### 發送 AJAX (Asynchronous JavaScript and XML) 用

    // npm i axios
    // ./server/README.md 裏面寫得比較詳細
    // 至寧老師: 使用 axios 可以延長五到十年的壽命

    // 前端這邊是用 React 作為框架
    // 所以把 React 中會碰到的問題寫在這裡

    // Ref: https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
    // Ref: https://github.com/facebook/react/issues/14326
    // Redux 作者 (Dan Abramov) 的建議
    // 因為 useEffect() 是同步的
    // 其中不能直接使用 async/await function
    // 所以要多包一層
    // ex.
    // 涼枕補上了錯誤處理的部分
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                let response = await fetch('api/data');
                response = await response.json();
                dataSet(response);
            } catch (error) {
                console.log('Fetch failed', error);
            }
        }

        fetchMyAPI();
    }, []);

#### styled component 套件

    // npm i @emotion/styled
    // 這可以撰寫具有 props 的 styled component
    // ex. 
    // Step 1. 引入
    import styled from "@emotion/styled";
    // Step 2. 宣告 theme
    const theme = {
        light: {
            backgroundColor: "#ededed",
            titleColor: "#212121",
        },
        dark: {
            backgroundColor: "#1F2022",
            titleColor: "#f9f9fa",
        },
    };
    // Step 3. 在該 Component.jsx 上方宣告
    const Location = styled.div`
        font-size: 28px;
        color: ${({ theme }) => theme.titleColor};
        margin-bottom: 20px;
    `;
    // Step 4. 在組件函式中使用它並給予 props
    function Component() {
        return <Location theme='light' />;
    }

    // npm i @emotion/react
    // 這可以撰寫更複雜的 styled component
    // 將 css 物件傳入 Component 中
    // 請注意 buttonDefault 是一個回傳 css 物件的函式
    // Step 1. 引入
    import { css } from "@emotion/react";
    // Step 2. 在該 Component.jsx 上方宣告
    const buttonDefault = (props) => css`
        display: block;
        width: 120px;
        height: 30px;
        font-size: 14px;
        color: ${props.theme === "dark" ? "#dadada" : "#212121"};
    `;
    const RejectButton = styled.button`
        ${buttonDefault}
        background-color: red;
    `;
    // Step 3. 在組件函式中使用它並給予 props
    function Component() {
        return <RejectButton theme='light'>R</RejectButton>;
    }

    // 缺點是會產生奇怪的 className
    // 但不用開發者工具看不到 而且週下載量不低

#### lodash

    // npm i lodash
    // 算是一個函式庫
    // 我想單純是為了使用 chunk 功能先給大家方便
    // 另外有 deepclone 深層拷貝
    // 跟 random 可以將陣列任意洗牌
    // 這些算比較常用
    // 可以參考中文文檔
    // Ref: https://www.lodashjs.com/
    // Ref: https://www.npmjs.com/package/lodash

### 可以考慮使用的套件：

#### 前端表單驗證用

    // 可以考慮用 Formik (React 官方建議) 或 yup (周下載量較高)
    // Ref: https://www.npmjs.com/package/formik
    // Ref: https://www.npmjs.com/package/yup

#### 讀取動畫相關

    // 讀取轉圈等待動畫
    // Ref: https://www.npmjs.com/package/react-spinners
    // Ref: https://www.npmjs.com/package/react-loader-spinner

    // 讀取文字等待動畫
    // Ref: https://react.semantic-ui.com/elements/placeholder/

#### checkbox 相關

    // react-checkbox-tree
    // 主要是關於 :indeterminate (不定核選方塊)
    // Ref: https://www.npmjs.com/package/react-checkbox-tree

#### UI 相關

    // mui
    // Ref: https://mui.com/zh/core/
    // 點左上的漢堡選單看 Components 其實是都有中文翻譯的

#### 還沒有後端時想要模擬從 API 取得 JSON 的話

    // npm i -g json-server
    // 有權限的問題 所以最好裝在全域
    // Ref: https://www.npmjs.com/package/json-server

### 筆記：

#### 可能將來會使用或學到的套件

    // Ref: https://github.com/mfee-react/use-cart-hook/blob/main/package.json
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