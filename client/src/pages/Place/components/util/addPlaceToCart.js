import { useContext } from 'react';

import { PLACE_CARTDATA_API } from '../../../../config/ajax-path';
// 會員登入context
import AuthContext from '../../../../context/AuthContext/AuthContext';

function AddPlaceToCart(e) {
    console.log(e);
    const { authorized, sid: userSid } = useContext(AuthContext);

    const placeIndex = e.currentTarget
        .closest('.place-info-card')
        .getAttribute('data-placesid');
    console.log(placeIndex, userSid);

    // 存到資料庫
    const obj = { member_sid: userSid, place_sid: placeIndex };

    fetch(PLACE_CARTDATA_API, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((r) => r.json())
        .then((result) => {
            console.log(result);
        });

    return;
}

export default AddPlaceToCart;
