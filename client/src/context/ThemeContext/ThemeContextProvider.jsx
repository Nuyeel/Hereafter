import { useState } from 'react';
import ThemeContext, { themes } from './ThemeContext';

// ThemeContext 定義並傳出結構
// ThemeContextProvider 設定 state 並傳出 Component
function ThemeContextProvider(props) {
    const [theme, setTheme] = useState(themes.light);

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
