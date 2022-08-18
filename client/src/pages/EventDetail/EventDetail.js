import React, { useState, useEffect, useContext, Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; //sweetalert2

// react carousel
import ReactDOM from 'react-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../features/counter/counterSlice';

// 會員登入登出驗證
import AuthContext from '../../context/AuthContext/AuthContext';

// react icons
import { BiTimeFive } from 'react-icons/bi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { MdOutlineEmojiPeople } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { TiLocationArrowOutline } from 'react-icons/ti';
import { IoHeartSharp } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { AiFillShopping } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';

// scss
import './_new_eventdetail.scss';
import soul from './imgs/soul.svg';

// SimpleBar
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const EventDetail = () => {
    // Redux
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    // 會員登入登出驗證(auth)
    const { authorized, sid, account, token } = useContext(AuthContext);

    const [eventDetail, setEventDetail] = useState([]);

    // 限定活動商品只能加入一次
    const [cartBtn, setCartBtn] = useState(false);
    const [cartBtnWord, setCartBtnWord] = useState('加入購物車');
    const [cartBuyWord, setCartBuyWord] = useState('直接結帳');

    const navigate = useNavigate();
    let { eventSid } = useParams(); //取得是哪個活動sid後發fetch //要跟Router列表名稱對應

    // 一進頁面就跟MySQL拿活動資料(先透過useParams取得活動sid)
    const fetchEventDetail = async () => {
        const response = await axios.get(
            // TODO:修成 ajax-path
            `http://localhost:3500/events/${eventSid}`
        );
        setEventDetail(response.data);
    };

    // 一進頁面就跟MySQL確認此項商品是否已加入購物車
    const fetchCheckEvent = async () => {
        const response = await axios.get(
            `http://localhost:3500/events/checkeventcart/${sid}`
        );
        console.log(typeof response.data);
        console.log(response.data); //會獲得一個array

        let output = [];
        let r = response.data;

        r.map((v, i) => {
            output.push(r[i].event_sid); //分別取得24.30
            console.log(output); //[取得24.30]
        });

        if (output.includes(+eventSid)) {
            setCartBtnWord('已加入');
            setCartBuyWord('前往結帳');
            setCartBtn(true);
        } else {
            setCartBtnWord('加入購物車');
            setCartBuyWord('直接結帳');
        }
    };

    // 避免無窮迴圈(DidMount)
    useEffect(() => {
        fetchEventDetail();
        fetchCheckEvent();
        fetchEventComment();
    }, []);

    // 按下「加入購物車」將資料存進MySQL //因為axios方式不熟 先用fetch方式POST
    const fetchEventAddCart = async () => {
        // TODO:修成 ajax-path
        fetch('http://localhost:3500/eventcarts/addcart', {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: `event_sid=${eventSid}&member_sid=${sid}`,
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj);
            });
    };

    const [ecomment, setEcomment] = useState([]);

    // 一進頁面就跟MySQL取得評論資訊
    const fetchEventComment = async () => {
        fetch('http://localhost:3500/events/eventcomment', {
            method: 'POST',
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log('obj', obj);
                setEcomment(obj);
            });
    };

    return (
        <>
            <div className="xuan-eventdetail-container">
                <div className="row">
                    {/* 左方活動內容 */}

                    <div className="xuan-col-8">
                        {eventDetail.map((v, i) => {
                            return (
                                <>
                                    <div className="xuan-intro-box" key={v.sid}>
                                        <div className="xuan-intro-box-title">
                                            <span className=" xuan-h4">
                                                {v.act_title}
                                            </span>
                                        </div>

                                        <div className="xuan-intro-img">
                                            <Carousel>
                                                <div>
                                                    <img
                                                        src={
                                                            'http://localhost:3500/event/eventlist/' +
                                                            v.img
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <img
                                                        src={
                                                            'http://localhost:3500/event/eventlist/' +
                                                            v.img
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <img
                                                        src={
                                                            'http://localhost:3500/event/eventlist/' +
                                                            v.img
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                            </Carousel>
                                        </div>

                                        <SimpleBar className="xuan-intro-bar">
                                            <div>
                                                <div className="xuan-tag-group">
                                                    <div className="xuan-intro-tag-1">
                                                        <MdOutlineLocalOffer />
                                                        {v.program_type}
                                                    </div>
                                                    <div className="xuan-intro-tag-1">
                                                        <MdOutlineLocalOffer />
                                                        {v.name}
                                                    </div>
                                                    <div className="xuan-intro-tag-2">
                                                        <FaStar />
                                                        {/* <FaStar /> */}
                                                        {/* <FaStar /> */}
                                                        <p>{v.comment_star}</p>
                                                    </div>
                                                </div>

                                                <div className="xuan-intro-word  xuan-subtitle">
                                                    <BiTimeFive />
                                                    <span>{v.start}</span>
                                                    <span>{v.start_time}</span>
                                                    <span>～ {v.end}</span>
                                                    <span>{v.end_time}</span>
                                                    {/* FIXME: 來不及完成先註解 */}
                                                    {/* <a
                                                        href="#/"
                                                        className="xuan-body"
                                                    >
                                                        + 加入行事曆
                                                    </a> */}
                                                </div>

                                                <div className="d-flex ">
                                                    <span className=" xuan-intro-word  xuan-subtitle ">
                                                        <HiOutlineLocationMarker />
                                                        {v.city} {v.place_other}
                                                    </span>

                                                    {/* FIXME: 來不及完成先註解 */}
                                                    {/* <a href="#/">
                                                        <TiLocationArrowOutline />
                                                        查看地圖
                                                    </a> */}
                                                </div>

                                                <div className="xuan-mr xuan-intro-word  xuan-subtitle">
                                                    <MdOutlineEmojiPeople />
                                                    招募人數：{v.limit_num} 人
                                                </div>

                                                <span className="xuan-intro-word  xuan-subtitle">
                                                    <IoHeartSharp />
                                                    主辦單位：{v.npo_name}
                                                </span>
                                                <br />
                                                <br />
                                                <br />
                                                <span className="xuan-intro-word  xuan-subtitle xuan-intro-text">
                                                    活動資訊：
                                                    <br />
                                                    {v.intro}
                                                </span>
                                                <br />
                                                <br />
                                                <span className="xuan-intro-word xuan-subtitle xuan-intro-text">
                                                    主辦單位介紹：
                                                    <br />
                                                    <br />
                                                </span>
                                            </div>
                                        </SimpleBar>
                                    </div>
                                </>
                            );
                        })}
                    </div>

                    {/* 右方按鈕+評論 */}
                    {/* FIXME: 這邊col-4先拿掉 */}
                    <div className="xuan-col-4">
                        <div className="xuan-btn-wrap">
                            {/* 參加 group */}
                            <div className="xuan-buy-btn">
                                {eventDetail.map((v, i) => {
                                    return (
                                        <div
                                            className="xuan-cost-price"
                                            key={v.sid}
                                        >
                                            <span className="xuan-subtitle">
                                                {v.program_type === '贊助'
                                                    ? '贊助費用'
                                                    : '報名費用'}
                                            </span>
                                            <h2 className="xuan-h2">
                                                $ {v.price}
                                            </h2>

                                            <span className="xuan-subtitle">
                                                陰德值回饋
                                            </span>

                                            <br />
                                            <br />
                                            <img
                                                src={soul}
                                                alt=""
                                                className="xuan-detail-soul"
                                            />
                                            <span className="xuan-h3">
                                                {v.value}
                                            </span>

                                            {/* <img src={soul} alt="" /> */}
                                        </div>
                                    );
                                })}

                                <div className="xuan-btn-group">
                                    {/* 會員檢查: 沒登入跳通知 */}

                                    {/* 要去fetch資料 看event_cart裡面有沒有這個活動的資料 */}
                                    {/* 有的話: 顯示灰階+disabled；沒有：照常運作 */}

                                    {authorized ? (
                                        <button
                                            // TODO: 每次進來頁面都要核對一次是否已被加進購物車
                                            disabled={cartBtn}
                                            className="xuan-btn-l xuan-btn-pri"
                                            onClick={() => {
                                                fetchEventAddCart();
                                                Swal.fire('商品已加入購物車');
                                                dispatch(increment());
                                                setCartBtn(true);
                                                setCartBtnWord('已加入');
                                                setCartBuyWord('前往結帳');
                                                // 這邊要多加顏色變化(變淡)
                                            }}
                                        >
                                            <FaShoppingCart /> {cartBtnWord}
                                        </button>
                                    ) : (
                                        <button
                                            className="xuan-btn-l xuan-btn-pri"
                                            onClick={() => {
                                                // alert('請先登入會員');
                                                Swal.fire('請先登入會員');
                                                navigate('/login', {
                                                    replace: true,
                                                });
                                            }}
                                        >
                                            <FaShoppingCart /> {cartBtnWord}
                                        </button>
                                    )}

                                    <br />
                                    {/* 有登入會員 直接結帳:數字加1  前往結帳: 數字不要加 */}

                                    {authorized ? (
                                        <button
                                            className="xuan-btn-l xuan-btn-pri"
                                            onClick={() => {
                                                if (
                                                    cartBtnWord === '加入購物車'
                                                ) {
                                                    dispatch(increment());
                                                    fetchEventAddCart();
                                                    Swal.fire(
                                                        '商品已加入購物車'
                                                    );
                                                    setCartBtn(true);
                                                    setCartBtnWord('已加入');
                                                    setCartBuyWord('前往結帳');
                                                    navigate('/ordersteps', {
                                                        replace: true,
                                                    });
                                                } else {
                                                    navigate('/ordersteps', {
                                                        replace: true,
                                                    });
                                                }
                                            }}
                                        >
                                            <AiFillShopping /> {cartBuyWord}
                                        </button>
                                    ) : (
                                        <button
                                            className="xuan-btn-l xuan-btn-pri"
                                            onClick={() => {
                                                Swal.fire('請先登入會員');
                                                navigate('/login', {
                                                    replace: true,
                                                });
                                            }}
                                        >
                                            <AiFillShopping /> {cartBuyWord}
                                        </button>
                                    )}

                                    <br />

                                    <button
                                        className="xuan-btn-l xuan-btn-pri"
                                        onClick={() => {
                                            navigate('/events', {
                                                replace: true,
                                            });
                                        }}
                                    >
                                        <IoMdArrowRoundBack /> 回活動列表
                                    </button>
                                </div>
                            </div>

                            {/* 放Chart.js  */}
                            <div className="xuan-comment-chart">
                                <span className="xuan-h5">精選評論</span>
                                {/* FIXME: 來不及做先取消 */}
                                {/* <TiLocationArrowOutline /> */}
                                {/* <a href="#/">查看共1000則評價</a> */}
                                {/* <span className="xuan-subtitle">+撰寫評論</span> */}
                            </div>

                            <div className="xuan-comment-group">
                                <SimpleBar className="xuan-comment-bar">
                                    {ecomment.map((v, i) => {
                                        return (
                                            <div
                                                className="xuan-comment-item"
                                                key={v.sid}
                                            >
                                                <div className="xuan-comment-avatar">
                                                    <img
                                                        src={
                                                            'http://localhost:3500/event/comment/' +
                                                            v.event_comment_avatar
                                                        }
                                                        alt=""
                                                    />
                                                </div>

                                                <div className="xuan-comment-word-wrap">
                                                    <div className="xuan-subtitle">
                                                        {v.event_comment_name}
                                                    </div>

                                                    <div className="d-flex">
                                                        <div className="xuan-comment-star-wrap ">
                                                            <FaStar />
                                                            {
                                                                v.event_comment_star
                                                            }
                                                        </div>

                                                        <span className="xuan-body ">
                                                            {
                                                                v.event_comment_date
                                                            }
                                                            {/* <BiLike /> */}
                                                        </span>
                                                    </div>

                                                    <span>
                                                        {v.event_comment}
                                                    </span>
                                                </div>

                                                <div className="xuan-comment-imgupload"></div>
                                            </div>
                                        );
                                    })}
                                </SimpleBar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetail;
