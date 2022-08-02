import { useContext } from 'react';

import ThemeContext from '../context/ThemeContext/ThemeContext';
import HeaderContext from '../context/HeaderContext/HeaderContext';

function Header() {
    // TODO: headerList 中的 item.params 匹配時顯示 item.title
    const { theme } = useContext(ThemeContext);
    const headerContext = useContext(HeaderContext);

    return (
        <div className="container d-flex header-container">
            {headerContext.title && (
                <h2
                    className="header"
                    style={{
                        color: theme.cHeader,
                    }}
                >
                    {headerContext.title}
                    <span
                        className="header-baseline-decoration"
                        style={{
                            backgroundColor: theme.bgcHeaderDecor,
                        }}
                    />
                </h2>
            )}
            {/* TODO: 某些頁面必須要顯示分頁鈕 例如分享牆 */}
            {/* <button style={{ height: '30px' }}>fddsfdfds</button> */}
        </div>
    );
}

export default Header;
