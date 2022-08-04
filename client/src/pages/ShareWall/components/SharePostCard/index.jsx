// 至寧醬: 去的時候不要 replace 回來用 navigate(-1)

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiOutlineHeart } from 'react-icons/ai';
// import { AiFillHeart } from 'react-icons/ai';

import './SharePostCard.scss';

import ThemeContext from '../../../../context/ThemeContext/ThemeContext';
import AuthContext from '../../../../context/AuthContext/AuthContext';

import { STATIC_SHAREWALL_AVA } from '../../../../config/ajax-path';

function SharePostCard(props) {
    const { postsid, avatar, memberhead, account, likes, title, text } = props;

    const { theme } = useContext(ThemeContext);
    const { authorized } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <>
            {postsid ? (
                <div
                    className={`cpl-share-post-card ${
                        theme.title === 'light'
                            ? 'cpl-spc-box-shadow-light'
                            : 'cpl-spc-box-shadow-dark'
                    } flex-shrink-0`}
                >
                    {/* 來生形象 */}
                    <img
                        className="cpl-spc-avatar"
                        src={`${STATIC_SHAREWALL_AVA}${avatar}.png`}
                        alt=""
                    />
                    <div
                        className="cpl-spc-af-round"
                        style={{
                            borderColor: theme.bcAvatarFrame,
                        }}
                    />
                    <div
                        className="cpl-spc-af-square"
                        style={{
                            borderColor: theme.bcAvatarFrame,
                        }}
                    />
                    {/* 會員頭貼 */}
                    <div className="cpl-spc-info-area px-3">
                        <div className="cpl-spc-mh-area">
                            <img
                                className="cpl-spc-memberhead"
                                src={`${STATIC_SHAREWALL_AVA}${memberhead}.png`}
                                alt=""
                            />
                        </div>
                        <div className="cpl-spc-info-abstract d-flex justify-content-between align-items-center">
                            <div className="cpl-spc-ib-inner-left">
                                {/* ASK: 會員帳號最大長度為? */}
                                {/* DONE: 確定為 12 字元 */}
                                <p>{account}</p>
                            </div>
                            <div className="cpl-spc-ib-inner-right d-flex align-items-center">
                                <div>
                                    <p>{likes > 999 ? '999+' : likes}</p>
                                </div>
                                {/* TODO: onClick 寫入收藏表 */}
                                {/* TODO: 根據是否收藏顯示實空心 */}
                                <AiOutlineHeart
                                    className="cpl-spc-heart-icon"
                                    onClick={() => {
                                        if (!authorized) {
                                            alert('請先登入');
                                        } else {
                                            // FIXME: 完善此功能
                                            alert('施工中');
                                        }
                                    }}
                                />
                                {/* <AiFillHeart className="cpl-spc-heart-icon" /> */}
                            </div>
                        </div>
                    </div>
                    <div className="container cpl-spc-info-content">
                        <p className="cpl-apc-ic-title">{title}</p>
                        <p className="cpl-apc-ic-text">
                            {text.length >= 15
                                ? `${text.slice(0, 15)}...`
                                : text}
                        </p>
                        {/* DONE: onClick 去看文章詳細路由 */}
                        <div className="cpl-apc-ic-more d-flex justify-content-end">
                            <p
                                onClick={(e) => {
                                    // FIXME: 手機版可以直接變長閱讀 桌面版就跳轉吧
                                    // FIXME: 先都直接跳轉
                                    // console.log(postsid);
                                    // if (window.innerWidth >= 992) {
                                    navigate(`${postsid}`);
                                    // }
                                }}
                            >
                                查看更多...
                            </p>
                        </div>
                    </div>
                    <div className="cpl-spc-shadow" />
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default SharePostCard;
