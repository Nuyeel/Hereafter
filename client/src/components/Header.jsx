import { useContext } from 'react';
import HeaderContext from '../context/HeaderContext/HeaderContext';

function Header() {
    // TODO: headerList 中的 item.params 匹配時顯示 item.title
    const headerContext = useContext(HeaderContext);

    return (
        <div className="container d-flex mb-3">
            {headerContext.title && (
                <h2 className="header">{headerContext.title}</h2>
            )}
            {/* TODO: 某些頁面必須要顯示分頁鈕 例如分享牆 */}
            {/* <button style={{ height: '30px' }}>fddsfdfds</button> */}
        </div>
    );
}

export default Header;
