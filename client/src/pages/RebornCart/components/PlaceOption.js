import React from 'react';
import SoulIcon from '../../Place/components/SoulIcon';
import { TiDelete } from 'react-icons/ti';

function PlaceOption(props) {
    const { value, selectedPlace, setSelectedPlace, removePlaceFromCart } =
        props;
    const { sid, year, month, country, city, dist, place_price } = { ...value };

    return (
        <>
            <div className="place-option-flex" data-placesid={sid}>
                <input
                    type="radio"
                    className="place-radio"
                    value={sid}
                    checked={selectedPlace === sid}
                    onChange={(e) => console.log('')}
                />
                <div
                    className={
                        selectedPlace === sid
                            ? 'place-option selected'
                            : 'place-option'
                    }
                    data-placesid={sid}
                    onClick={(e) => {
                        const nowPlaceSid = Number(
                            e.currentTarget.getAttribute('data-placesid')
                        );
                        // console.log(typeof nowPlaceSid);
                        setSelectedPlace(nowPlaceSid);
                    }}
                >
                    <p className="place-option-title">
                        {year}年{month}月
                    </p>
                    <p className="place-option-title">
                        {country} {city} {dist}
                    </p>
                    <div className="price">
                        <SoulIcon className="soul-icon" />
                        <span>{place_price}</span>
                    </div>
                </div>
                <TiDelete
                    className="place-option-del-btn"
                    onClick={removePlaceFromCart}
                />
            </div>
        </>
    );
}

export default PlaceOption;
