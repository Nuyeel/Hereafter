import { useContext } from 'react';

import ThemeContext from '../context/ThemeContext/ThemeContext';

import Header from './Header';

// TODO: 記得要修正根據不同的設備高度調整 paddingTop
// DONE: 改用 index.scss 搭配 className 管理

function MainContent(props) {
    const { theme } = useContext(ThemeContext);

    return (
        // 感覺以我們的設計來說不用 <main> 但先維持
        // 各子區域 margin 最好統一是 bottom 來防止 margin collapsing
        <main role="main" className="main-padding-top flex-shrink-0">
            <Header />
            {props.children}
        </main>
    );
}

export default MainContent;
