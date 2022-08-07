import { useState } from 'react';
import HeaderContext, { headers } from './HeaderContext';

function HeaderContextProvider(props) {
    const [header, setHeader] = useState(headers.default);

    // DONE: 分享牆分頁按鈕使用的功能
    const [shareWallPostsData, setShareWallPostsData] = useState([]);
    // TODO: 三態 'default', 'isAuthor', 'isCollector'

    const [shareWallSearchState, setShareWallSearchState] = useState('default');

    return (
        <HeaderContext.Provider
            value={{
                ...header,
                setHeader,
                shareWallPostsData,
                setShareWallPostsData,
                shareWallSearchState,
                setShareWallSearchState,
            }}
        >
            {props.children}
        </HeaderContext.Provider>
    );
}

export default HeaderContextProvider;
