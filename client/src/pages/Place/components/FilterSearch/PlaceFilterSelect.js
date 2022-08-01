import React from 'react';

function PlaceFilterSelect(props) {
    const {
        countryFilter,
        setCountryFilter,
        cityFilter,
        setCityFilter,
        rawPlaceData,
        filtByCountry,
        setPlaceDisplay,
        countryFilterData,
    } = props;

    const countryData = countryFilterData.country;
    const cityData = countryFilterData.countryCity;

    return (
        <>
            <div className="my-place-select">
                <select
                    className="countrySelection"
                    value={countryFilter}
                    onChange={(e) => {
                        const nowCountry = e.target.value;
                        // console.log(nowCountry);
                        if (nowCountry === 'all') {
                            const newPlaceData = [...rawPlaceData];
                            setCountryFilter('all');
                            setPlaceDisplay(newPlaceData);
                        } else {
                            setCountryFilter(nowCountry);
                            filtByCountry(nowCountry, null);
                        }
                    }}
                >
                    <option value="all">選擇國家</option>
                    {/* value之後帶入資料表的值 */}
                    {countryData.map((country) => {
                        return (
                            <option value={country.country} key={country.sid}>
                                {country.country}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="my-place-select">
                {/* 國家沒有選的話, 不顯示城市選單 */}
                {countryFilter === 'all' ? (
                    <select className="citySelection">
                        <option value="all">選擇城市</option>
                    </select>
                ) : (
                    <select
                        className="citySelection"
                        value={cityFilter}
                        onChange={(e) => {
                            const nowCity = e.target.value;
                            if (nowCity === 'all') {
                                filtByCountry(countryFilter, null);
                            } else {
                                setCityFilter(nowCity);
                                filtByCountry(countryFilter, nowCity);
                            }
                        }}
                    >
                        <option value="all">選擇城市</option>
                        {cityData
                            .filter((v) => v.country === countryFilter)
                            .map((city, i) => {
                                return (
                                    <option value={city.city} key={i}>
                                        {city.city}
                                    </option>
                                );
                            })}
                    </select>
                )}
            </div>
        </>
    );
}

export default PlaceFilterSelect;
