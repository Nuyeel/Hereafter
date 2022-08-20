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
import new_time_map from './imgs/new_time_map.svg';
import back_to_center from './imgs/back_to_center.svg';
import aboutus from './imgs/aboutus-star.svg';
import mainpage_test from './imgs/mainpage_test.svg';
import linkarrow from './imgs/linkarrow.svg';

// 格子素材用圖片
import avatar01 from './imgs/avatar01.svg';
import avatar02 from './imgs/avatar02.svg';
import avatar03 from './imgs/avatar03.svg';
import member_center from './imgs/member_center.svg';
import myavatar from './imgs/myavatar.svg';
import boxnews from './imgs/boxnews.svg';
import boxevent from './imgs/boxevent.svg';
import aboutusmap from './imgs/aboutusmap.svg';
import member_center_list from './imgs/member_center_list.svg';
import waiter01 from './imgs/waiter01.svg';
import waiter02 from './imgs/waiter02.svg';
import waiter03 from './imgs/waiter03.svg';
import waiter04 from './imgs/waiter04.svg';
import waiter05 from './imgs/waiter05.svg';
import mainpage_side_logo from './imgs/mainpage_side_logo.svg';
import rebornstep1 from './imgs/reborn_step1.svg';
import rebornsteps from './imgs/reborn_steps.svg';
import avatarbox from './imgs/avatarbox.svg';
import gooddeed from './imgs/gooddeedtest.svg';
import goodsoul from './imgs/gooddeedsoul.svg';
import boxshare from './imgs/boxshare.svg';
import aboutword1 from './imgs/aboutword1.svg';
import aboutword2 from './imgs/aboutword2.svg';
import aboutword3 from './imgs/aboutword3.svg';
import event01 from './imgs/event01.svg';
import eventcart from './imgs/event-cart-logo.svg';
import game01 from './imgs/game01.svg';
import game02 from './imgs/game02.svg';

// 這邊處理背景不足的素材裝飾
import decorate_left from './imgs/decorate-left.svg';
import decorate_left_2 from './imgs/decorate-left-2.svg';
import decorate_left_middle from './imgs/de-left-middle.svg';
import bg_top_left from './imgs/bg-top-left.svg';
import bg_top from './imgs/bg-top.svg';
import bg_top_right from './imgs/bg-top-right.svg';
import bg_right_middle from './imgs/bg-right-middle.svg';

// react icon
import { TbPig } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';

