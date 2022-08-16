import { useContext, useEffect } from 'react';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; //sweetalert2

// scss
import './_mainpage.scss';
import '../Event/_xuan_styles.scss';

// imgs
import mainpagebg from './imgs/mainpage_bg_2.svg';
import mainpagebg_usual from './imgs/mainpage-bg-usual.svg';
import mainpage_nav from './imgs/mainpage_nav.svg';
import mainpage_center_logo from './imgs/mainpage_center_logo.svg';
import avatar_star from './imgs/avatar_star.svg';
import member_star from './imgs/member_star.svg';
import go_future from './imgs/go_future.svg';
import time_decorate from './imgs/time_decorate.svg';
import time_map from './imgs/time_map.svg';
import back_to_center from './imgs/back_to_center.svg';
import aboutus from './imgs/aboutus-star.svg';
import mainpage_test from './imgs/mainpage_test.svg';

// 格子素材用圖片
// import avatar01 from './imgs/avatar01.svg';
// import avatar02 from './imgs/avatar02.svg';
// import avatar03 from './imgs/avatar03.svg';

// 放進box內的圖片
import avartar01 from './imgs/mainpage-avatar01.png';

function MainPage(props) {
    // 原有MainPage code保留---------------------------
    const { pageName, setLightBox, mainpageIcon, setMainpageIcon } = props;
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid, account, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setHeader(headers[pageName]);
        startAtCenter();
    }, []);

    // -----------------------------------------------

    // FIXME: 目前手機板拖拉功能 no work
    // 背景地圖拖拉功能
    let mouseDown = false;
    let startX, scrollLeft;

    // 下面這個自己多加
    let startY, scrollTop;

    // 拖拉 function
    let startDragging = function (e) {
        const slider = document.querySelector('.xuan-parent'); //先觸發function之後再抓DOM
        mouseDown = true;
        console.log(e.pageX);
        startX = e.pageX - slider.offsetLeft;
        // 下面這個多加
        startY = e.pageY - slider.offsetTop;
        scrollLeft = slider.scrollLeft;
        // 下面這個多加
        scrollTop = slider.scrollTop;
    };

    // 停掉function
    let stopDragging = function (event) {
        mouseDown = false;
    };

    let mouseMove = function (e) {
        const slider = document.querySelector('.xuan-parent'); //先觸發function之後再抓DOM
        e.preventDefault();
        if (!mouseDown) {
            return;
        }
        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;

        const y = e.pageY - slider.offsetLeft;
        const scrolly = y - startY;
        slider.scrollTop = scrollTop - scrolly;
    };

    // 回到中心點 function
    let backToCenter = function () {
        const element = document.getElementById('xuan-btn');
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    };

    // 一進頁面就在中心點 function
    const startAtCenter = function () {
        const element = document.getElementById('xuan-btn');
        element.scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'center',
        });
    };

    // 處理生者亡者顏色---------------------------------------------
    // FIXME: 每個帳號登入進到首頁只會問一次

    let mainpageChoose = localStorage.getItem('mainpagechoose');

    useEffect(() => {
        if (!mainpageChoose) {
            liveOrDeath();
        }
    }, []);

    const liveOrDeath = function () {
        localStorage.setItem('mainpagechoose', 'yes');
        Swal.fire({
            title: '歡迎光臨來生投放所',
            text: '左轉右轉都是人生',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '我還活著',
            cancelButtonText: '我掛掉了',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('恭喜你', '還有轉圜的機會', 'success');
            } else {
                Swal.fire('哈囉', '讓我們迎接更美好的來生', 'death');
            }
        });
    };

    return (
        <>
            {/* 固定都是100% 視窗畫面 */}
            <div className="xuan-parent">
                {/* 按了回中心點 */}
                <div
                    className="xuan-btn-center"
                    id="center"
                    style={{ textAlign: 'center' }}
                    onClick={backToCenter}
                >
                    <img src={back_to_center} alt="" />
                    <span className="xuan-subtitle">Back To Center</span>
                </div>

                {/* 按了開啟目錄頁 */}
                <div
                    className="xuan-mainpage-nav"
                    onClick={() => {
                        // alert('開啟目錄');
                        setLightBox('nav_lightbox_visible');
                        setMainpageIcon('mainpage_icon_visible');
                    }}
                >
                    <img src={mainpage_nav} alt="" />
                </div>

                {/* 放主題小方塊 */}
                <div
                    className="xuan-child"
                    onMouseDown={startDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onMouseMove={mouseMove}
                >
                    {/* 中心方塊 */}
                    <div
                        className="xuan-child-center xuan-box"
                        id="xuan-btn"
                        onClick={() => {
                            navigate('#/', {
                                replace: true,
                            });
                        }}
                    >
                        <img src={mainpage_center_logo} alt="" />
                    </div>

                    {/* 背景裝飾圖(中心) */}
                    <div className="xuan-mainpage-bg">
                        <img src={mainpage_test} alt="" />
                    </div>

                    {/* 背景裝飾上半部 */}
                    {/* <div className="bg-d-flex"> */}
                    {/* 背景裝飾圖(左上方) */}
                    {/* <div className="xuan-mainpage-bg-2">
                            <img src={mainpagebg_usual} alt="" />
                        </div> */}

                    {/* 背景裝飾圖(右上方) */}
                    {/* <div className="xuan-mainpage-bg-3">
                            <img src={mainpagebg_usual} alt="" />
                        </div>
                    </div> */}

                    {/* 背景裝飾下半部 */}
                    {/* <div className="bg-bottom-d-flex">
                        {/* 背景裝飾圖(左下方) */}
                    {/* <div className="xuan-mainpage-bg-bottomleft">
                            <img src={mainpagebg_usual} alt="" />
                        </div> */}

                    {/* 背景裝飾圖(右下方) */}
                    {/* <div className="xuan-mainpage-bg-bottomright">
                            <img src={mainpagebg_usual} alt="" />
                        </div>
                    </div>  */}

                    {/* ----其他方塊----- */}

                    {/* 轉生形象訂製 */}
                    <div
                        className="xuan-box xuan-box-avatar"
                        onClick={() => {
                            navigate('/showcase', {
                                replace: true,
                            });
                        }}
                    >
                        <p>轉生形象訂製</p>
                        <div>
                            <img src={avatar_star} alt="" />
                        </div>

                        {/* TODO: 放轉生形象圖 */}
                        <div></div>
                    </div>

                    {/* 會員中心 */}
                    <div
                        className="xuan-box xuan-box-member"
                        onClick={() => {
                            navigate('/login', {
                                replace: true,
                            });
                        }}
                    >
                        <div>
                            <img src={member_star} alt="" />
                            <p>會員中心</p>
                        </div>

                        {/* TODO: 放會員相關圖片 */}
                        <div></div>
                    </div>

                    {/* 投胎去！ */}
                    <div
                        className="xuan-box xuan-go-future"
                        onClick={() => {
                            navigate('/nextlife');
                        }}
                    >
                        <img src={go_future} alt="" />
                    </div>

                    {/* 良辰吉地 */}
                    <div
                        className="xuan-box xuan-time"
                        onClick={() => {
                            navigate('/Place', {
                                replace: true,
                            });
                        }}
                    >
                        <div>
                            <p className="xuan-title">良辰吉地</p>
                            <img src={time_decorate} alt="" />
                        </div>

                        <div>
                            <img src={time_map} alt="" />
                        </div>
                    </div>

                    {/* 功德撲滿 */}
                    <div
                        className="xuan-box xuan-box-event"
                        onClick={() => {
                            navigate('/events', {
                                replace: true,
                            });
                        }}
                    >
                        <p>功德撲滿</p>
                        <div></div>
                    </div>

                    {/* 投生形象小格1 */}
                    <div className="xuan-box xuan-box-avatar-show1">
                        {/* 左邊白色框 */}
                        <div>{/* <img src={avatar01} alt="" /> */}</div>

                        {/* 右側文字框 */}
                        <div className="xuan-caption">
                            <p>投生形象001</p>
                            <p>眼睛x2 精靈耳x2</p>
                            <p>膚色:粉 貓尾</p>
                            <p>總計3400</p>
                        </div>
                    </div>

                    {/* 投生形象小格2 */}
                    <div className="xuan-box xuan-box-avatar-show2">
                        {/* 左邊白色框 */}
                        <div>{/* <img src={avatar02} alt="" /> */}</div>

                        {/* 右側文字框 */}
                        <div className="xuan-caption">
                            <p>投生形象002</p>
                            <p>眼睛x2 精靈耳x2</p>
                            <p>膚色:粉 貓尾</p>
                            <p>總計3400</p>
                        </div>
                    </div>

                    {/* 投生形象小格3 */}
                    <div className="xuan-box xuan-box-avatar-show3">
                        {/* 左邊白色框 */}
                        <div>{/* <img src={avatar03} alt="" /> */}</div>

                        {/* 右側文字框 */}
                        <div className="xuan-caption">
                            <p>投生形象003</p>
                            <p>眼睛x2 精靈耳x2</p>
                            <p>膚色:粉 貓尾</p>
                            <p>總計3400</p>
                        </div>
                    </div>

                    {/* 遊戲小格1 */}
                    <div className="xuan-box xuan-box-game-show1">
                        {/* 小格標題 */}
                        <p className="xuan-subtitle">Game.01</p>

                        {/* 底下圖片區域 */}
                        <div></div>
                    </div>

                    {/* 遊戲小格2 */}
                    <div className="xuan-box xuan-box-game-show2">
                        {/* 小格標題 */}
                        <p className="xuan-subtitle">Game.02</p>

                        {/* 底下圖片區域 */}
                        <div></div>
                    </div>

                    {/* 關於我們 */}
                    <div className="xuan-box xuan-box-aboutus">
                        <img src={aboutus} alt="" />
                        <p className="xuan-title">關於我們</p>
                    </div>

                    {/* 最新消息 */}
                    <div className="xuan-box xuan-box-news">
                        {/* 小標區域 */}
                        <div>
                            <img src={aboutus} alt="" />
                            <p className="xuan-title">最新消息</p>
                        </div>

                        {/* 底下圖片區域 */}
                        <div></div>
                    </div>

                    {/* ------- 左上區域 BOX ------- */}
                    <div className="xuan-box xuan-lefttop-1"></div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
