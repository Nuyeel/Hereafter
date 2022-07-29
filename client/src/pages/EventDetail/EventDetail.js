import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import './_eventdetail.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const EventDetail = () => {

    // 此段模擬會員登入------------------------------------------------------
    let memberlogin = {
        authorized: true,
        sid: 100,
        account: 'membertest',
        token: '12345',
    };

    localStorage.setItem('auth', JSON.stringify(memberlogin));

    // 此段模擬會員登出------------------------------------------------------
    // let memberlogout = {
    //   authorized: false,
    //   sid: 0,
    //   account: '',
    //   token:''}

    // localStorage.setItem('auth', JSON.stringify(memberlogout));

    // 處理會員狀態
    // const { authorized, sid, account, token } = useContext(AuthContext);

    const [eventDetail, setEventDetail] = useState([]);

    const navigate = useNavigate();
    let { eventSid } = useParams(); //取得是哪個活動sid後發fetch //要跟Router列表名稱對應

    // 一進頁面就跟MySQL拿活動資料(先透過useParams取得活動sid)
    const fetchEventDetail = async () => {
        const response = await axios.get(
            `http://localhost:3600/events/${eventSid}`
        );
        setEventDetail(response.data);
    };

    // 避免無窮迴圈(DidMount)
    useEffect(() => {
        fetchEventDetail();
    }, []);

    // 透過localStorage 取得登入會員sid
    let memberinfor = JSON.parse(localStorage.getItem('auth'));
    let membersid = Object.values(memberinfor)[1];

    // 按下「加入購物車」將資料存進MySQL //因為axios方式不熟 先用fetch方式POST
    const fetchEventAddCart = async () => {
        fetch('http://localhost:3600/eventcarts/addcart', {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: `event_sid=${eventSid}&member_sid=${membersid}`,
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj);
            });
    };


    return (
        <>
            <div className="eventdetail-container">
                <div className="row">
                    {/* 左方活動內容 */}
                    <div className="col-8">
                        {/* 考慮不放麵包屑 */}
                        <button
                            className="xuan-btn intro-bread"
                            onClick={() => {
                                navigate('/events', { replace: true });
                            }}
                        >
                            {' '}
                            返回上一頁
                        </button>

                        <div className="intro-box">
                            <div className="intro-img">
                                <img src="" alt="" />
                            </div>

                            <SimpleBar style={{ maxHeight: 250 }}>
                                {eventDetail.map((v, i) => {
                                    return (
                                        <>
                                            <div key={v.sid}>
                                                <p>活動評價：</p>
                                                <p>活動時間：{v.start}</p>
                                                <p>活動地點：{v.place_other}</p>
                                                <p>招募人數：{v.limit_num}</p>
                                                <p>主辦單位：{v.npo_name}</p>
                                                <p>
                                                    活動內容 & 注意事項：
                                                    {v.intro}
                                                </p>
                                                <p>主辦單位介紹：</p>
                                            </div>
                                        </>
                                    );
                                })}
                            </SimpleBar>
                        </div>
                    </div>

                    {/* 右方按鈕+評論 */}
                    <div className="col-4">
                        <div className="btn-wrap">
                            {/* 參加 group */}
                            <div className="buy-btn">
                                {eventDetail.map((v, i) => {
                                    return (
                                        <div className="cost-price" key={v.sid}>
                                            <p>贊助費用</p>
                                            <h2>{v.price}</h2>
                                            <p>陰德值獎勵</p>
                                            <h2>{v.value}</h2>
                                        </div>
                                    );
                                })}

                                <div className="btn-group">
                                    {/* 會員檢查: 沒登入跳通知 */}

                                    {/* {authorized ? (
                                        <button
                                            className="btn-m btn-pri"
                                            onClick={() => {
                                                navigate('/ordersteps', {
                                                    replace: true,
                                                });
                                            }}
                                        >
                                            直接結帳
                                        </button>
                                    ) : (
                                        <button
                                            className="btn-m btn-pri"
                                            onClick={() => {
                                                alert('請先登入會員');
                                            }}
                                        >
                                            直接結帳
                                        </button>
                                    )}

                                    {authorized ? (
                                        <button
                                            className="btn-m btn-pri"
                                            onClick={() => {
                                                fetchEventAddCart();
                                                alert('商品已加至購物車');
                                            }}
                                        >
                                            加入購物車
                                        </button>
                                    ) : (
                                        <button
                                            className="btn-m btn-pri"
                                            onClick={() => {
                                                alert('請先登入會員');
                                            }}
                                        >
                                            加入購物車
                                        </button>
                                    )} */}

                                    <button
                                        className="btn-m btn-pri"
                                        onClick={() => {
                                            navigate('/events', {
                                                replace: true,
                                            });
                                        }}
                                    >
                                        繼續購物
                                    </button>
                                </div>
                            </div>

                            <div className="comment-group">
                                <SimpleBar style={{ maxHeight: 300 }}>
                                    <div className="comment-item">
                                        <p>評論內容</p>
                                    </div>
                                    <div className="comment-item">
                                        <p>評論內容</p>
                                    </div>
                                    <div className="comment-item">
                                        <p>評論內容</p>
                                    </div>
                                    <div className="comment-item">
                                        <p>評論內容</p>
                                    </div>
                                    <div className="comment-item">
                                        <p>評論內容</p>
                                    </div>
                                    <div className="comment-item">
                                        <p>評論內容</p>
                                    </div>
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
