import Summary from '../components/Summary';
import { useState, useContext } from 'react';

// scss
import '../../Event/_xuan_styles.scss';
import '../styles/_new_cart.scss';
import '../styles/_creditcard.scss';

//img
import creditcard_logo from '../imgs/creditcard-logo.svg';
import creditcard_logo_back from '../imgs/creditcard-logo-back.svg';

// react-icon
import { MdReplay } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';

// 會員登入登出驗證
import AuthContext from '../../../context/AuthContext/AuthContext';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { decrementByAmount } from '../../../features/counter/counterSlice';

function Payment(props) {
    // Redux
    const dispatch = useDispatch();

    // 會員登入登出驗證(auth)
    const { authorized, sid, account, token } = useContext(AuthContext);
    const {
        calcPickNumber,
        calcPickPrice,
        calcPickDonateNumber,
        calcPickDonateTotalPrice,
        calcPickVolunNumber,
        calcPickVolunTotalPrice,
        cardInfor,
        setCardInfor,
        setDetailVisible,
        detailVisible,
        fetchCreateOrder,
        eventPick,
        next,
        setStep,
        step
    } = props;

    // 取得memberSid (信用卡訂單MySQL用)
    let auth = localStorage.getItem('auth');
    auth = JSON.parse(auth);
    let membersid = auth.sid;
    console.log(membersid);

    // 切換卡片正反面的 style
    const cardAF = {
        //卡片正面效果 .front
        perspective: '1000px',
        transform: 'rotateY(0deg)',
    };
    const cardAB = {
        //卡片正面效果 .back
        perspective: '1000px',
        transform: 'rotateY(180deg)',
    };
    const cardBF = {
        //卡片背面效果 .front
        perspective: '1000px',
        transform: 'rotateY(-180deg)',
    };
    const cardBB = {
        //卡片背面效果 .back
        perspective: '1000px',
        transform: 'rotateY(0deg)',
    };

    // 預設是卡片正面效果
    const [cardTransformFront, setCardTransformFront] = useState(cardAF);
    const [cardTransformBack, setCardTransformBack] = useState(cardAB);

    // 這邊處理 把已結帳商品從購物車移除的過程-----------------------
    let alreadypay = '';

    // 先把eventPick跑迴圈，再塞進body裡面fetch
    if (eventPick.length !== 0) {
        eventPick.map((v, i) => {
            alreadypay += `&alreadypay=${v}`;
        });

        console.log('alreadypay', alreadypay);
    }

    const fetchAlreadyPay = async () => {
        console.log('alreadypay', alreadypay);
        fetch(
            `http://localhost:3500/eventcarts/alreadypay?membersid=${membersid}${alreadypay}`,
            {
                method: 'GET',
            }
        )
            .then((r) => r.json())
            .then((obj) => {
                console.log('已經刪除', obj);
            });
    };

    // ------------這段處理資料傳進 MySQL 過程-------------------

    const handleChange = (e) => {
        setCardInfor({ ...cardInfor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 先阻擋預設送出行為(預設用GET URLencoded)

        // 這裡可以得到目前輸入的值
        // 第一種方式: 從狀態得到
        console.log(cardInfor);

        // 第二種方式: 用FormData物件
        const formData = new FormData(e.target);

        console.log(
            formData.get('sid'),
            formData.get('cardnumber'),
            formData.get('cardholder'),
            formData.get('ex_month'),
            formData.get('ex_year'),
            formData.get('cvv')
        );

        // 作更多驗証

        const fd = new FormData(document.creditform); //建立一個formdata

        // 如果Router已有upload功能，可直接用formdata
        // 送到伺服器(fetch/ajax)
        fetch('http://localhost:3500/eventcarts/creditcard', {
            method: 'POST',
            body: fd, //目前送出格式為multiple formdata
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log('收到的res', obj);
            })
            // 當按下確認的時候，把資料送進MySQL
            .then(() => {
                fetchCreateOrder(); //送進MySQL
                next(); //進到下一頁
            })
            .then(() => {
                fetchAlreadyPay();
                console.log('已刪除購物車內容');
                dispatch(decrementByAmount(eventPick.length));
            });
    };

    // 單純阻止原生報錯訊息
    const handleInvalid = (e) => {
        e.preventDefault(); //阻擋HTML5原生錯誤訊息
    };

    return (
        <>
            {/* 信用卡放這邊 */}
            <div className="xuan-creditcard-container">
                <div className="xuan-row">
                    <div className="payment-card-window">
                        {/* 標題區(含活動明細BTN) */}
                        <div className="xuan-payment-title">
                            <div className="xuan-payment-btn">
                                <button
                                    className="xuan-btn-m xuan-btn-pri"
                                    onClick={() => {
                                        setDetailVisible(
                                            'xuan-readytobuy-container-visible'
                                        );
                                    }}
                                >
                                    查看訂單明細
                                </button>
                            </div>

                            <div className="xuan-payment-title-word">
                                <span className="xuan-title">付款資訊</span>
                            </div>
                        </div>

                        <div className="xuan-bill">
                            <label
                                htmlFor="test-text"
                                className="xuan-label-title"
                            >
                                發票：
                            </label>

                            <input
                                className="xuan-input-radio"
                                name="bill"
                                type="radio"
                            />

                            <label className="xuan-label-title  ">二聯式</label>

                            <input
                                className="xuan-input-radio"
                                name="bill"
                                type="radio"
                            />

                            <label className="xuan-label-title  ">三聯式</label>

                            <input
                                className="xuan-input-radio"
                                name="bill"
                                type="radio"
                            />

                            <label className="xuan-label-title  ">
                                實體發票
                            </label>
                        </div>

                        <div className="xuan-payment-way">
                            <label
                                className="xuan-label-title "
                                htmlFor="test-text"
                            >
                                付款方式：
                            </label>

                            {/* TODO: 一開始預設是信用卡 */}
                            <input
                                className="xuan-input-radio"
                                name="payway"
                                type="radio"
                                selected={true}
                            />

                            <label className="xuan-label-title ">信用卡</label>
                            <input
                                className="xuan-input-radio"
                                name="payway"
                                type="radio"
                            />
                            <label className="xuan-label-title ">
                                LINE Pay
                            </label>
                        </div>

                        <div className="xuan-creditcard-wrap">
                            {/* 信用卡本人 */}
                            <div className="xuan-card-container">
                                {/* 這邊會做翻牌變動 */}
                                <div
                                    className="xuan-front"
                                    style={cardTransformFront}
                                >
                                    {/* 信用卡卡號 */}
                                    <p className="xuan-credit-notion xuan-body">
                                        信用卡卡號
                                    </p>

                                    <div className="card-number-box">
                                        {cardInfor.cardnumber
                                            ? cardInfor.cardnumber
                                            : '0000-0000-0000-0000'}
                                    </div>

                                    <div className="xuan-display-flex xuan-credit-bottom">
                                        <div className="box">
                                            <p className="xuan-credit-notion xuan-body">
                                                有效期限
                                            </p>

                                            <div className="expiration">
                                                <span className="exp-month">
                                                    {cardInfor.ex_month
                                                        ? cardInfor.ex_month
                                                        : '01'}
                                                </span>
                                                <span className="exp-year">
                                                    {cardInfor.ex_year
                                                        ? cardInfor.ex_year
                                                        : '2022'}
                                                </span>
                                            </div>

                                            <div>
                                                <div className="card-holder-name">
                                                    {cardInfor.cardholder}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="box">
                                            <img
                                                src={creditcard_logo}
                                                alt=""
                                                className="credit-img-front"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 這邊會做翻牌變動 */}
                                <div className="back" style={cardTransformBack}>
                                    <div className="stripe"></div>

                                    <div className="box">
                                        <p className="xuan-credit-notion xuan-body cvv-notion">
                                            CVV
                                        </p>
                                        <div className="cvv-box">
                                            {cardInfor.cvv}
                                        </div>
                                        <div className="credit-img-back">
                                            <img
                                                src={creditcard_logo_back}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form
                                name="creditform"
                                onSubmit={handleSubmit}
                                onInvalid={handleInvalid}
                                className="xuan-credit-form"
                            >
                                <div>
                                    <div className="xuan-input-cardnumber">
                                        <input
                                            style={{ display: 'none' }}
                                            className="xuan-input-text"
                                            name="member_sid"
                                            type="text"
                                            id="test-text"
                                            defaultValue={membersid}
                                        />

                                        <p className="xuan-label-title">
                                            信用卡卡號：
                                        </p>
                                        <input
                                            maxLength="16"
                                            name="cardnumber"
                                            value={cardInfor.cardnumber}
                                            className="xuan-input-text"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="xuan-payment-form-name">
                                        <p className="xuan-label-title ">
                                            持卡人姓名：
                                        </p>
                                        <input
                                            maxLength={8}
                                            name="cardholder"
                                            value={cardInfor.cardholder}
                                            className="xuan-input-text xuan-input-cardholder"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="xuan-payment-form-date">
                                        <p className="xuan-label-title">
                                            有效期限：
                                        </p>

                                        <select
                                            name="ex_month"
                                            className="xuan-input-text xuan-input-month"
                                            value={cardInfor.ex_month}
                                            onChange={handleChange}
                                        >
                                            <option value="month" disabled>
                                                month
                                            </option>

                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>

                                        <select
                                            name="ex_year"
                                            id="test-text"
                                            className="xuan-input-text"
                                            value={cardInfor.ex_year}
                                            onChange={handleChange}
                                        >
                                            <option value="year" disabled>
                                                year
                                            </option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                            <option value="2030">2030</option>
                                            <option value="2031">2031</option>
                                            <option value="2032">2032</option>
                                            <option value="2033">2033</option>
                                            <option value="2034">2034</option>
                                            <option value="2035">2035</option>
                                        </select>
                                    </div>

                                    <div className="xuan-payment-form-password">
                                        <p className="xuan-label-title">
                                            背面後3碼：
                                        </p>
                                        <input
                                            maxLength="3"
                                            name="cvv"
                                            value={cardInfor.cvv}
                                            className="xuan-input-text"
                                            onMouseLeave={() => {
                                                setCardTransformFront(cardAF);
                                                setCardTransformBack(cardAB);
                                            }}
                                            onMouseEnter={() => {
                                                setCardTransformFront(cardBF);
                                                setCardTransformBack(cardBB);
                                            }}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCardTransformFront(cardBF);
                                                setCardTransformBack(cardBB);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="xuan-payment-submit-button">
                                    <button
                                        type="submit"
                                        className="xuan-btn-m xuan-btn-sec"
                                    >
                                        <FiSend />
                                        確認
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <Summary
                        calcPickNumber={calcPickNumber} //已勾選總數量
                        calcPickPrice={calcPickPrice} //已勾選總金額
                        calcPickDonateNumber={calcPickDonateNumber} //已勾選「贊助」總數量
                        calcPickDonateTotalPrice={calcPickDonateTotalPrice} //已勾選「贊助」總金額
                        calcPickVolunNumber={calcPickVolunNumber} //已勾選「志工」總數量
                        calcPickVolunTotalPrice={calcPickVolunTotalPrice} //已勾選「贊助」總金額
                    />
                </div>
            </div>
        </>
    );
}

export default Payment;
