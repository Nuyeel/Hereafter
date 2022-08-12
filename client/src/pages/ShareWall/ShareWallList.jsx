// 使用套件
import { useEffect, useContext } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import OutlineSoulAlert from '../../images/sweetalert2/outline_soul_alert.svg';

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
        searchParams,
        setSearchParams,
        shareWallPostsData,
        setShareWallPostsData,
    } = useContext(HeaderContext);
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    // 當前應該顯示貼文的頁數 是一個狀態
    // TODO: 滑動 lazy load 出頁數
    // const [postsPage, setPostsPage] = useState(0); // FIXME: 可能也要搬到 HeaderContext 去
    // axios POST 回來的資料
    // TABLE: {圖, 頭貼, 帳號, 讚數, 標題, 內文}
    // TABLE: {avatar, memberhead, account, likes, title, text}
    // const [postsData, setPostsData] = useState([]);
    // 搜尋用的標籤字串
    // const [searchParams, setSearchParams] = useState('');

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

    const handleSearchParams = () => {
        // FIXME: 如果進來無意義字串
        if (searchParams.trim() === '') {
            axiosTitleGET();
            navigate('/sharewall');
            return setSearchParams(''); // 有問題再改回 return;
        }
        // 如果有 hashtag 起頭是標籤搜尋 (去除頭尾空格之後)
        if (searchParams.trim().indexOf('#') === 0) {
            // console.log('搜 tag', '?searchtag=...');
            // 去除所有 . 以及空格 (\s)
            const hashSearchParams = searchParams.replace(/[.\s]+/gm, '');
            // console.log(hashSearchParams);
            // TODO: 找出所有 hashtag 位置索引
            let hashIndicesArray = [];
            for (
                let i = 0, strLength = hashSearchParams.length;
                i < strLength;
                i++
            ) {
                if (hashSearchParams[i] === '#') hashIndicesArray.push(i);
            }
            // console.log(hashIndicesArray);
            if (hashIndicesArray.length > 3) {
                Swal.fire({
                    title: '一篇文章最多只有三個標籤～',
                    imageUrl: OutlineSoulAlert,
                    imageHeight: 50,
                    imageWidth: 50,
                    showConfirmButton: false,
                });
            } else {
                let searchtagString = '';
                for (let i = 0; i < hashIndicesArray.length; i++) {
                    if (i !== 0) {
                        searchtagString += '&searchtag=';
                    }
                    searchtagString += hashSearchParams.slice(
                        hashIndicesArray[i] + 1,
                        hashIndicesArray[i + 1]
                    );
                }
                // console.log(searchtagString);
                axiosTagGET(searchtagString);
                navigate(`?searchtag=${searchtagString}`, { replace: true });
            }
        } else {
            // console.log('搜 title', '?search=...');
            if (searchParams.indexOf('#') !== -1) {
                // FIXME: 鬼鬼可以換個顏色
                Swal.fire({
                    title: '您輸入的搜尋內容不符規定！',
                    imageUrl: OutlineSoulAlert,
                    imageHeight: 50,
                    imageWidth: 50,
                    showConfirmButton: false,
                });
            } else {
                axiosTitleGET(searchParams.trim());
                navigate(`?search=${searchParams.trim()}`, { replace: true });
            }
        }
    };

    // TODO: 利用三態 'default', 'isAuthor', 'isCollector' 加上條件
    const axiosTagGET = async (str) => {
        // 這裡做標籤搜尋
        let axiosUrl = `${API_SHAREWALL}?searchtag=${str}`;

        // 加上三態條件
        // 'default' 不用做什麼
        if (shareWallSearchState === 'isAuthor') {
            axiosUrl += '&isAuthor=true';
        } else if (shareWallSearchState === 'isCollector') {
            axiosUrl += '&isCollector=true';
        }

        const result = await axios.get(axiosUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result.data);

        if (result.data.length === 0) {
            Swal.fire({
                title: '找不到符合條件的貼文...',
                imageUrl: OutlineSoulAlert,
                imageHeight: 50,
                imageWidth: 50,
                showConfirmButton: false,
            });
        }

        setShareWallPostsData(result.data);
    };

    const axiosTitleGET = async (str) => {
        // 這裡做標題搜尋
        if (!str) {
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
        } else {
            let axiosUrl = `${API_SHAREWALL}?search=${str}`;

            // 加上三態條件
            // 'default' 不用做什麼
            if (shareWallSearchState === 'isAuthor') {
                axiosUrl += '&isAuthor=true';
            } else if (shareWallSearchState === 'isCollector') {
                axiosUrl += '&isCollector=true';
            }

            const result = await axios.get(axiosUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(result.data);
            if (result.data.length === 0) {
                Swal.fire({
                    title: '找不到符合條件的貼文...',
                    imageUrl: OutlineSoulAlert,
                    imageHeight: 50,
                    imageWidth: 50,
                    showConfirmButton: false,
                });
            }
            setShareWallPostsData(result.data);
        }
    };

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
        console.log(result.data);
        setShareWallPostsData(result.data);
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    // 取得卡片內文
    useEffect(() => {
        handleSearchParams();
    }, [shareWallSearchState]);

    return (
        <>
            <div className="container mb-3">
                <ShareWallTagbar />
                <ShareWallSearchBar
                    handleSearchParams={handleSearchParams}
                    axiosListGET={axiosListGET}
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
                                memberhead={v.author_profile}
                                account={v.account}
                                likes={v.share_post_likes}
                                title={v.share_post_title}
                                text={v.share_post_text}
                                isliked={v.share_post_isliked}
                                imgName={v.img_name}
                                handleSearchParams={handleSearchParams}
                            />
                        ))}
                </div>
                {/* </SimpleBar> */}
            </OverlayScrollbarsComponent>
        </>
    );
}

export default ShareWallList;
