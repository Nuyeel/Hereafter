// TODO: 條狀與全頁轉換
// FIXME: 設計上的問題 行動版捲動時會與 LOGO 部分重疊 不好看

// 使用套件
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ReactComponent as NavLogo } from '../images/Nav/nav_logo.svg';
import { ReactComponent as NavSoul } from '../images/Nav/nav_soul.svg';
// import { ReactComponent as Soul } from '../images/Nav/soul.svg';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

function Nav() {
    const [lightBox, setLightBox] = useState('nav_lightbox_hidden'); //光箱預設是隱藏
    const navigate = useNavigate(); //跳轉頁面用

    return (
        <>
            {/* Nav漢堡光箱(網站目錄) */}
            <div className={lightBox}>
                <div className="nav_lightbox_wrap">

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('#/', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            投放所介紹
                        </h2>
                        <h4 class="subtitle">
                            搞不清楚發生什麼事？先來看看這裡吧
                        </h4>
                    </div>

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('#/', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            投胎速報
                        </h2>
                        <h4 class="subtitle">最新最即時的投胎資訊都在這</h4>
                    </div>

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('/events', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            功德撲滿
                        </h2>
                        <h4 class="subtitle">介紹文字放這邊</h4>
                    </div>

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('#/', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            來生形象
                        </h2>
                        <h4 class="subtitle">介紹文字放這邊</h4>
                    </div>

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('#/', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            良辰吉地
                        </h2>
                        <h4 class="subtitle">介紹文字放這邊</h4>
                    </div>

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('#/', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            交流分享
                        </h2>
                        <h4 class="subtitle">介紹文字放這邊</h4>
                    </div>
                </div>
            </div>

            <div
                // p-0 (如果 container 左右比較寬的話是 padding)
                // TODO: useContext Theme.Provider
                className={`nav container-fluid`}
            >
                <div className="nav-inner container d-flex justify-content-between align-items-center">
                    <div className="nav-inner-left">
                        <Link to="">
                            <NavLogo />
                        </Link>
                    </div>
                    <div className="nav-inner-right">
                        <NavSoul />
                        <FaShoppingCart />
                        <Link
                            to="login"
                            style={{
                                color: 'inherit',
                                fontSize: '2rem',
                                verticalAlign: 'baseline',
                            }}
                        >
                            <BsFillPersonFill />
                        </Link>

                        <FaBars
                            onClick={() => {
                                setLightBox('nav_lightbox_visible');
                            }}
                        />
                    </div>
                    {/* <Soul /> */}
                </div>
            </div>
        </>
    );
}

export default Nav;
