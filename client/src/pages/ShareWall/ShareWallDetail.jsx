// 使用套件
import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/css/OverlayScrollbars.css';

// scss
import './ShareWallDetail.scss';

import { CgClose } from 'react-icons/cg';
import DeedSoul from './components/Icons/DeedSoul';
import { AiFillPlusCircle, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
// import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import { API_SHAREWALL, STATIC_SHAREWALL_AVA } from '../../config/ajax-path';

import Swal from 'sweetalert2';
import OutlineSoul from '../../images/sweetalert2/outline_soul.svg';
import OutlineSoulAlert from '../../images/sweetalert2/outline_soul_alert.svg';

// Context
import AuthContext from '../../context/AuthContext/AuthContext';
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

// FIXME: 假資料
const fakeAvatarDetail =
    '眼睛x2 / 精靈耳x2 / 膚色：粉色 / 貓尾 / 眼睛x2 / 精靈耳x2 / 膚色：粉色 / 貓尾 / 眼睛x2 / 精靈耳x2 / 膚色：粉色 / 貓尾 / 眼睛x2 / 精靈耳x2 / 膚色：粉色 / 貓尾';
const fakePrice = 3500;

function ShareWallDetail(props) {
    // FIXME: 詳細寫出物件鍵值對才是正確寫法
    const [sharePostDetailData, setSharePostDetailData] = useState({
        postResults: {
            share_post_title: '',
        },
        postTagsResults: [],
        postCommentsResults: [],
        loginUserResults: {
            loginID: 0,
            loginAccount: '',
            isLiked: false,
            isCollected: false,
        },
        isLoading: true,
    });
    const [sharePostComment, setsharePostComment] = useState('');
    const [enterCounter, setEnterCounter] = useState(0);

    const { pageName } = props;

    const { authorized, token } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const { setHeader } = useContext(HeaderContext);
    const commentRef = useRef(null);

    const { sharePostID } = useParams();
    const navigate = useNavigate();

    const axiosSharePostGET = async (sharePostID) => {
        const result = await axios.get(`${API_SHAREWALL}/${sharePostID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result.data);
        // 在這裡將 isLoading 切換為 false 以顯示文章內容
        setSharePostDetailData({ ...result.data, isLoading: false });
    };

    const axiosSharePostActionGET = async (actionType) => {
        const result = await axios.get(
            `${API_SHAREWALL}/${sharePostID}/${actionType}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(result.data);

        if (result.data.affectedRows === 1) {
            // ASK: 已經按讚 需要動畫 但又要 setState() 該怎麼做？
            axiosSharePostGET(sharePostID);
        }

        return;
    };

    const axiosSharePostCommentPOST = async () => {
        const result = await axios.post(
            `${API_SHAREWALL}/${sharePostID}/comment`,
            {
                data: {
                    comment: sharePostComment,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(result.data);

        if (result.data.affectedRows === 1) {
            axiosSharePostGET(sharePostID);
        }

        return;
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);

    // TODO: 取得單一貼文內容
    // DONE: 可以考慮進一步寫成 useCallback
    useEffect(() => {
        axiosSharePostGET(sharePostID);
    }, [sharePostID]);

    // 在此進行解構賦值
    // ASK: 文章雖然是限定兩百字可是如果被存一堆換行會 GGQQ 欸 QQ
    const {
        isLoading,
        postResults: {
            account,
            share_post_title,
            member_sid,
            share_post_likes,
            share_post_collects,
            share_post_text,
        },
        postTagsResults,
        postCommentsResults,
        loginUserResults: {
            id: loginID,
            account: loginAccount,
            isLiked,
            isCollected,
        },
    } = sharePostDetailData;

    // FIXME: 處理閃爍問題 第一次入頁必閃
    // ASK: 至寧醬: TODO: 請用 spinner 或 placeholder 解決
    return (
        <>
            {!isLoading ? (
                <div
                    className="container cpl-post-card-container d-flex justify-content-center align-items-center"
                    style={{ color: theme.cHeader }}
                >
                    <div
                        className={`cpl-post-card-body ${
                            theme.title === 'light'
                                ? 'cpl-pcb-box-shadow-light'
                                : 'cpl-pcb-box-shadow-dark'
                        } d-flex flex-column flex-lg-row mx-0 px-0`}
                        style={{ backgroundColor: theme.bgcMainDiv }}
                    >
                        <div className="col-lg-6 cpl-pcb-inner-avatar-area">
                            <img
                                src={`${STATIC_SHAREWALL_AVA}${sharePostID}.png`}
                                alt=""
                                className="cpl-pcb-avatar"
                            />
                            <div
                                className="cpl-pcb-af-round"
                                style={{
                                    borderColor: theme.bcAvatarFrame,
                                }}
                            />
                            <div
                                className="cpl-pcb-af-square"
                                style={{
                                    borderColor: theme.bcAvatarFrame,
                                }}
                            />
                            {/* FIXME: 先用假資料 */}
                            <div className="container cpl-pcb-inner-avatar-info">
                                <p className="cpl-ivi-title">形象詳情</p>
                                {/* FIXME: onClick 要跳出東西 */}
                                <p className="cpl-ivi-detail">
                                    {fakeAvatarDetail.length >= 35 ? (
                                        <>
                                            {fakeAvatarDetail.slice(0, 35)}{' '}
                                            <span
                                                className="cpl-ivi-d-more"
                                                onClick={() => {
                                                    alert('施工中');
                                                }}
                                            >
                                                ...更多
                                            </span>
                                        </>
                                    ) : (
                                        fakeAvatarDetail
                                    )}
                                </p>
                                <div className="cpl-pcb-ivi-interaction-area d-flex justify-content-center align-items-center">
                                    {/* TODO: 怎麼換顏色？ */}
                                    {/* DONE: 自製成 Component */}
                                    <DeedSoul
                                        fillColor={theme.cHeader}
                                        strokeColor={theme.cHeader}
                                    />
                                    <p className="cpl-pcb-ivi-ia-price px-2">
                                        {fakePrice}
                                    </p>
                                    <AiFillPlusCircle
                                        className="cpl-pcb-ivi-ia-AiFillPlusCircle"
                                        onClick={() => {
                                            // FIXME: 這裡要去一鍵套用
                                            alert('施工中');
                                        }}
                                    />
                                    {theme.title === 'dark' ? (
                                        <div className="cpl-pcb-ivi-ia-AiFillPlusCircle-filler"></div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="container col-lg-6 cpl-pcb-inner-text-area">
                            <div className="cpl-pcb-ita-title-area">
                                <p className="cpl-pcb-ita-ta-inner-title">
                                    {share_post_title ? share_post_title : ''}
                                </p>
                                <div className="cpl-pcb-ita-ta-inner-tags d-flex">
                                    {/* FIXME: 要點擊標籤搜尋嗎？ */}
                                    {/* FIXME: 測試用 標籤最大六字 */}
                                    {/* <span
                                        key={v.share_post_tag_sid}
                                        className="cpl-pcb-ita-ta-it-tag-item flex-shrink-0"
                                    >
                                        #豬肉榮賣豬肉
                                    </span> */}
                                    {postTagsResults.map((v, i) => (
                                        <span
                                            key={v.share_post_tag_sid}
                                            className="cpl-pcb-ita-ta-it-tag-item flex-shrink-0"
                                        >
                                            #{v.share_post_tag_text}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="cpl-pcb-ita-text-heading d-flex justify-content-between align-items-center">
                                <div className="cpl-pcb-ita-th-inner-left d-flex align-items-center">
                                    <div className="cpl-pcb-ita-th-il-mh-area">
                                        <img
                                            className="cpl-pcb-ita-th-il-mh-memberhead"
                                            src={`${STATIC_SHAREWALL_AVA}${member_sid}.png`}
                                            alt=""
                                        />
                                    </div>
                                    <p className="cpl-pcb-ita-th-il-account">
                                        {account}
                                    </p>
                                </div>
                                <div className="cpl-pcb-ita-th-inner-right d-flex">
                                    <div className="cpl-pcb-ita-th-ir-likes-area d-flex align-items-center">
                                        {/* LIKES 按鈕 */}
                                        {/* 利於調整大小 className 要一樣 */}
                                        {/* FIXME: 點擊事件寫入資料庫 */}
                                        {/* FIXME: 直接註冊不同函式就好 */}
                                        {isLiked ? (
                                            <AiFillHeart
                                                className="cpl-pcb-ita-th-ir-la-AiHeart isLiked"
                                                onClick={() => {
                                                    // 為登入照理來說沒機會看到
                                                    // 但是防止有心人還是擋一下
                                                    if (!authorized) {
                                                        return Swal.fire({
                                                            title: '請先登入',
                                                            imageUrl:
                                                                OutlineSoulAlert,
                                                            imageHeight: 50,
                                                            imageWidth: 50,
                                                            showConfirmButton: false,
                                                        });
                                                    }
                                                    Swal.fire({
                                                        title: '您不喜歡這個形象嗎？',
                                                        imageUrl: OutlineSoul,
                                                        imageHeight: 50,
                                                        imageWidth: 50,
                                                        // ASK: 這也需要明暗配色的話要寫在這裡
                                                        // confirmButtonColor:
                                                        // '#DD6B55',
                                                        confirmButtonText:
                                                            '不喜歡了',
                                                        showDenyButton: true,
                                                        // ASK: 這也需要明暗配色的話要寫在這裡
                                                        // denyButtonColor:
                                                        // '#DD6B55',
                                                        denyButtonText:
                                                            '還是很愛',
                                                    }).then((result) => {
                                                        if (
                                                            result.isConfirmed
                                                        ) {
                                                            axiosSharePostActionGET(
                                                                'dislike'
                                                            );
                                                        } else if (
                                                            result.isDenied
                                                        ) {
                                                            // console.log(
                                                            //     'Sweetalert2: ',
                                                            //     '一輩子...'
                                                            // );
                                                        }
                                                    });
                                                }}
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                className="cpl-pcb-ita-th-ir-la-AiHeart"
                                                onClick={() => {
                                                    if (!authorized) {
                                                        return Swal.fire({
                                                            title: '請先登入',
                                                            imageUrl:
                                                                OutlineSoulAlert,
                                                            imageHeight: 50,
                                                            imageWidth: 50,
                                                            showConfirmButton: false,
                                                        });
                                                    }
                                                    Swal.fire({
                                                        title: '這個形象...真的很讚！',
                                                        imageUrl: OutlineSoul,
                                                        imageHeight: 50,
                                                        imageWidth: 50,
                                                        showConfirmButton: false,
                                                    }).then(() => {
                                                        axiosSharePostActionGET(
                                                            'like'
                                                        );
                                                    });
                                                }}
                                            />
                                        )}
                                        <p className="cpl-pcb-ita-th-ir-la-likes-number">
                                            {/* DONE: 破千時 999+ */}
                                            {share_post_likes > 999
                                                ? '999+'
                                                : share_post_likes}
                                        </p>
                                    </div>
                                    <div className="cpl-pcb-ita-th-ir-collects-area d-flex align-items-center">
                                        {/* COLLECTS 按鈕 */}
                                        {/* 利於調整大小 className 要一樣 */}
                                        {/* FIXME: 點擊事件寫入資料庫 */}
                                        {/* FIXME: 直接註冊不同函式就好 */}
                                        {isCollected ? (
                                            <FaBookmark
                                                className="cpl-pcb-ita-th-ir-la-AiBookmark isCollected"
                                                onClick={() => {
                                                    // 為登入照理來說沒機會看到
                                                    // 但是防止有心人還是擋一下
                                                    if (!authorized) {
                                                        return Swal.fire({
                                                            title: '請先登入',
                                                            imageUrl:
                                                                OutlineSoulAlert,
                                                            imageHeight: 50,
                                                            imageWidth: 50,
                                                            showConfirmButton: false,
                                                        });
                                                    }
                                                    Swal.fire({
                                                        title: '您確定要取消收藏嗎？',
                                                        imageUrl: OutlineSoul,
                                                        imageHeight: 50,
                                                        imageWidth: 50,
                                                        // ASK: 這也需要明暗配色的話要寫在這裡
                                                        // confirmButtonColor:
                                                        // '#DD6B55',
                                                        confirmButtonText:
                                                            '不喜歡了',
                                                        showDenyButton: true,
                                                        // ASK: 這也需要明暗配色的話要寫在這裡
                                                        // denyButtonColor:
                                                        // '#DD6B55',
                                                        denyButtonText:
                                                            '再想一下',
                                                    }).then((result) => {
                                                        if (
                                                            result.isConfirmed
                                                        ) {
                                                            axiosSharePostActionGET(
                                                                'discollect'
                                                            );
                                                        } else if (
                                                            result.isDenied
                                                        ) {
                                                            // console.log(
                                                            //     'Sweetalert2: ',
                                                            //     '一輩子...'
                                                            // );
                                                        }
                                                    });
                                                }}
                                            />
                                        ) : (
                                            <FaRegBookmark
                                                className="cpl-pcb-ita-th-ir-la-AiBookmark"
                                                onClick={() => {
                                                    if (!authorized) {
                                                        return Swal.fire({
                                                            title: '請先登入',
                                                            imageUrl:
                                                                OutlineSoulAlert,
                                                            imageHeight: 50,
                                                            imageWidth: 50,
                                                            showConfirmButton: false,
                                                        });
                                                    }
                                                    Swal.fire({
                                                        title: '您已收藏此篇貼文！',
                                                        imageUrl: OutlineSoul,
                                                        imageHeight: 50,
                                                        imageWidth: 50,
                                                        showConfirmButton: false,
                                                    }).then(() => {
                                                        axiosSharePostActionGET(
                                                            'collect'
                                                        );
                                                    });
                                                }}
                                            />
                                        )}
                                        <p className="cpl-pcb-ita-th-ir-la-collects-number">
                                            {/* DONE: 破千時 999+ */}
                                            {share_post_collects > 999
                                                ? '999+'
                                                : share_post_collects}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="cpl-pcb-ita-text-content">
                                {/* TABLE: 文章上限改成 168 字 */}
                                {share_post_text}
                                {/* TODO: 視情況加入社群分享功能 */}
                            </div>
                            <OverlayScrollbarsComponent
                                options={{
                                    className: `${
                                        theme.title === 'light'
                                            ? 'os-theme-light'
                                            : 'os-theme-dark'
                                    } cpl-pcb-ita-comments-container`,
                                    overflowBehavior: {
                                        x: 'hidden',
                                        y: 'scroll',
                                    },
                                    // scrollbars: {
                                    //     autoHide: 'scroll',
                                    //     autoHideDelay: 500,
                                    // },
                                }}
                                extensions={{}}
                            >
                                {/* TODO: 如果想要顯示時間 IG 只會顯示 */}
                                {/* X 小時 / X 天 / XXX 週 */}
                                {/* FIXME: 這是測試用的假留言 */}
                                <div className="cpl-pcb-ita-comment-item">
                                    <span className="cpl-pcb-ita-ci-account">
                                        FakeBoy
                                    </span>
                                    {/* FIXME: 如果沒有抓到留言要有一些東西 */}
                                    <span className="cpl-pcb-ita-ci-text">
                                        {Array(10)
                                            .fill()
                                            .map(() => {
                                                return '我是假ㄉ';
                                            })}
                                    </span>
                                </div>
                                {postCommentsResults.map((v, i) => (
                                    <div
                                        key={v.share_post_comment_sid}
                                        className="cpl-pcb-ita-comment-item"
                                    >
                                        <span className="cpl-pcb-ita-ci-account">
                                            {v.account}
                                        </span>
                                        <span className="cpl-pcb-ita-ci-text">
                                            {v.share_post_comment_text}
                                        </span>
                                    </div>
                                ))}
                            </OverlayScrollbarsComponent>
                            <div className="cpl-pcb-ita-text-comment-area d-flex justify-content-start">
                                <div className="cpl-pcb-ita-tca-mh-area">
                                    {/* FIXME: 找不到圖片會報錯 */}
                                    {/* 要有個欄位存預設形象 */}
                                    {/* 資料表沒有的時候給預設 */}
                                    {loginID ? (
                                        <img
                                            className="cpl-pcb-ita-tca-mh-memberhead"
                                            src={`${STATIC_SHAREWALL_AVA}${loginID}.png`}
                                            alt=""
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="d-flex align-items-center cpl-pcb-ita-tca-comment-area">
                                    <input
                                        style={{
                                            color: theme.cCommentInput,
                                            borderColor: theme.cCommentInput,
                                        }}
                                        className="form-control cpl-pcb-ita-tca-c-text"
                                        type="text"
                                        name="comment"
                                        ref={commentRef}
                                        value={sharePostComment}
                                        placeholder={`${
                                            loginAccount
                                                ? loginAccount
                                                : '我想說...'
                                        }`}
                                        onChange={(e) => {
                                            setsharePostComment(e.target.value);
                                        }}
                                        // DONE: Enter 直接留言
                                        // DONE: 留言寫進資料表
                                        // FIXME: 新增留言要跳到下面
                                        onKeyUp={(e) => {
                                            e.preventDefault();
                                            if (e.key !== 'Enter') {
                                                console.log('counter reset', 0);
                                                setEnterCounter(0);
                                            }
                                            if (e.key === 'Enter') {
                                                const newEnterCounter =
                                                    enterCounter + 1;
                                                if (newEnterCounter === 2) {
                                                    if (!authorized) {
                                                        return Swal.fire({
                                                            title: '請先登入',
                                                            imageUrl:
                                                                OutlineSoulAlert,
                                                            imageHeight: 50,
                                                            imageWidth: 50,
                                                            showConfirmButton: false,
                                                        });
                                                    }
                                                    axiosSharePostCommentPOST();
                                                    setEnterCounter(0);
                                                    return setsharePostComment(
                                                        ''
                                                    );
                                                }
                                                setEnterCounter(
                                                    newEnterCounter
                                                );
                                                return;
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <CgClose
                            className="cpl-pcb-close-icon"
                            onClick={() => {
                                // ASK: navigate(-1)
                                navigate(-1);
                                // navigate('/sharewall', { replace: true });
                            }}
                        />
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default ShareWallDetail;
