import { useState } from 'react';
import HeaderContext, { headers } from './HeaderContext';

function HeaderContextProvider(props) {
    const [header, setHeader] = useState(headers.default);

    // DONE: 分享牆分頁按鈕使用的功能
    const [shareWallPostsData, setShareWallPostsData] = useState([]);
    // TODO: 三態 'default', 'isAuthor', 'isCollector'

    const [shareWallSearchState, setShareWallSearchState] = useState('default');

    // 搜尋字串 會給 tagbar 和 searchbar 用
    const [searchParams, setSearchParams] = useState('');

    return (
        <HeaderContext.Provider
            value={{
                ...header,
                setHeader,
                shareWallPostsData,
                setShareWallPostsData,
                shareWallSearchState,
                setShareWallSearchState,
                searchParams,
                setSearchParams,
            }}
        >
            {props.children}
        </HeaderContext.Provider>
    );
}

export default HeaderContextProvider;
