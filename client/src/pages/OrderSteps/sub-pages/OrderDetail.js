// scss
import '../../Event/_xuan_styles.scss';
import '../styles/_new_cart.scss';
import './_finalstep.scss';

import { useNavigate } from 'react-router-dom';

// 會員登入登出驗證
import AuthContext from '../../../context/AuthContext/AuthContext';

function OrderDetail(props) {
    const navigate = useNavigate();
    const { myInfor, cardInfor, calcPickPrice } = props;

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

    const { cardnumber, bill, payway } = cardInfor;

    return (
        <>
            <div className="xuan-finally-container">
                <div className="xuan-finally-center-block">
                    <p className="xuan-h5 ">感謝你的購買</p>
                    <p className="xuan-subtitle">以下為您的訂購資訊</p>

                    <div className="xuan-finally-infor">
                        {/* 左邊放總金額 & 付款資訊 */}
                        <div className="xuan-finally-infor-left ">
                            <div>
                                <p className="xuan-subtitle">
                                    總計: NT${calcPickPrice}
                                </p>
                            </div>
                            <div className="xuan-subtitle xuan-orderdetail-p ">
                                <p className="xuan-finally-title">發票種類</p>
                                {bill}
                            </div>

                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">付款資訊</p>
                                {payway}
                            </div>

                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">
                                    末4碼
                                </p>
                                {cardnumber}
                            </div>
                        </div>

                        {/* 右邊放個人資訊 */}
                        <div className="xuan-finally-infor-right">
                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">姓名</p>
                                {fullname}
                            </div>
                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">手機</p>
                                {mobile_town}
                                {mobile}
                            </div>

                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">性別</p>
                                {gender}
                            </div>
                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">信箱</p>
                                {email}
                            </div>

                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">出生日期</p>
                                {birthday}
                            </div>
                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">身分證字號</p>
                                {ID}
                            </div>

                            <div className="xuan-subtitle xuan-orderdetail-p">
                                <p className="xuan-finally-title">地址</p>
                                {address}
                            </div>
                        </div>
                    </div>
                    <button
                        className="xuan-btn-m xuan-btn-pri"
                        onClick={() => {
                            navigate('/membereventorder', {
                                replace: true,
                            });
                        }}
                    >
                        查看訂單紀錄
                    </button>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;
