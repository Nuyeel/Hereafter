import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; //sweetalert2
import OutlineSoul from '../../images/sweetalert2/outline_soul.svg';
import OutlineSoulAlert from '../../images/sweetalert2/outline_soul_alert.svg';

// 子頁面(區域)
import Cart from './sub-pages/Cart'; //購物車明細
import Shipping from './sub-pages/Shipping'; //填寫地址姓名
import Payment from './sub-pages/Payment'; //信用卡付款
import OrderDetail from './sub-pages/OrderDetail'; //已付款清單

// 進度條
import ProgressBar from './components/ProgressBar';

// 會員登入登出驗證
import AuthContext from '../../context/AuthContext/AuthContext';

// scss
import '../Event/_xuan_styles.scss';
import './styles/_new_cart.scss';
import ReadyToBuy from './components/ReadyToBuy';

// 讓Header不要出現
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';

function OrderSteps(props) {
    // 讓Header不要出現
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);

    // 會員登入登出驗證(auth)
    const { authorized, sid, account, token } = useContext(AuthContext);

    //取得 勾選要結帳的清單array
    const [eventPick, setEventPick] = useState([]);
    //紀錄 所有被加進購物車的活動 sid
    const [eventCart, setEventCart] = useState([]);

    // 此段是TWZipCode檔案需要的變數
    const [countryIndex, setCountryIndex] = useState(-1);
    const [townshipIndex, setTownshipIndex] = useState(-1);

    // 切換訂單明細visible的按鈕(預設隱藏)
    const [detailVisible, setDetailVisible] = useState(
        'xuan-readytobuy-container-hidden'
    );

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
    const fetchCreateOrder = async () => {
        fetch('http://localhost:3500/eventcarts/addorder', {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
                Authorization: `Bearer ${token}`,
            },
            body: `event_order_detail=${eventPick}&member_sid=${sid}`,
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj);
                console.log(eventPick);
            });
    };

    // multiple State  填寫報名活動資訊變數(放最上層，按上下頁時資料才會保留)
    const [myInfor, setMyInfor] = useState({
        member_sid: `${sid}`,
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
        member_sid: `${sid}`,
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
    const progressNames = ['活動明細', '訂購人資訊', '付款', '交易完成'];

    // 上一步 下一步按鈕
    const next = () => {
        if (step === 1) {
            if (eventCart.length === 0) {
                Swal.fire({
                    title: '哎呀！看來你的購物車是空的喔！',
                    text: '立刻前往「功德撲滿」賺取陰德值吧',
                    // icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#9587E1',
                    cancelButtonColor: '#FF52BA',
                    confirmButtonText: '來去逛逛',
                    imageUrl: OutlineSoul,
                    imageHeight: 50,
                    imageWidth: 50,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/events', { replace: true });
                    }
                });
                return;
            }

            if (eventPick.length === 0) {
                Swal.fire('您尚未選取結帳商品');
                return;
            }
        }

        if (step === 2) {
            // TODO: 當step是2的時候，
            // 1. 下一步按鈕變色 + disabled
            // 2. 當「送出」真的被fetch之後，連帶啟動next()

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

            //  有錯誤訊息會跳出警告，不會到"下一步"
            const errors = [];
            if (!fullname) errors.push('姓名未填 ');
            if (!mobile) errors.push('電話未填 ');
            if (!ID) errors.push('身分證字號未填 ');

            if (errors.length > 0) {
                // alert(errors.join(','));
                // Swal.fire(errors.join('、'));
                Swal.fire('資訊未填寫完整');
                return;
            }
        }

        // 沒錯誤才會到下一步
        if (step < maxSteps) setStep(step + 1);
    };

    // 上一步按鈕
    const prev = () => {
        if (step > 1) setStep(step - 1);
    };

    // 設定 Header
    useEffect(() => {
        setHeader(headers[pageName]);
    }, [pageName, setHeader]);

    return (
        <>
            <div className="orderstep-container">
                {/* 光箱-訂單明細 */}
                <ReadyToBuy
                    eventPick={eventPick}
                    setEventPick={setEventPick}
                    detailVisible={detailVisible}
                    setDetailVisible={setDetailVisible}
                    step={step}
                    setStep={setStep}
                    prev={prev}
                />

                {/* 進度條 */}
                <ProgressBar
                    maxSteps={maxSteps}
                    step={step}
                    progressNames={progressNames}
                />

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
                        detailVisible={detailVisible}
                        setDetailVisible={setDetailVisible}
                        next={next}
                        fetchCreateOrder={fetchCreateOrder} //PersonForm用
                    />
                </div>

                {/* 按鈕 */}
                <div className="xuan-cart-btn">
                    {step === 1 ? (
                        <button
                            className="xuan-btn-m xuan-btn-pri"
                            style={{ visibility: 'visible' }}
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
                            style={{ visibility: 'hidden' }}
                        >
                            上一步
                        </button>
                    )}

                    {/* 如果是填寫個人資訊那一PART */}
                    {/* 上一步下一步消失 */}

                    {step === 1 ? (
                        <button
                            className="xuan-btn-m xuan-btn-pri"
                            onClick={() => {
                                next();
                            }}
                        >
                            下一步
                        </button>
                    ) : (
                        <button
                            className="xuan-btn-m xuan-btn-pri"
                            style={{ visibility: 'hidden' }}
                        >
                            下一步
                        </button>
                    )}

                    {/* {step === 2 ? (
                        <button
                            className="xuan-btn-m xuan-btn-pri"
                            disabled
                            // style={{ backgroundColor: btnBgColor.Disabled }}
                            style={{ visibility: 'hidden' }}
                        >
                            下一步
                        </button>
                    ) : step === 3 ? (
                        //填寫完付款資訊後，才會把資訊送進MySQL
                        <button
                            className="xuan-btn-m xuan-btn-pri"
                            // type="submit"
                            // 當step是3時，也預設Disabled
                            disabled
                            // style={{ backgroundColor: btnBgColor.Disabled }}
                            style={{ visibility: 'hidden' }}
                        >
                            下一步
                        </button>
                    ) : (
                        <button
                            className="xuan-btn-m xuan-btn-pri"
                            disabled={step === maxSteps}
                            style={{ visibility: 'hidden' }}
                            onClick={() => {
                                next();
                            }}
                        >
                            下一步
                        </button>
                    )} */}
                </div>
            </div>
        </>
    );
}

export default OrderSteps;
