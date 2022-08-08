import PersonForm from '../components/PersonForm';
import Summary from '../components/Summary';
import React from 'react';

function Shipping(props) {
    const {
        myInfor,
        setMyInfor,
        calcPickNumber,
        calcPickPrice,
        calcPickDonateNumber,
        calcPickDonateTotalPrice,
        calcPickVolunNumber,
        calcPickVolunTotalPrice,
        countryIndex,
        setCountryIndex,
        townshipIndex,
        setTownshipIndex,
        detailVisible,
        setDetailVisible,
    } = props;

    return (
        <>
            <div className="xuan-personinfor-container">
                <div className="xuan-row">
                    <PersonForm
                        myInfor={myInfor}
                        setMyInfor={setMyInfor}
                        countryIndex={countryIndex}
                        setCountryIndex={setCountryIndex}
                        townshipIndex={townshipIndex}
                        setTownshipIndex={setTownshipIndex}
                        detailVisible={detailVisible} 
                        setDetailVisible={setDetailVisible}
                    />

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

export default Shipping;
