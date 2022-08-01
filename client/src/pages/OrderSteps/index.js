import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 子頁面(區域)
import Cart from './sub-pages/Cart'; //購物車明細
import Shipping from './sub-pages/Shipping'; //填寫地址姓名
import Payment from './sub-pages/Payment'; //信用卡付款
import OrderDetail from './sub-pages/OrderDetail'; //已付款清單

// 進度條
import ProgressBar from './components/ProgressBar';

// scss
import '../Event/_xuan_styles.scss';
import './styles/_cart.scss';


function OrderSteps(props) {
    // 這邊也要存localstorage，不然不逛商品直接點購物車會壞掉
    // 此段模擬會員登入------------------------------------------------------
    let memberlogin = {
        authorized: true,
        sid: 100,
        account: 'membertest',
        token: '12345',
    };

    localStorage.setItem('auth', JSON.stringify(memberlogin));

    // 透過localStorage 取得登入會員sid
    let memberinfor = JSON.parse(localStorage.getItem('auth'));
    let membersid = Object.values(memberinfor)[1];

    //取得 勾選要結帳的清單array
    const [eventPick, setEventPick] = useState([]);
    //紀錄 所有被加進購物車的活動 sid
    const [eventCart, setEventCart] = useState([]);

    // 此段是TWZipCode檔案需要的變數
    const [countryIndex, setCountryIndex] = useState(-1);
    const [townshipIndex, setTownshipIndex] = useState(-1);

    // ---------此段處理「已勾選的活動資訊統計」---------------------------------------

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

    // ------------------------------------------------------------------------------

    //填寫完「付款資訊」後在MySQL建立一個新的訂單(1次付款只會有1個訂單編號))
    const fetCreateOrder = async () => {
        fetch('http://localhost:3500/eventcarts/addorder', {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: `event_order_detail=${eventPick}&member_sid=${membersid}`,
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj);
            });
    };

    // multiple State  填寫報名活動資訊變數(放最上層，按上下頁時資料才會保留)
    const [myInfor, setMyInfor] = useState({
        member_sid: `${membersid}`,
        fullname: '',
        mobile_city: '',
        mobile: '',
        email: '',
        gender: '',
        ID: '',
        birthday: '',
        add_city: '',
        add_town: '',
        address: '',
    });

    // multiple State 信用卡資訊(放最上層，按上下頁時資料才會保留)
    const [cardInfor, setCardInfor] = useState({
        member_sid: `${membersid}`,
        cardnumber: '',
        cardholder: '',
        ex_month: '',
        ex_year: '',
        cvv: '',
    });

    const navigate = useNavigate();

    // const { cartNumber, setCartNumber } = props; //購物車數字props

    const maxSteps = 4;
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [shipping, setShippingData] = useState({
        name: '',
        address: '',
        phone: '',
    });

    // 動態元件語法
    const components = [Cart, Shipping, Payment, OrderDetail];
    const BlockComponent = components[step - 1];

    // 進度條使用
    const progressNames = ['購物車', '訂購人資訊', '付款', '報名完成'];

    // 上一步 下一步按鈕
    const next = () => {
        if (step === 2) {
            //  FIXME: 希望在把送出表單功能，改放到Summary「下一步」(submit功能轉移)

            // 個人資訊要填完整才可以進到下一頁
            const {
                fullname,
                mobile_city,
                mobile_town,
                mobile,
                email,
                gender,
                ID,
                birthday,
                add_city,
                add_town,
                address,
            } = myInfor;

            //   // 有錯誤訊息會跳出警告，不會到"下一步"
            const errors = [];
            if (!fullname) errors.push('姓名未填 ');
            if (!mobile) errors.push('電話沒填 ');
            if (!ID) errors.push('身分證字號沒填~ ');

            if (errors.length > 0) {
                alert(errors.join(','));
                return;
            } else {
                alert('報名表單已送出');
                fetCreateOrder();
            }
        }

        // 沒錯誤才會到下一步
        if (step < maxSteps) setStep(step + 1);
    };

    // 上一步按鈕
    const prev = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <>
            {/* <h1>訂購流程</h1> */}

            {/* 進度條 */}
            {/* <div>
                <ProgressBar
                    maxSteps={maxSteps}
                    step={step}
                    progressNames={progressNames}
                />
            </div> */}

            {/* 子頁面區域 */}
            <div className="xuan-order-steps">
                <BlockComponent
                    shipping={shipping}
                    setShippingData={setShippingData}
                    eventPick={eventPick}
                    setEventPick={setEventPick}
                    myInfor={myInfor}
                    setMyInfor={setMyInfor}
                    //--------從最上層傳數值才可被保留-----------

                    //下面這些變數是傳給 Summary 用
                    calcPickNumber={calcPickNumber()} //已勾選總數量
                    calcPickPrice={calcPickPrice()} //已勾選總金額
                    calcPickDonateNumber={calcPickDonateNumber()} //已勾選「贊助」總數量
                    calcPickDonateTotalPrice={calcPickDonateTotalPrice()} //已勾選「贊助」總金額
                    calcPickVolunNumber={calcPickVolunNumber()} //已勾選「志工」總數量
                    calcPickVolunTotalPrice={calcPickVolunTotalPrice()} //已勾選「贊助」總金額
                    // 下面這些變數是傳給 Cart.js 的 OrderList用
                    eventCart={eventCart}
                    setEventCart={setEventCart}
                    // 下面這些變數是給 Shipping.js 的 PersonForm 的 TWZipCode用
                    countryIndex={countryIndex}
                    setCountryIndex={setCountryIndex}
                    townshipIndex={townshipIndex}
                    setTownshipIndex={setTownshipIndex}
                    //下面這些變數是傳給 Payment.js用
                    cardInfor={cardInfor}
                    setCardInfor={setCardInfor}
                />
            </div>

            {/* 按鈕 */}
            <div className="xuan-cart-btn">
                {step === 1 ? (
                    <button
                        className="xuan-btn-m xuan-btn-pri"
                        onClick={() => {
                            navigate('/events', { replace: true });
                        }}
                    >
                        繼續選購
                    </button>
                ) : (
                    <button
                        className="xuan-btn-m xuan-btn-pri"
                        onClick={prev}
                        disabled={step === 1}
                    >
                        上一步
                    </button>
                )}

                {step === 3 ? (
                    //填寫完付款資訊後，才會把資訊送進MySQL
                    <button
                        className="xuan-btn-m xuan-btn-pri"
                        type="submit"
                        disabled={step === maxSteps}
                        onClick={() => {
                            next(); //進到下一階段
                            fetCreateOrder(); //把勾選項目存進MySQL
                        }}
                    >
                        下一步
                    </button>
                ) : (
                    <button
                        className="xuan-btn-m xuan-btn-pri"
                        disabled={step === maxSteps}
                        onClick={() => {
                            next(); //進到下一階段
                        }}
                    >
                        下一步
                    </button>
                )}
            </div>
        </>
    );
}

export default OrderSteps;
