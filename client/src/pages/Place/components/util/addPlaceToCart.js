import { PLACE_CARTDATA_API } from '../../../../config/ajax-path';

function AddPlaceToCart(props) {
    const { e, userSid, isDead } = props;

    if (isDead && userSid) {
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
    }

    return;
}

export default AddPlaceToCart;
