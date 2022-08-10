import '../../Event/_xuan_styles.scss';
import '../styles/_new_cart.scss';

function Summary(props) {
    const {
        calcPickNumber,
        calcPickPrice,
        calcPickDonateNumber,
        calcPickDonateTotalPrice,
        calcPickVolunNumber,
        calcPickVolunTotalPrice,
    } = props; //從Cart.js傳來的props


    // FIXME: 結帳明細按刪除，總數量不會一起改動，只會跟select連動

    return (
        <>
            {/* 右側金額明細 */}
            <div className=" xuan-summary-col">
                <div className="xuan-cart-cost">
                    <div className="xuan-cart-title">
                        <h5 className="xuan-title">
                        {/* FIXME: 這個數字不會跟著刪除鍵跳 */}
                            結帳明細（共{calcPickNumber}項）
                        </h5>
                    </div>

                    <div className="xuan-cost-list">
                        <div className="xuan-donate-cost">
                            <p className="xuan-caption">
                                贊助({calcPickDonateNumber})：
                            </p>
                            <h5 className="xuan-title">
                                NT$ {calcPickDonateTotalPrice}
                            </h5>
                        </div>

                        <div className="xuan-volunteer-cost">
                            <p className="xuan-caption">
                                志工({calcPickVolunNumber})：
                            </p>
                            <h5 className="xuan-title">
                                NT$ {calcPickVolunTotalPrice}
                            </h5>
                        </div>
                    </div>

                    <div className="xuan-total-cost">
                        <p className="xuan-caption">總計 Total：</p>
                        <h4 className="xuan-title">NT$ {calcPickPrice}</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Summary;
