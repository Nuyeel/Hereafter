import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// CRA (Create React App) 相依的效能監控套件
// import reportWebVitals from './reportWebVitals';

// 與 css 使用的全域變數有關的 javascript
import './utils/onWindowResize';

// 這里引入的 css 會套用至全域
import './styles/reset.css';
// 正式上線改用 bootstrap-grid.min.css
import 'bootstrap/dist/css/bootstrap-grid.css';
// 正式上線改用 all.min.css
import '@fortawesome/fontawesome-free/css/all.css';
// 共通 css
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// StrictMode 會 Render 兩次以檢查可能發生的錯誤
// 所以 console.log() 也會印兩次
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
