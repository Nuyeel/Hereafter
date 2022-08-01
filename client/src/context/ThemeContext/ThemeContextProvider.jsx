import { useState } from 'react';
import ThemeContext, { themes } from './ThemeContext';

// FIXME: 如果有要記錄使用者狀況決定配色
// 資料庫中要有相對應的表 並且配合 Nav.jsx 的換色按鈕
// 資料庫中的字串順位要高於 localStorage 中的 'theme' 字串

// ThemeContext 定義並傳出結構
// ThemeContextProvider 設定 state 並傳出 Component
function ThemeContextProvider(props) {
    let localTheme = themes.light; // 預設值 注意它是個物件

    const localThemeStr = localStorage.getItem('theme');
    try {
        if (localThemeStr === 'dark') {
            // 只有是 'dark' 時才換 防止使用者亂玩
            localTheme = themes[localThemeStr];
        }
    } catch (ex) {
        console.log('exception:', ex);
    }

    // 不是 'dark' 時都直接用預設淺色配置
    const [theme, setTheme] = useState(localTheme);

    // 將方法解構賦值放在物件之中
    // 只有 value 的內容可以做為 Context 達成 drilling
    // 也可以給 ThemeProvider props
    // 但就一定要一層一層傳遞了
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;
