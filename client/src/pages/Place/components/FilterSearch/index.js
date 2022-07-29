import React, { useState } from "react";

// import { BsFillCaretDownFill } from "react-icons/bs";
import PlaceFilterSelect from "./PlaceFilterSelect";
import TimeFilter from "./TimeFilter";

function FilterSearch(props) {
    const {
        rawPlaceData,
        setPlaceDisplay,
        countryFilter,
        setCountryFilter,
        cityFilter,
        setCityFilter,
        timeRangeFilter,
        setTimeRangeFilter,
        filtByCountry,
        filtByTimeRange,
        // checkedcity,
        // setCheckedCity,
    } = props;

    // hover 換 class
    // const [countryMenuHover, setCoutryMenuHover] = useState(false);
    // const handleCountryMenuEnter = () => {
    //     setCoutryMenuHover(true);
    // };
    // const handleCountryMenuLeave = () => {
    //     setCoutryMenuHover(false);
    // };

    // 城市勾選
    // const handleCityChecked = (e) => {
    //     const value = e.value;
    //     if (!checkedcity.includes(value))
    //         return setCheckedCity([...checkedcity, value]);

    //     if (checkedcity.includes(value)) {
    //         const newCheckedCity = checkedcity.filter((v) => v !== value);
    //         setCheckedCity(newCheckedCity);
    //     }
    // };

    return (
        <>
            <div className="filter-search">
                <div className="filter-wrap">
                    <div className="place-filter">
                        <PlaceFilterSelect
                            countryFilter={countryFilter}
                            setCountryFilter={setCountryFilter}
                            cityFilter={cityFilter}
                            setCityFilter={setCityFilter}
                            rawPlaceData={rawPlaceData}
                            filtByCountry={filtByCountry}
                            setPlaceDisplay={setPlaceDisplay}
                        />
                    </div>
                </div>
                <div className="filter-wrap">
                    <TimeFilter
                        timeRangeFilter={timeRangeFilter}
                        setTimeRangeFilter={setTimeRangeFilter}
                        filtByTimeRange={filtByTimeRange}
                    />
                </div>
            </div>
        </>
    );
}

export default FilterSearch;
