import cart_step_1 from '../../imgs/cart-step-1.svg'; //先暫時用老師的
import scroll_down from '../../imgs/scroll-down.svg';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2'; //sweetalert2

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    decrement,
    increment,
} from '../../../../features/counter/counterSlice';

// scss
import '../../../Event/_xuan_styles.scss';
import '../../styles/_new_cart.scss';

import EventItem from './EventItem';

// 會員登入登出驗證
import AuthContext from '../../../../context/AuthContext/AuthContext';

function OrderList(props) {
    // Redux
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

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

    // 會員登入登出驗證(auth)
    const { authorized, sid, account, token } = useContext(AuthContext);

    // 在購物車按下"x" 將資料從MySQL刪除  //因為axios方式不熟 先用fetch方式
    const fetchEventDelCart = async (del_event_sid) => {
        fetch('http://localhost:3500/eventcarts/deletecart', {
            method: 'DELETE',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: `event_sid=${del_event_sid}&member_sid=${sid}`,
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj);
            });
    };

    return (
        <>
            {/* 左側購物清單 */}
            <div className="xuan-orderlist-container">
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

                <SimpleBar className="cart-list-simplebar">
                    {/* 購物車條列放這邊 */}
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
                                    removeItem={() => {
                                        Swal.fire({
                                            title: '確定要刪除此筆訂單?',
                                            // text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            cancelButtonText: '取消',
                                            confirmButtonText: '確定刪除',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                Swal.fire(
                                                    '已刪除'
                                                    // '此筆訂單已刪除',
                                                    // 'success'
                                                );

                                                const newEventCart =
                                                    eventCart.filter(
                                                        (v2, i2) => {
                                                            // del_event_sid = v.sid;
                                                            return (
                                                                v.sid !== v2.sid
                                                            ); //只留沒有點到的
                                                        }
                                                    );

                                                console.log(v.sid);

                                                fetchEventDelCart(v.sid); //同步把MySQL資料刪掉
                                                setEventCart(newEventCart);
                                                // 再呼叫一次重新計算一次
                                                dispatch(decrement());
                                            }
                                        });
                                    }}
                                />
                            );
                        })}
                    </div>
                </SimpleBar>
            </div>
        </>
    );
}

export default OrderList;