function MainPage(props) {
    // 原有MainPage code保留---------------------------
    const { pageName, setLightBox, mainpageIcon, setMainpageIcon } = props;
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid, account, token, isDead } = useContext(AuthContext);
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

    // let mainpageChoose = localStorage.getItem('mainpagechoose');

    // useEffect(() => {
    //     if (!mainpageChoose) {
    //         liveOrDeath();
    //     }
    // }, []);

    // const liveOrDeath = function () {
    //     localStorage.setItem('mainpagechoose', 'yes');
    //     Swal.fire({
    //         title: '歡迎光臨來生投放所',
    //         text: '左轉右轉都是人生',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: '我還活著',
    //         cancelButtonText: '我掛掉了',
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire('恭喜你', '還有轉圜的機會', 'success');
    //         } else {
    //             Swal.fire('哈囉', '讓我們迎接更美好的來生', 'death');
    //         }
    //     });
    // };

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
                            navigate('/');
                        }}
                    >
                        <img src={mainpage_center_logo} alt="" />
                    </div>
                    {/* 背景裝飾圖(中心) */}
                    <div className="xuan-mainpage-bg">
                        <img src={mainpage_test} alt="" />
                    </div>

                    {/* ----其他方塊----- */}
                    {/* 轉生形象訂製 */}
                    <div className="xuan-box xuan-box-avatar">
                        <div className="d-flex">
                            <p>轉生形象訂製</p>
                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    navigate('/showcase');
                                }}
                            />
                        </div>

                        <div>
                            <img src={avatar_star} alt="" />
                        </div>

                        {/* TODO: 放轉生形象圖 */}
                        <div>
                            <img src={avatarbox} alt="" />
                            {/* <img src={myavatar} alt="" /> */}
                        </div>
                    </div>

                    {/* 會員中心 */}
                    <div className="xuan-box xuan-box-member">
                        <div>
                            <img src={member_star} alt="" />
                            <p>會員中心</p>

                            {/* FIXME: 為什麼會員中心不能直接連？ */}
                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    if (authorized) {
                                        navigate('/memberprofile');
                                    } else {
                                        Swal.fire('請先登入會員');
                                        navigate('/login');
                                    }
                                }}
                            />
                        </div>

                        {/* TODO: 放會員相關圖片 */}
                        <div>
                            <img src={member_center} alt="" />
                        </div>
                    </div>
                    {/* 會員中心旁邊對話框XD */}
                    <div className="xuan-member-list">
                        <img src={member_center_list} alt="" />
                    </div>
                    {/* 投胎去！ */}
                    <div
                        className={`xuan-box xuan-go-future ${
                            !isDead ? 'isDisabled' : ''
                        }`}
                        onClick={() => {
                            if (isDead) {
                                navigate('/nextlife');
                            }
                        }}
                    >
                        <img src={go_future} alt="" />
                    </div>
                    {/* 良辰吉地 */}
                    <div className="xuan-box xuan-time">
                        <div>
                            <div className="d-flex">
                                <p className="xuan-title">良辰吉地</p>
                                <img
                                    src={linkarrow}
                                    alt=""
                                    className="link-arrow"
                                    onClick={() => {
                                        navigate('/Place');
                                    }}
                                />
                            </div>
                            <img src={time_decorate} alt="" />
                        </div>

                        <div>
                            {/* 原本的圖 */}
                            {/* <img src={time_map} alt="" /> */}
                            <img src={new_time_map} alt="" />
                        </div>
                    </div>
                    {/* 功德撲滿 */}
                    <div
                        className={`xuan-box xuan-box-event ${
                            isDead ? 'isDisabled' : ''
                        }`}
                    >
                        <div className="d-flex">
                            <TbPig />
                            <p>功德撲滿</p>

                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    if (!isDead) {
                                        navigate('/events');
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <img src={boxevent} alt="" />
                        </div>
                    </div>
                    {/* 功德撲滿下方LOGO */}
                    <div className=" xuan-side-logo">
                        <img src={mainpage_side_logo} alt="" />
                    </div>
                    {/* 投生形象小格1 */}
                    <div className="xuan-box xuan-box-avatar-show1">
                        {/* 左邊白色框 */}
                        <div>
                            <img src={avatar01} alt="" />
                        </div>

                        {/* 右側文字框 */}
                        <div className="xuan-caption">
                            <p className="xuan-subtitle">投生形象001</p>
                            <p>眼睛x2 精靈耳x2</p>
                            <p>膚色：粉 其他：章魚腳</p>
                            <p>總計：4500</p>
                        </div>

                        <AiOutlineHeart />
                    </div>
                    {/* 投生形象小格2 */}
                    <div className="xuan-box xuan-box-avatar-show2">
                        {/* 左邊白色框 */}
                        <div>
                            <img src={avatar02} alt="" />
                        </div>

                        {/* 右側文字框 */}
                        <div className="xuan-caption">
                            <p className="xuan-subtitle">投生形象002</p>
                            <p>眼睛x2 獸角x2</p>
                            <p>膚色:黃 </p>
                            <p>總計：1000</p>
                        </div>

                        <AiOutlineHeart />
                    </div>
                    {/* 投生形象小格3 */}
                    <div className="xuan-box xuan-box-avatar-show3">
                        {/* 左邊白色框 */}
                        <div>
                            <img src={avatar03} alt="" />
                        </div>

                        {/* 右側文字框 */}
                        <div className="xuan-caption">
                            <p className="xuan-subtitle">投生形象003</p>
                            <p>眼睛x2 獸角x2</p>
                            <p>膚色：綠 其他：貓掌</p>
                            <p>總計：2500</p>
                        </div>

                        <AiOutlineHeart />
                    </div>
                    {/* 遊戲小格1 */}
                    <div className="xuan-box xuan-box-game-show1">
                        {/* 小格標題 */}
                        {/* <p className="xuan-subtitle">Game.01</p> */}

                        <div>
                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    navigate('/gooddeed');
                                }}
                            />
                        </div>

                        <div className="d-flex">
                            <img src={goodsoul} alt="" />
                            <p className="xuan-subtitle">陰德值小測驗</p>
                        </div>

                        {/* 底下圖片區域 */}
                        <div>
                            <img src={gooddeed} alt="" />
                        </div>
                    </div>
                    {/* 遊戲小格2 */}
                    <div
                        className={`xuan-box xuan-box-game-show2 ${
                            !isDead ? 'isDisabled' : ''
                        }`}
                    >
                        <div className="d-flex">
                            {/* 小格標題 */}
                            <p className="xuan-subtitle">行善積德小遊戲</p>

                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    if (isDead) {
                                        navigate('/games');
                                    }
                                }}
                            />
                        </div>

                        {/* 底下圖片區域 */}
                        <div className="xuan-game-img">
                            <img src={game01} alt="" />
                            <img src={game02} alt="" />
                        </div>
                    </div>
                    {/* 關於我們 */}
                    <div className="xuan-box xuan-box-aboutus">
                        <div>
                            <img src={aboutus} alt="" />
                            <p className="xuan-title">關於</p>
                            <p className="xuan-title">我們</p>
                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    navigate('/aboutusfirst');
                                }}
                            />
                        </div>

                        <div>
                            <img src={aboutusmap} alt="" />
                        </div>
                    </div>
                    {/* 最新消息 */}
                    <div className="xuan-box xuan-box-news">
                        {/* 小標區域 */}
                        <div>
                            <img src={aboutus} alt="" />
                            <p className="xuan-title">最新消息</p>
                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    navigate('/news');
                                }}
                            />
                        </div>

                        {/* 底下圖片區域 */}
                        <div>
                            <img src={boxnews} alt="" />
                        </div>
                    </div>
                    {/* 投放所服務員1 */}
                    <div className="xuan-box-waiter-1">
                        <img src={waiter01} alt="" />
                        {/* <p className="xuan-subtitle">投放所服務員</p> */}
                    </div>
                    {/* /aboutussecond */}
                    <div
                        className="xuan-box-waiter-1-word"
                        onClick={() => {
                            navigate('/aboutussecond ');
                        }}
                    >
                        <img src={aboutword1} alt="" />
                    </div>
                    {/* 投放所服務員2 */}
                    <div className="xuan-box-waiter-2">
                        <img src={waiter02} alt="" />
                    </div>
                    <div
                        className="xuan-box-waiter-2-word"
                        onClick={() => {
                            navigate('/aboutussecond ');
                        }}
                    >
                        <img src={aboutword2} alt="" />
                    </div>
                    {/* 投放所服務員3 */}
                    <div className="xuan-box-waiter-3">
                        <img src={waiter03} alt="" />
                    </div>
                    <div
                        className="xuan-box-waiter-3-word"
                        onClick={() => {
                            navigate('/aboutussecond ');
                        }}
                    >
                        <img src={aboutword3} alt="" />
                    </div>
                    {/* 轉生三步驟 */}
                    <div className="xuan-reborn-step">
                        <img src={rebornsteps} alt="" />
                    </div>
                    {/* 交流分享 */}
                    <div className="xuan-box xuan-box-share d-flex">
                        <div>
                            <img src={boxshare} alt="" />
                        </div>

                        <div>
                            <p className="xuan-subtitle">交流</p>
                            <p className="xuan-subtitle">分享</p>
                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    navigate('/sharewall');
                                }}
                            />
                        </div>
                    </div>
                    {/* 活動小格01 */}
                    <div
                        className={`xuan-box xuan-event01 ${
                            isDead ? 'isDisabled' : ''
                        }`}
                    >
                        <div>
                            <div className="d-flex">
                                <p className="xuan-title">立即報名</p>
                                <img
                                    src={linkarrow}
                                    alt=""
                                    className="link-arrow"
                                    onClick={() => {
                                        if (!isDead) {
                                            navigate('/sharewall');
                                        }
                                    }}
                                />
                            </div>
                            <img src={event01} alt="" />
                        </div>
                    </div>
                    <div
                        className={`xuan-box xuan-box-cart ${
                            isDead ? 'isDisabled' : ''
                        }`}
                    >
                        <div className="d-flex">
                            <p className="xuan-title">活動購物車</p>
                            <img
                                src={linkarrow}
                                alt=""
                                className="link-arrow"
                                onClick={() => {
                                    if (!isDead) {
                                        navigate('/ordersteps');
                                    }
                                }}
                            />
                        </div>

                        <img
                            src={eventcart}
                            alt=""
                            className="xuan-event-cart-logo"
                        />
                    </div>
                    {/* ------- 左上區域 BOX ------- */}
                    <div className="xuan-box xuan-lefttop-1"></div>
                    {/* 背景不足的素材部分 */}
                    {/* 左下-最左邊 */}
                    <div className="de-left">
                        <img src={decorate_left} alt="" />
                    </div>
                    {/* 左下-倒數第二個 */}
                    <div className="de-left-2">
                        <img src={decorate_left_2} alt="" />
                    </div>
                    {/* 左下-中間 */}
                    <div className="de-left-middle">
                        <img src={decorate_left_middle} alt="" />
                    </div>
                    {/* 左-中間 */}
                    <div className="bg_top_left">
                        <img src={bg_top_left} alt="" />
                    </div>
                    <div className="bg_top">
                        <img src={bg_top} alt="" />
                    </div>
                    <div className="bg_top_right">
                        <img src={bg_top_right} alt="" />
                    </div>
                    <div className="bg_right_middle">
                        <img src={bg_right_middle} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;
