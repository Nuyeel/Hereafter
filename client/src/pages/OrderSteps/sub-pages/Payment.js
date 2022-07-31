import Summary from '../components/Summary';
import '../styles/sub-pages.scss';
import '../styles/_creditcard.scss';
import { useState } from 'react';

function Payment(props) {
    const {
        calcPickNumber,
        calcPickPrice,
        calcPickDonateNumber,
        calcPickDonateTotalPrice,
        calcPickVolunNumber,
        calcPickVolunTotalPrice,
        cardInfor,
        setCardInfor,
    } = props;

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

    // ------------這段處理資料傳進 MySQL 過程-------------------

    // 透過localStorage 取得登入會員sid
    let memberinfor = JSON.parse(localStorage.getItem('auth'));
    const membersid = Object.values(memberinfor)[1];

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
            formData.get('member_sid'),
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
            });
    };

    return (
        <>
            {/* 信用卡放這邊 */}
            <div className="creditcard-container">
                <div className="row">
                    <div className="col-9 col payment-card-container">
                        {/* 信用卡 */}
                        <div className="card-container">
                            {/* 這邊會做翻牌變動 */}
                            {/* <div className="front" > */}
                            <div className="front" style={cardTransformFront}>
                                <div className="image">
                                    <img src="image/chip.png" alt="" />
                                    <img src="image/visa.png" alt="" />
                                </div>
                                <div className="card-number-box">
                                    {cardInfor.cardnumber}
                                </div>
                                <div className="flexbox">
                                    <div className="box">
                                        <span>card holder</span>
                                        <div className="card-holder-name">
                                            {cardInfor.cardholder}
                                        </div>
                                    </div>
                                    <div className="box">
                                        <span>expires</span>
                                        <div className="expiration">
                                            <span className="exp-month">
                                                {cardInfor.ex_month}
                                            </span>
                                            <span className="exp-year">
                                                {cardInfor.ex_year}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 這邊會做翻牌變動 */}
                            {/* <div className="back" > */}
                            <div className="back" style={cardTransformBack}>
                                <div className="stripe"></div>
                                <div className="box">
                                    <span>cvv</span>
                                    <div className="cvv-box">
                                        {cardInfor.cvv}
                                    </div>
                                    <img src="image/visa.png" alt="" />
                                </div>
                            </div>
                        </div>

                        <form name="creditform" onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input
                                    style={{ display: 'none' }}
                                    className="input-text"
                                    name="member_sid"
                                    type="text"
                                    id="test-text"
                                    defaultValue={membersid}
                                />

                                <span>card number</span>
                                <input
                                    type="text"
                                    maxLength="16"
                                    name="cardnumber"
                                    value={cardInfor.cardnumber}
                                    className="card-number-input"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputBox">
                                <span>card holder</span>
                                <input
                                    type="text"
                                    name="cardholder"
                                    value={cardInfor.cardholder}
                                    className="card-holder-input"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flexbox">
                                <div className="inputBox">
                                    <span>expiration mm</span>
                                    <select
                                        name="ex_month"
                                        className="month-input"
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
                                </div>

                                <div className="inputBox">
                                    <span>expiration yy</span>
                                    <select
                                        name="ex_year"
                                        id=""
                                        className="year-input"
                                        value={cardInfor.ex_year}
                                        onChange={handleChange}
                                    >
                                        <option value="year" disabled>
                                            year
                                        </option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                    </select>
                                </div>
                                <div className="inputBox">
                                    <span>cvv</span>
                                    <input
                                        type="text"
                                        maxLength="3"
                                        name="cvv"
                                        value={cardInfor.cvv}
                                        className="cvv-input"
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
                            <button type="submit" className="submit-btn" />
                        </form>
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
