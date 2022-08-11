// TODO: 我知道大專用不上 但請記得行動版沒有 click 事件而是 touch 事件

// TODO: 條狀與全頁轉換
// DONE: 二路完成
// FIXME: 設計上的問題 行動版捲動時會與 LOGO 部分重疊 不好看
// DONE: 修復 加上底色即可
// FIXME: 全頁跳出後 Nav 底色在寬度不足時會暴露
// DONE: 完全修復
// TODO: 滑動 Navbar 消失可以視情況套用

// import axios from 'axios';

// 使用套件
import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; //sweetalert2

import ThemeContext, { themes } from '../context/ThemeContext/ThemeContext';

import { ReactComponent as NavLogo } from '../images/Nav/nav_logo.svg';
import { ReactComponent as NavSoul } from '../images/Nav/nav_soul.svg';
// import { ReactComponent as Soul } from '../images/Nav/soul.svg';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';

// Redux(活動購物車數字)
import { useSelector, useDispatch } from 'react-redux';

// 會員登入登出驗證
import AuthContext from '../context/AuthContext/AuthContext';
import { eventCartNum } from '../features/counter/counterSlice';

// 拿資料庫會員的陰德值
import { PLACE_CARTDATA_API } from '../config/ajax-path';
import { IoLogoClosedCaptioning } from 'react-icons/io5';

