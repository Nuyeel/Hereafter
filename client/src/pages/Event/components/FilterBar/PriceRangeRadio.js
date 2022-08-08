import React from 'react';

function PriceRangeRadio(props) {
    const { priceRange, setPriceRange, value } = props;

    return (
        <>
            <div className="form-check">
                <input
                    className="xuan-input-radio"
                    type="radio"
                    value={value}
                    checked={priceRange === value}
                    onChange={(e) => {
                        setPriceRange(e.target.value);
                    }}
                />
                <label className="xuan-label-title">{value}</label>
            </div>
        </>
    );
}

export default PriceRangeRadio;
