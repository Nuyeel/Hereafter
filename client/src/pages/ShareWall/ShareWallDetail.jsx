// 使用套件
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CgClose } from 'react-icons/cg';
import DeedSoul from './components/Icons/DeedSoul';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
// import { AiFillHeart } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
// import { BsBookmark } from 'react-icons/bs';
// import { BsBookmarkFill } from 'react-icons/bs';

import { API_SHAREWALL } from '../../config/ajax-path';
import { STATIC_SHAREWALL_AVA } from '../../config/ajax-path';

// Context
import ThemeContext from '../../context/ThemeContext/ThemeContext';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

import './ShareWallDetail.scss';

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
        postTagResults: [],
        isLoading: true,
    });

    const { pageName } = props;

    const { theme } = useContext(ThemeContext);
    const { setHeader } = useContext(HeaderContext);

    const { sharePostID } = useParams();
    const navigate = useNavigate();

    const axiosSharePostGET = async (str) => {
        const result = await axios.get(`${API_SHAREWALL}/${str}`);
        console.log(result.data);
        // 在這裡將 isLoading 切換為 false 以顯示文章內容
        setSharePostDetailData({ ...result.data, isLoading: false });
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);

    // TODO: 取得單一貼文內容
    useEffect(() => {
        axiosSharePostGET(sharePostID);
    }, [sharePostID]);

    // 在此進行解構賦值
    // ASK: 物件中帶有陣列的話應該怎麼寫？
    // ASK: 文章雖然是限定兩百字可是如果被存一堆換行會 GGQQ 欸 QQ
    const {
        isLoading,
        postResults: { account, share_post_title, member_sid },
        postTagResults,
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
                                <p className="cpl-ivi-detail">
                                    {fakeAvatarDetail.length >= 35
                                        ? `${fakeAvatarDetail.slice(
                                              0,
                                              35
                                          )} ...更多`
                                        : fakeAvatarDetail}
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
                                    {/* FIXME: 不要寫 inline */}
                                    <AiFillPlusCircle className="cpl-pcb-ivi-ia-AiFillPlusCircle" />
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
                                <div className="cpl-pcb-ita-ta-inner-tags">
                                    {/* <span
                                key={v.share_post_tag_sid}
                                className="cpl-pcb-ita-ta-ir-tad-item"
                            >
                                #{v.share_post_tag_text}
                            </span> */}
                                    {postTagResults.map((v, i) => (
                                        <span
                                            key={v.share_post_tag_sid}
                                            className="cpl-pcb-ita-ta-it-tag-item"
                                        >
                                            {/* 測試用 標籤最大六字 */}
                                            #豬肉榮賣豬肉
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="cpl-pcb-ita-text-heading d-flex justify-content-between align-items-center">
                                <div className="cpl-pcb-ita-th-inner-left d-flex align-items-center">
                                    <div className="cpl-pcb-ita-th-il-mh-area">
                                        <img
                                            className="cpl-pcb-ita-th-memberhead"
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
                                        <AiOutlineHeart className="cpl-pcb-ita-th-ir-la-AiHeart" />
                                        <p className="cpl-pcb-ita-th-ir-la-likes-number">
                                            {/* DONE: 破千時 999+ */}
                                            {sharePostDetailData.postResults
                                                .share_post_likes > 999
                                                ? '999+'
                                                : sharePostDetailData
                                                      .postResults
                                                      .share_post_likes}
                                        </p>
                                    </div>
                                    <div className="cpl-pcb-ita-th-ir-collects-area d-flex align-items-center">
                                        {/* COLLECTS 按鈕 */}
                                        {/* 利於調整大小 className 要一樣 */}
                                        <FaRegBookmark className="cpl-pcb-ita-th-ir-la-AiBookmark" />
                                        <p className="cpl-pcb-ita-th-ir-la-collects-number">
                                            {/* DONE: 破千時 999+ */}
                                            {sharePostDetailData.postResults
                                                .share_post_collects > 999
                                                ? '999+'
                                                : sharePostDetailData
                                                      .postResults
                                                      .share_post_collects}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="cpl-pcb-ita-text-content">
                                {
                                    sharePostDetailData.postResults
                                        .share_post_text
                                }
                            </div>
                        </div>
                        <CgClose
                            className="cpl-pcb-close-icon"
                            style={{ cursor: 'pointer' }}
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
