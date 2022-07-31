// TODO: 條狀與全頁轉換
// FIXME: 設計上的問題 行動版捲動時會與 LOGO 部分重疊 不好看
// DONE: 修復 加上底色即可
// FIXME: 全頁跳出後 Nav 底色在寬度不足時會暴露
// DONE: 不完全修復 因為底色要跟著 ThemeContext 更動

// 使用套件
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import ThemeContext, { themes } from '../context/ThemeContext/ThemeContext';

import { ReactComponent as NavLogo } from '../images/Nav/nav_logo.svg';
import { ReactComponent as NavSoul } from '../images/Nav/nav_soul.svg';
// import { ReactComponent as Soul } from '../images/Nav/soul.svg';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

function Nav() {
    const [lightBox, setLightBox] = useState('nav_lightbox_hidden'); //光箱預設是隱藏

    const { theme, setTheme } = useContext(ThemeContext);
    const navigate = useNavigate(); //跳轉頁面用

    return (
        <>
            {/* Nav漢堡光箱 (網站目錄) */}
            <div className={lightBox}>
                <div className="nav_lightbox_wrap">
                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            投放所介紹
                        </h2>
                        <h4 className="subtitle">
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
                        <h4 className="subtitle">最新最即時的投胎資訊都在這</h4>
                    </div>

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('/events', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            {/* FIXME: 德 缺字 */}
                            功德撲滿
                        </h2>
                        <h4 className="subtitle">介紹文字放這邊</h4>
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
                        <h4 className="subtitle">介紹文字放這邊</h4>
                    </div>

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('/Place', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            良辰吉地
                        </h2>
                        <h4 className="subtitle">介紹文字放這邊</h4>
                    </div>

                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('/sharewall', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            交流分享
                        </h2>
                        <h4 className="subtitle">介紹文字放這邊</h4>
                    </div>
                </div>
            </div>

            <div
                // p-0 (如果 container 左右比較寬的話是 padding)
                // TODO: useContext Theme.Provider
                className={`nav container-fluid`}
                // FIXME: 等 ThemeContext 有雛型後要改底色為亮暗色
                style={{
                    backgroundColor:
                        lightBox === 'nav_lightbox_visible'
                            ? 'transparent'
                            : '',
                }}
            >
                <div className="nav-inner container d-flex justify-content-between align-items-center">
                    <div className="nav-inner-left">
                        <Link
                            to=""
                            style={{
                                cursor:
                                    lightBox === 'nav_lightbox_visible'
                                        ? 'default'
                                        : 'pointer',
                            }}
                            onClick={(e) => {
                                if (lightBox === 'nav_lightbox_visible') {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <NavLogo />
                        </Link>
                    </div>
                    {/* FIXME: 這是暫時的按鈕 */}
                    <div
                        style={{
                            outline: '1px solid red',
                            cursor: 'pointer',
                            color: theme.bcAvatarFrame,
                        }}
                        onClick={() => {
                            // 注意 setState() 會最後做 所以會印出一樣的 theme
                            // console.log('theme before :', theme);
                            if (theme.title === 'light') {
                                setTheme(themes.dark);
                            } else if (theme.title === 'dark') {
                                setTheme(themes.light);
                            }
                            // console.log('theme after :', theme);
                        }}
                    >
                        我換！
                    </div>
                    <div className="nav-inner-right">
                        <NavSoul />
                        {/* FIXME: 為了 RWD 字體大小不能寫在這裡 */}
                        <FaShoppingCart
                            style={{
                                cursor:
                                    lightBox === 'nav_lightbox_visible'
                                        ? 'default'
                                        : 'pointer',
                            }}
                            onClick={() => {
                                navigate('/ordersteps', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        />
                        <Link
                            to="login"
                            style={{
                                color: 'inherit',
                                fontSize: '2rem',
                                verticalAlign: 'baseline',
                                cursor:
                                    lightBox === 'nav_lightbox_visible'
                                        ? 'default'
                                        : 'pointer',
                            }}
                            onClick={(e) => {
                                if (lightBox === 'nav_lightbox_visible') {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <BsFillPersonFill />
                        </Link>

                        <FaBars
                            onClick={() => {
                                if (lightBox === 'nav_lightbox_hidden') {
                                    setLightBox('nav_lightbox_visible');
                                } else if (
                                    lightBox === 'nav_lightbox_visible'
                                ) {
                                    setLightBox('nav_lightbox_hidden');
                                }
                            }}
                            style={{
                                cursor: 'pointer',
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