function Nav(props) {
    const { lightBox, setLightBox, userGooddeed, setUserGooddeed } = props; //從App.jsx傳入
    // const [lightBox, setLightBox] = useState('nav_lightbox_hidden'); //光箱預設是隱藏

    const { theme, setTheme } = useContext(ThemeContext);
    const navigate = useNavigate(); //跳轉頁面用
    const location = useLocation();

    // console.log(location.pathname);

    // -------------此段處理Redux活動購物車數字-------------------------

    // let event_cart_num = localStorage.getItem('event_cart_num'); //當購物車
    const dispatch = useDispatch();

    // Redux(活動購物車數字)
    const count = useSelector((state) => state.counter.value);
    // 會員登入登出驗證(auth)
    const { authorized, sid, account, isDead, token, userLogout } =
        useContext(AuthContext);

    useEffect(() => {
        const fetchEventCartNum = async () => {
            const r = await fetch(
                `http://localhost:3500/events/eventcartnum/${sid}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type':
                            'application/x-www-form-urlencoded;charset=UTF-8',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await r.json();
            //把初始購物車數量先存在localStorage
            // localStorage.setItem('event_cart_num',result);
            //強制Redux的dispatch方法為promise，否則會報錯
            dispatch(eventCartNum(result));
            return;
        };
        fetchEventCartNum();
    }, [sid]);

    const getUserGooddeedData = async () => {
        const r = await fetch(`${PLACE_CARTDATA_API}/${sid}`);
        const output = await r.json();
        const newGooddeed = output.goodDeed;
        setUserGooddeed({
            ...userGooddeed,
            show: false,
            gooddeed: newGooddeed,
        });
    };

    useEffect(() => {
        if (authorized === true) {
            getUserGooddeedData();
        } else {
            console.log('沒有登入無法顯示陰德值');
        }
    }, [sid]);

    useEffect(() => {
        if (location.pathname === '/intro') {
            const bodyDOM = document.querySelector('body');
            bodyDOM.classList.add('isIntro');
        } else {
            const bodyDOM = document.querySelector('body');
            if (bodyDOM.classList.contains('isIntro')) {
                bodyDOM.classList.remove('isIntro');
            }
        }
    }, []);

    // -------------------------------------------
    // FIXME: 我先簡單的讓首頁的 nav 消失方便二路施工
    // FIXME: 之後要做成條件渲染 首頁的 Nav 是小框框

    return (
        <>
            {/* Nav漢堡光箱 (網站目錄) */}
            <div className={lightBox}>
                <div className="nav_lightbox_wrap">
                    <div className="nav_lightbox_list">
                        <h2
                            className="nav_link"
                            onClick={() => {
                                navigate('/aboutusfirst', { replace: true });
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
                                navigate('/news', { replace: true });
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
                                navigate('/showcase', { replace: true });
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
                        <h4 className="subtitle">
                            何時何地，轉世降生~由你自己來決定！
                        </h4>
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
                    {/* <div className="nav_lightbox_list"> */}
                    {authorized ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-outline-secondary nav-btn"
                                onClick={() => {
                                    setLightBox('nav_lightbox_hidden');
                                    userLogout();
                                }}
                            >
                                登出
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-outline-secondary nav-btn"
                            onClick={() => {
                                navigate('/login', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            登入
                        </button>
                    )}
                    {/* </div> */}
                </div>
            </div>

            {location.pathname !== '/' && location.pathname !== '/intro' ? (
                <div
                    // p-0 (如果 container 左右比較寬的話是 padding)
                    // TODO: useContext Theme.Provider
                    // DONE: 已經會根據 theme 套用 className
                    className={`nav ${
                        theme.title === 'light' ? 'nav-light' : 'nav-dark'
                    } container-fluid`}
                    style={{
                        backgroundColor:
                            lightBox === 'nav_lightbox_visible'
                                ? 'transparent'
                                : '',
                    }}
                >
                    <div className="nav-inner container d-flex justify-content-between align-items-center">
                        <div className="nav-inner-left">
                            <NavLogo
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    navigate('', { replace: true });
                                    setLightBox('nav_lightbox_hidden');
                                }}
                            />
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
                                    // DONE: 存進去 localStorage
                                    // FIXME: 如果要記憶會員 要跟資料庫連線
                                    // 而且這個資料庫的檔案順位要高於 localStorage
                                    if (location.pathname === '/nextlife') {
                                        // console.log('不可以換');
                                        return;
                                    }
                                    localStorage.setItem('theme', 'dark');
                                    setTheme(themes.dark);
                                } else {
                                    localStorage.setItem('theme', 'light');
                                    setTheme(themes.light);
                                }
                                // console.log('theme after :', theme);
                            }}
                        >
                            我換！
                        </div>
                        {/* FIXME: 這是暫時的按鈕 */}
                        <div
                            style={{
                                outline: '1px solid red',
                                cursor: 'pointer',
                                color: theme.bcAvatarFrame,
                            }}
                            onClick={() => {
                                navigate('/nextlife', { replace: true });
                                setLightBox('nav_lightbox_hidden');
                            }}
                        >
                            我要投胎
                        </div>
                        <div className="nav-inner-right">
                            {/* <NavSoul className="nir-NavSoul" /> */}
                            <span
                                className={
                                    userGooddeed.show
                                        ? 'nir-NavSoul soul-gooddeed-box show-gooddeed'
                                        : 'nir-NavSoul soul-gooddeed-box'
                                }
                                onClick={() => {
                                    if (!authorized) {
                                        // TODO: 登入提示: 登入才可以查看陰德值哦
                                        return;
                                    } else if (userGooddeed.show) {
                                        setUserGooddeed({
                                            ...userGooddeed,
                                            show: false,
                                        });
                                    } else {
                                        setUserGooddeed({
                                            ...userGooddeed,
                                            show: true,
                                        });
                                    }
                                }}
                            >
                                <NavSoul />
                                <p
                                    className={
                                        userGooddeed.show
                                            ? 'gooddeed-text show'
                                            : 'gooddeed-text'
                                    }
                                >
                                    {userGooddeed.gooddeed}
                                </p>
                            </span>

                            <span className="nir-FaShoppingCart">
                                {authorized ? (
                                    !isDead ? (
                                        <FaShoppingCart
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                navigate('/ordersteps', {
                                                    replace: true,
                                                });
                                                setLightBox(
                                                    'nav_lightbox_hidden'
                                                );
                                            }}
                                        />
                                    ) : (
                                        <FaShoppingCart
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                navigate('/reborn-cart', {
                                                    replace: true,
                                                });
                                                setLightBox(
                                                    'nav_lightbox_hidden'
                                                );
                                            }}
                                        />
                                    )
                                ) : (
                                    <FaShoppingCart
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            Swal.fire('請先登入會員');
                                            navigate('/login', {
                                                replace: true,
                                            });
                                            setLightBox('nav_lightbox_hidden');
                                        }}
                                    />
                                )}

                                {isDead && count === 0 ? (
                                    ''
                                ) : (
                                    <span className="nav-xuan-event-cartnum xuan-notion">
                                        {count}
                                    </span>
                                )}
                            </span>

                            {authorized ? (
                                <BsFillPersonFill
                                    className="nir-BsFillPersonFill"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigate('/memberprofile', {
                                            replace: true,
                                        });
                                        setLightBox('nav_lightbox_hidden');
                                    }}
                                />
                            ) : (
                                <BsFillPersonFill
                                    className="nir-BsFillPersonFill"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        Swal.fire('請先登入會員');
                                        navigate('/login', { replace: true });
                                        setLightBox('nav_lightbox_hidden');
                                    }}
                                />
                            )}

                            <FaBars
                                className="nir-FaBars"
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    if (lightBox === 'nav_lightbox_hidden') {
                                        setLightBox('nav_lightbox_visible');
                                    } else {
                                        setLightBox('nav_lightbox_hidden');
                                    }
                                }}
                            />
                        </div>
                        {/* <Soul /> */}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Nav;
