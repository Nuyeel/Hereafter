import Swal from 'sweetalert2';
import { PLACE_CARTDATA_API } from '../../../../config/ajax-path';
import soulIconAlert from '../../../../images/sweetalert2/outline_soul_alert.svg';

function AddPlaceToCart(e, userSid) {
    const placeIndex = e.currentTarget
        .closest('.place-info-card')
        .getAttribute('data-placesid');
    const cartBtn = e.currentTarget;
    // console.log(placeIndex, userSid);

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
            if (result.success === false) {
                Swal.fire({
                    title: result.error,
                    imageUrl: soulIconAlert,
                    imageHeight: 50,
                    imageWidth: 50,
                    // timer: 3000,
                });
            } else {
                cartBtn.classList.add('likedBtnCartBtnAnimation-add');
                setTimeout(() => {
                    cartBtn.classList.remove('likedBtnCartBtnAnimation-add');
                }, 500);
            }
        });

    return;
}

export default AddPlaceToCart;
