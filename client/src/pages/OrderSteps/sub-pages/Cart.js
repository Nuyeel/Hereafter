import React, { useEffect, useContext } from 'react';
import axios from 'axios';

import '../styles/_cart.scss';

import OrderList from '../components/OrderList';
import Summary from '../components/Summary';

// 會員登入登出驗證
import AuthContext from '../../../context/AuthContext/AuthContext';

// 一個公式function
// 計算一開始要useState[]裡要有幾個1([1,1,1])
const initState = (eventArray) => {
    const state = [];
    // 每多一項就push一個1進陣列
    for (let i = 0; i < eventArray.length; i++) {
        state.push({ ...eventArray[i], count: 1 }); //複製array+多加count屬性進去，初始數字為1
    }
    return state;
};

const Cart = (props) => {
    // ---------此段用於「取得該會員購物車有什麼」的資訊--------------------------------------

    // 會員登入登出驗證(auth)
    const { authorized, sid, account, token } = useContext(AuthContext);

    // 一進購物車頁面就跟MySQL拿購物車資訊(取得JSON)
    const fetchEventShowCart = async () => {
        const events = await axios.get(
            `http://localhost:3500/eventcarts/showcart?member_sid=${sid}`
        );
        setEventCart(initState(events.data));
    };

    // 避免無窮迴圈(DidMount)
    useEffect(() => {
        fetchEventShowCart();
    }, []);

    // ---------此段處理「購物車內所有商品的資訊統計」---------------------------------------

    const { eventCart, setEventCart } = props;

    // 計算總數量
    const calcTotalNumber = () => {
        let total = 0;
        for (let i = 0; i < eventCart.length; i++) {
            total += eventCart[i].count;
        }

        return total;
    };

    // 計算總金額
    const calcTotalPrice = () => {
        let total = 0;
        for (let i = 0; i < eventCart.length; i++) {
            total += eventCart[i].count * eventCart[i].price;
        }
        return total;
    };

    // 計算「贊助」總數量(活動限定報名1次)
    const calcDonateNumber = () => {
        let total = 0;
        for (let i = 0; i < eventCart.length; i++) {
            eventCart[i].program_type === '贊助'
                ? (total += eventCart[i].count)
                : (total += 0);
        }
        return total;
    };
    // 計算「贊助」總金額
    const calcDonateTotalPrice = () => {
        let total = 0;
        for (let i = 0; i < eventCart.length; i++) {
            eventCart[i].program_type === '贊助'
                ? (total += eventCart[i].count * eventCart[i].price)
                : (total += 0);
        }
        return total;
    };

    // 計算「志工」總數量 (活動限定報名1次)
    const calcVolunNumber = () => {
        let total = 0;
        for (let i = 0; i < eventCart.length; i++) {
            eventCart[i].program_type === '志工'
                ? (total += eventCart[i].count)
                : (total += 0);
        }
        return total;
    };
    // 計算「志工」總金額
    const calcVolunTotalPrice = () => {
        let total = 0;
        for (let i = 0; i < eventCart.length; i++) {
            eventCart[i].program_type === '志工'
                ? (total += eventCart[i].count * eventCart[i].price)
                : (total += 0);
        }
        return total;
    };

    // ---------此段處理「已勾選的活動資訊統計」---------------------------------------

    //此段處理方法為: 篩選 eventPick 跟 eventCart 都有的 event_sid 出來
    const { eventPick, setEventPick } = props; //eventPick是獲得一個陣列

    // 計算「已勾選」總數量
    const calcPickNumber = () => {
        let total = 0;
        for (let i = 0; i < eventPick.length; i++) {
            total++;
        }
        return total;
    };

    // 計算「已勾選」總金額
    const calcPickPrice = () => {
        let total = 0;

        let newEventCart = [];
        eventPick.forEach(
            (element) =>
                // includes method is only supported on strings or arrays.(所以需要toString()方法)
                (newEventCart = newEventCart.concat(
                    eventCart.filter((v, i) =>
                        v.sid.toString().includes(element)
                    )
                ))
        );

        for (let i = 0; i < newEventCart.length; i++) {
            total += newEventCart[i].price; //因為活動數量固定是1，就不特別乘count了
        }
        return total;
    };

    // 計算「已勾選」的「贊助」總數量(活動限定報名1次)
    const calcPickDonateNumber = () => {
        let total = 0;

        let newEventCart = [];
        eventPick.forEach(
            (element) =>
                (newEventCart = newEventCart.concat(
                    eventCart.filter((v, i) =>
                        v.sid.toString().includes(element)
                    )
                ))
        );

        for (let i = 0; i < newEventCart.length; i++) {
            newEventCart[i].program_type === '贊助'
                ? (total += 1)
                : (total += 0);
        }
        return total;
    };
    // 計算「已勾選」的「贊助」總金額
    const calcPickDonateTotalPrice = () => {
        let total = 0;

        let newEventCart = [];
        eventPick.forEach(
            (element) =>
                (newEventCart = newEventCart.concat(
                    eventCart.filter((v, i) =>
                        v.sid.toString().includes(element)
                    )
                ))
        );

        for (let i = 0; i < newEventCart.length; i++) {
            newEventCart[i].program_type === '贊助'
                ? (total += 1 * newEventCart[i].price)
                : (total += 0);
        }
        return total;
    };

    // 計算「已勾選」的「志工」總數量 (活動限定報名1次)
    const calcPickVolunNumber = () => {
        let total = 0;

        let newEventCart = [];
        eventPick.forEach(
            (element) =>
                (newEventCart = newEventCart.concat(
                    eventCart.filter((v, i) =>
                        v.sid.toString().includes(element)
                    )
                ))
        );

        for (let i = 0; i < newEventCart.length; i++) {
            newEventCart[i].program_type === '志工'
                ? (total += 1)
                : (total += 0);
        }
        return total;
    };
    // 計算「已勾選」的「志工」總金額
    const calcPickVolunTotalPrice = () => {
        let total = 0;

        let newEventCart = [];
        eventPick.forEach(
            (element) =>
                (newEventCart = newEventCart.concat(
                    eventCart.filter((v, i) =>
                        v.sid.toString().includes(element)
                    )
                ))
        );

        for (let i = 0; i < newEventCart.length; i++) {
            newEventCart[i].program_type === '志工'
                ? (total += 1 * newEventCart[i].price)
                : (total += 0);
        }
        return total;
    };


    return (
        <>
            <div className="xuan-cart-container">
                <div className="row">
                    <OrderList
                        eventCart={eventCart}
                        setEventCart={setEventCart}
                        totalNumber={calcTotalNumber()}
                        donateNumber={calcDonateNumber()}
                        volunNumber={calcVolunNumber()}
                        eventPick={eventPick}
                        setEventPick={setEventPick}
                    />

                    {/* summary改只呈現「勾選後」的統計資訊 */}
                    <Summary
                        calcPickNumber={calcPickNumber()} //已勾選總數量
                        calcPickPrice={calcPickPrice()} //已勾選總金額
                        calcPickDonateNumber={calcPickDonateNumber()} //已勾選「贊助」總數量
                        calcPickDonateTotalPrice={calcPickDonateTotalPrice()} //已勾選「贊助」總金額
                        calcPickVolunNumber={calcPickVolunNumber()} //已勾選「志工」總數量
                        calcPickVolunTotalPrice={calcPickVolunTotalPrice()} //已勾選「贊助」總金額
                    />
                </div>
            </div>
        </>
    );
};

export default Cart;
