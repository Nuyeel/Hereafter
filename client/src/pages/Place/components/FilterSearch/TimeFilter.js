import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/DateRangePicker';
import Calendar from 'react-calendar';

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

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
                        console.log(nowValue);
                    }}
                    value={timeRangeFilter}
                    calendarClassName="myCalendar"
                    clearIcon={null}
                    minDate={new Date('2022-8')}
                />
            </div>
        </>
    );
}

export default TimeFilter;
