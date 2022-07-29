import React, { useState, Fragment } from "react";
import SoulIcon from "../../Place/components/SoulIcon";
import { TiDelete } from "react-icons/ti";

function PlaceOption(props) {
    const { value, selectedPlace, setSelectedPlace, placeMoveOutFromCart } =
        props;
    const { sid, year, month, country, city, dist, place_price } = { ...value };

    return (
        <>
            <div className="place-option-felx" data-placesid={sid}>
                <input
                    type="radio"
                    className="place-radio"
                    value={sid}
                    checked={selectedPlace === { sid }}
                    onChange={(e) => console.log("")}
                />
                <div
                    className={
                        selectedPlace === `${sid}`
                            ? "place-option selected"
                            : "place-option"
                    }
                    data-placesid={sid}
                    onClick={(e) => {
                        const nowPlaceSid =
                            e.currentTarget.getAttribute("data-placesid");
                        setSelectedPlace(nowPlaceSid);
                    }}
                >
                    <p className="title">
                        {year}年{month}月
                    </p>
                    <p className="title">
                        {country} {city} {dist}
                    </p>
                    <div className="price">
                        <SoulIcon className="soul-icon" />
                        <span>{place_price}</span>
                    </div>
                </div>
                <TiDelete
                    className="place-option-del-btn"
                    onClick={placeMoveOutFromCart}
                />
            </div>
        </>
    );
}

export default PlaceOption;
