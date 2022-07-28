import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

import './SharePostCard.scss';

import AuthContext from '../../../../context/AuthContext/AuthContext';

import { SERVER } from '../../../../config/ajax-path';

function SharePostCard(props) {
    const { postsid, avatar, memberhead, account, likes, title, text } = props;

    const { authorized } = useContext(AuthContext);

    const navigate = useNavigate();

    return (
        <div className="cpl-share-post-card flex-shrink-0">
            {/* 來生形象 */}
            <img
                className="cpl-spc-avatar"
                src={`${SERVER}/uploads/images/share/ava${avatar}.png`}
                alt=""
            />
            <div className="cpl-spc-af-round" />
            <div className="cpl-spc-af-square" />
            {/* 會員頭貼 */}
            <div className="cpl-spc-info-area px-3">
                <div className="cpl-spc-mh-area">
                    <img
                        className="cpl-spc-memberhead"
                        src={`${SERVER}/uploads/images/share/ava${memberhead}.png`}
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
                    {text.length >= 15 ? `${text.slice(0, 15)}...` : text}
                </p>
                {/* DONE: onClick 去看文章詳細路由 */}
                <div className="cpl-apc-ic-more">
                    <p
                        onClick={(e) => {
                            // console.log(postsid);
                            navigate(`${postsid}`);
                        }}
                    >
                        查看更多...
                    </p>
                </div>
            </div>
            <div className="cpl-spc-shadow" />
        </div>
    );
}

export default SharePostCard;
