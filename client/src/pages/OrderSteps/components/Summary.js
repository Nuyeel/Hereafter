import '../../Event/_xuan_styles.scss';
import './styles/_summary.scss';

function Summary(props) {
    const {
        calcPickNumber,
        calcPickPrice,
        calcPickDonateNumber,
        calcPickDonateTotalPrice,
        calcPickVolunNumber,
        calcPickVolunTotalPrice,
    } = props; //從Cart.js傳來的props

    return (
        <>
            {/* 右側金額明細 */}
            <div className="col-3 xuan-summary-col">
                <div className="xuan-cart-cost">
                    <div className="xuan-cart-title">
                        <h5 className="xuan-h5">
                            結帳明細（共{calcPickNumber}項）
                        </h5>
                    </div>

                    <div className="xuan-donate-cost">
                        <p className="xuan-caption">
                            贊助（{calcPickDonateNumber}）
                        </p>
                        <h5 className="xuan-h5">
                            NT$ {calcPickDonateTotalPrice}
                        </h5>
                    </div>

                    <div className="xuan-volunteer-cost">
                        <p className="xuan-caption">
                            志工（{calcPickVolunNumber}）
                        </p>
                        <h5 className="xuan-h5">
                            NT$ {calcPickVolunTotalPrice}
                        </h5>
                    </div>

                    <div className="xuan-total-cost">
                        <p className="xuan-caption">總計 Total</p>
                        <h4 className="xuan-h4">NT$ {calcPickPrice}</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Summary;
