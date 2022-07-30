import cart_step_1 from '../../imgs/cart-step-1.svg'; //先暫時用老師的
import scroll_down from '../../imgs/scroll-down.svg';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useState, useEffect } from 'react';

// scss
import '../../../Event/_xuan_styles.scss';
import '../../styles/_cart.scss';
import '../styles/_orderlist.scss';

import EventItem from './EventItem';

function OrderList(props) {
    //從Cart.js裡傳來的props
    const {
        totalNumber,
        donateNumber,
        volunNumber,
        eventCart,
        setEventCart,
        eventPick,
        setEventPick,
    } = props; // 從Cart.js來

    // 在購物車按下"x" 將資料從MySQL刪除  //因為axios方式不熟 先用fetch方式

    // 透過localStorage 取得登入會員sid
    let memberinfor = JSON.parse(localStorage.getItem('auth'));
    let membersid = Object.values(memberinfor)[1];

    const fetchEventDelCart = async (del_event_sid) => {
        fetch('http://localhost:3500/eventcarts/deletecart', {
            method: 'DELETE',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: `event_sid=${del_event_sid}&member_sid=${membersid}`,
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj);
            });
    };

    return (
        <>
            {/* 左側購物清單 */}
            <div className="col col-9">
                {/* 勾選 + 結帳流程圖 */}
                <div className="xuan-all-select-delete">
                    <input
                        className="xuan-input-checkbox"
                        type="checkbox"
                        id="cbox"
                        checked={eventPick.length === eventCart.length}
                        onChange={async (e) => {
                            if (e.target.checked) {
                                // 按第一次 -> 全勾
                                let wholeEventPick = [];
                                eventCart.forEach((element) =>
                                    wholeEventPick.push(
                                        element.event_sid.toString()
                                    )
                                );
                                setEventPick(wholeEventPick);
                            } else {
                                // 按第二次 -> 全不不勾
                                setEventPick([]);
                            }
                        }}
                    />
                    <p className="xuan-subtitle">
                        全選（共{eventCart.length}項）（贊助：{donateNumber}項 /
                        志工：{volunNumber}項）
                    </p>

                    {/* TODO: 清空功能要加上去  */}
                    {/* <input type="checkbox" id="cbox" /> */}
                    {/* <p className="caption">清空({eventCart.length})</p> */}
                    {/* 
                    <p className="caption">--贊助: {donateNumber}--</p>
                    <p className="caption">--志工: {volunNumber}--</p> */}
                </div>

                <SimpleBar style={{ maxHeight: 520, maxWidth: 1000 }}>
                    {/* 購物車條列放這邊 */}
                    <div className="xuan-cart-list-window">
                        <div className="xuan-cart-list-wrap">
                            {eventCart.map((v, i) => {
                                return (
                                    <EventItem
                                        eventPick={eventPick}
                                        setEventPick={setEventPick}
                                        key={v.sid}
                                        {...v}
                                        // 此段參考老師0713-1檔案
                                        setCount={(newCount) => {
                                            const newEventCart = eventCart.map(
                                                (v2, i2) => {
                                                    if (i2 === i) {
                                                        return {
                                                            ...v2,
                                                            count:
                                                                newCount < 1
                                                                    ? 1
                                                                    : newCount,
                                                        }; //點到哪列，該列count才會跳，其他列不被影響
                                                    }
                                                    return v2;
                                                }
                                            );
                                            setEventCart(newEventCart); //新array取代舊array
                                        }}
                                        // 刪除功能
                                        removeItem={() => {
                                            //let del_event_sid = ""; //用來取得是哪個event_sid被刪除

                                            const newEventCart =
                                                eventCart.filter((v2, i2) => {
                                                    // del_event_sid = v.sid;
                                                    return v.sid !== v2.sid; //只留沒有點到的
                                                });

                                            console.log(v.sid);

                                            fetchEventDelCart(v.sid); //同步把MySQL資料刪掉
                                            setEventCart(newEventCart);
                                        }}

                                        // 目前Bug是一次只能刪一個(????)
                                        // 觀察: 要重新整理完後的click才會有效
                                    />
                                );
                            })}
                        </div>
                    </div>
                </SimpleBar>
            </div>
        </>
    );
}

export default OrderList;
