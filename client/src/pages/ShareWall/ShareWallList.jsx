// 使用套件
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/css/OverlayScrollbars.css';

// scss
import './ShareWallList.scss';

// Context
import AuthContext from '../../context/AuthContext/AuthContext';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

// AJAX PATH
import { API_SHAREWALL } from '../../config/ajax-path';

// 共通組件

// 頁面組件
import ShareWallTagbar from './components/ShareWallTagbar';
import ShareWallSearchBar from './components/ShareWallSearchBar';
import SharePostCard from './components/SharePostCard';

function ShareWallList(props) {
    const { pageName } = props;
    const { theme } = useContext(ThemeContext);
    const {
        setHeader,
        shareWallSearchState,
        shareWallPostsData,
        setShareWallPostsData,
    } = useContext(HeaderContext);
    const { authorized, token } = useContext(AuthContext);

    // 當前應該顯示貼文的頁數 是一個狀態
    // TODO: 滑動 lazy load 出頁數
    // const [postsPage, setPostsPage] = useState(0); // FIXME: 可能也要搬到 HeaderContext 去
    // axios POST 回來的資料
    // TABLE: {圖, 頭貼, 帳號, 讚數, 標題, 內文}
    // TABLE: {avatar, memberhead, account, likes, title, text}
    // const [postsData, setPostsData] = useState([]);
    // 搜尋用的標籤字串
    const [searchParams, setSearchParams] = useState('');

    const navigate = useNavigate();

    // TODO: 滾到特定位置就要去要資料
    // 不希望顯示在網址列中 所以要用 POST
    // num 後來要改成 postPage 來記憶 ++ 之類ㄉ
    // const axiosPOST = async (num) => {
    //     // console.log(num);
    //     const result = await axios(API_SHAREWALL, {
    //         method: 'POST',
    //         data: { num }, // FIXME: 參數怎麼設計？
    //         headers: {
    //             'Content-Type': 'Application/json',
    //             Authorization: `Bearer ${token}`,
    //         },
    //     });

    //     // console.log(result.data);
    //     setShareWallPostsData(result.data);
    // };

    const axiosListGET = async () => {
        let axiosUrl = `${API_SHAREWALL}`;

        // 加上三態條件
        // 'default' 不用做什麼
        if (shareWallSearchState === 'isAuthor') {
            axiosUrl += '?isAuthor=true';
        } else if (shareWallSearchState === 'isCollector') {
            axiosUrl += '?isCollector=true';
        }

        const result = await axios.get(axiosUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result.data);
        setShareWallPostsData(result.data);
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    // 取得卡片內文
    useEffect(() => {
        axiosListGET();
    }, [shareWallSearchState]);

    return (
        <>
            <div className="container mb-3">
                <ShareWallTagbar
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
                <ShareWallSearchBar
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
                {/* <h3 style={{ color: '#FFFFFF' }}>ShareWallList.jsx</h3> */}
            </div>
            {/* 目前捲到後面會沒有 margin-right */}
            {/* 實務上永遠捲不完 先不要處理 */}
            <OverlayScrollbarsComponent
                options={{
                    // className: 'os-theme-dark spc-osbc', // 預設為 os-theme-dark
                    className: `${
                        theme.title === 'light'
                            ? 'os-theme-light'
                            : 'os-theme-dark'
                    } cpl-spc-c-container`,
                    // className: "String", // 類別名稱
                    // resize: 'String', // 可否調整大小的設定 n, b, h, or v.
                    // normalizeRTL: false,
                    // paddingAbsolute: true,
                    // clipAlways: false,
                    overflowBehavior: {
                        x: 'scroll',
                        y: 'hidden',
                    },
                    // scrollbars: {
                    //     autoHide: 'scroll',
                    //     autoHideDelay: 500,
                    // },
                }}
                extensions={{}}
            >
                {/* <SimpleBar> */}
                <div className="container d-flex flex-column flex-lg-row cpl-share-post-container justify-content-start">
                    {/* ASK: Link 和 naivate 的差異 */}
                    {/* DONE: 機制也不同 navigate 會操作到 history */}
                    {/* <Link
                        to="4"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <SharePostCard />
                    </Link>
                    <p
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            navigate('4');
                        }}
                    >
                        bubu
                    </p>
                    <SharePostCard /> */}

                    {/* FIXME: 偷懶頭貼先用同一張 */}
                    {/* FIXME: 找不到資料的時候應該要顯示一個東西 */}
                    {/* FIXME: spinner */}
                    {shareWallPostsData &&
                        shareWallPostsData.map((v, i) => (
                            <SharePostCard
                                key={v.share_post_sid}
                                postsid={v.share_post_sid}
                                avatar={v.avatar_sid}
                                memberhead={v.member_sid}
                                account={v.account}
                                likes={v.share_post_likes}
                                title={v.share_post_title}
                                text={v.share_post_text}
                                isliked={v.share_post_isliked}
                                axiosListGET={axiosListGET}
                            />
                        ))}
                </div>
                {/* </SimpleBar> */}
            </OverlayScrollbarsComponent>
        </>
    );
}

export default ShareWallList;
