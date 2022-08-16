import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/DateRangePicker';
import Calendar from 'react-calendar';

import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';

function TimeFilter(props) {
    const { timeRangeFilter, setTimeRangeFilter } = props;

    return (
        <>
            <div className="time-filter">
                <DateRangePicker
                    maxDetail="year"
                    onChange={(v) => {
                        const nowValue = v;
                        if (nowValue === null) {
                            // 清空時間區間 => 呈現所有資料,不篩選
                            setTimeRangeFilter(null);
                        } else {
                            setTimeRangeFilter(nowValue);
                            // console.log(nowValue);
                        }
                        // filtByTimeRange(nowValue);
                    }}
                    value={timeRangeFilter}
                    calendarClassName="myCalendar"
                    // clearIcon={null}
                    minDate={new Date('2022-8')}
                />
            </div>
        </>
    );
}

export default TimeFilter;
