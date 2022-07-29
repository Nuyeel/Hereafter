import React from "react";

function PlaceFilterSelect(props) {
    const {
        countryFilter,
        setCountryFilter,
        cityFilter,
        setCityFilter,
        rawPlaceData,
        filtByCountry,
        setPlaceDisplay,
    } = props;

    // 下拉選單資料
    const countryArr = [...rawPlaceData].map((v) => v.country);
    // console.log(countryArr);

    return (
        <>
            <div className="my-place-select">
                <select
                    className="countrySelection"
                    value={countryFilter}
                    onChange={(e) => {
                        const nowCountry = e.target.value;
                        // console.log(nowCountry);
                        if (nowCountry === "all") {
                            const newPlaceData = [...rawPlaceData];
                            setCountryFilter("all");
                            setPlaceDisplay(newPlaceData);
                        } else {
                            setCountryFilter(nowCountry);
                            filtByCountry(nowCountry, null);
                        }
                    }}
                >
                    <option value="all">選擇國家</option>
                    {/* value之後帶入資料表的值 */}
                    <option value="台灣">台灣</option>
                    <option value="美國">美國</option>
                </select>
            </div>
            <div className="my-place-select">
                <select
                    className="citySelection"
                    value={cityFilter}
                    onChange={(e) => {
                        const nowCity = e.target.value;
                        setCityFilter(nowCity);
                        filtByCountry(countryFilter, nowCity);
                    }}
                >
                    <option value="">選擇城市</option>
                    <option value="台北市">台北市</option>
                    <option value="桃園市">桃園市</option>
                </select>
            </div>
        </>
    );
}

export default PlaceFilterSelect;
