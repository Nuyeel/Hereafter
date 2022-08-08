// 至寧醬: 去的時候不要 replace 回來用 navigate(-1)

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Swal from 'sweetalert2';
import OutlineSoul from '../../../../images/sweetalert2/outline_soul.svg';
import OutlineSoulAlert from '../../../../images/sweetalert2/outline_soul_alert.svg';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

import './SharePostCard.scss';

import ThemeContext from '../../../../context/ThemeContext/ThemeContext';
import AuthContext from '../../../../context/AuthContext/AuthContext';

import {
    API_SHAREWALL,
    STATIC_SHAREWALL_AVA,
} from '../../../../config/ajax-path';
import HeaderContext from '../../../../context/HeaderContext/HeaderContext';

function SharePostCard(props) {
    const {
        postsid,
        avatar,
        memberhead,
        account,
        likes,
        title,
        text,
        isliked,
        axiosPOST,
        postsPage,
    } = props;

    const { theme } = useContext(ThemeContext);
    const { setShareWallPostsData } = useContext(HeaderContext);
    const { authorized, token } = useContext(AuthContext);

    const navigate = useNavigate();

    const axiosSharePostLikeGET = async (postSid) => {
        const result = await axios.get(`${API_SHAREWALL}/${postSid}/like`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result.data);

        if (result.data.affectedRows === 1) {
            // ASK: 已經按讚 需要動畫 但又要 setState() 該怎麼做？
            axiosPOST(postsPage);
        }

        return;
    };

    const axiosSharePostDislikeGET = async (postSid) => {
        const result = await axios.get(`${API_SHAREWALL}/${postSid}/dislike`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result.data);

        if (result.data.affectedRows === 1) {
            // ASK: 已經按讚 需要動畫 但又要 setState() 該怎麼做？
            axiosPOST(postsPage);
        }

        return;
    };

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
                    {/* FIXME: 資料要從後端過來 網址不對 */}
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
                                {/* DONE: 確定為 6 - 10 字元 */}
                                <p>{account}</p>
                            </div>
                            <div className="cpl-spc-ib-inner-right d-flex align-items-center">
                                <div>
                                    <p>{likes > 999 ? '999+' : likes}</p>
                                </div>
                                {/* TODO: onClick 寫入收藏表 */}
                                {/* TODO: 根據是否收藏顯示實空心 */}
                                {isliked ? (
                                    <AiFillHeart
                                        className="cpl-spc-heart-icon isLiked"
                                        onClick={() => {
                                            // 安全上檔一下
                                            if (!authorized) {
                                                Swal.fire({
                                                    title: '請先登入',
                                                    imageUrl: OutlineSoulAlert,
                                                    imageHeight: 50,
                                                    imageWidth: 50,
                                                    showConfirmButton: false,
                                                });
                                            } else {
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
                                                    denyButtonText: '還是很愛',
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        axiosSharePostDislikeGET(
                                                            postsid
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
                                            }
                                        }}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        className="cpl-spc-heart-icon"
                                        onClick={() => {
                                            if (!authorized) {
                                                Swal.fire({
                                                    title: '請先登入',
                                                    imageUrl: OutlineSoulAlert,
                                                    imageHeight: 50,
                                                    imageWidth: 50,
                                                    showConfirmButton: false,
                                                });
                                            } else {
                                                Swal.fire({
                                                    title: '這個形象...真的很讚！',
                                                    imageUrl: OutlineSoul,
                                                    imageHeight: 50,
                                                    imageWidth: 50,
                                                    showConfirmButton: false,
                                                }).then(() => {
                                                    axiosSharePostLikeGET(
                                                        postsid
                                                    );
                                                });
                                            }
                                        }}
                                    />
                                )}
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
