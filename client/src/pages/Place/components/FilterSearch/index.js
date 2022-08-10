import PlaceFilterSelect from './PlaceFilterSelect';
import TimeFilter from './TimeFilter';

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
        countryFilterData,
    } = props;

    return (
        <>
            <div className="filter-wrap col-12 col-sm-2">
                <div className="place-filter">
                    <PlaceFilterSelect
                        countryFilter={countryFilter}
                        setCountryFilter={setCountryFilter}
                        cityFilter={cityFilter}
                        setCityFilter={setCityFilter}
                        rawPlaceData={rawPlaceData}
                        filtByCountry={filtByCountry}
                        setPlaceDisplay={setPlaceDisplay}
                        countryFilterData={countryFilterData}
                    />
                </div>
            </div>
            <div className="filter-wrap col-12 col-sm-3">
                <TimeFilter
                    timeRangeFilter={timeRangeFilter}
                    setTimeRangeFilter={setTimeRangeFilter}
                    filtByTimeRange={filtByTimeRange}
                />
            </div>
        </>
    );
}

export default FilterSearch;
