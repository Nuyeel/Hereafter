import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";

function TimeFilter(props) {
    const { timeRangeFilter, setTimeRangeFilter, filtByTimeRange } = props;

    return (
        <>
            <div className="time-filter">
                <DateRangePicker
                    maxDetail="year"
                    onChange={(v) => {
                        const nowValue = v;
                        setTimeRangeFilter(nowValue);
                        filtByTimeRange(nowValue);
                    }}
                    value={timeRangeFilter}
                />
            </div>
        </>
    );
}

export default TimeFilter;
