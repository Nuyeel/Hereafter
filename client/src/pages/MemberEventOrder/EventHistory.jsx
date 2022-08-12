import { useEffect, useState, useContext, Fragment } from 'react';
import axios from 'axios';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';

// 測試用scss
import './_xuan_event_order.scss';
import '../Event/_xuan_styles.scss';
import { now } from 'lodash';

function EventHistory() {
    const { sid } = useContext(AuthContext); //取得登入會員sid

    const [eventHistory, setEventHistory] = useState([]);

    // 一進頁面就跟MySQL拿活動歷史資料
    const fetchMemberEventHistory = async () => {
        const response = await axios.get(
            // `http://localhost:3500/eventcarts/memberevent/${sid}`
            `http://localhost:3500/eventcarts/testevent/${sid}`
        );

        // console.log(response.data);
        setEventHistory(response.data); //讓component進入DidUpdate階段
    };

    // console.log('訂單紀錄', eventHistory);

    // 防止無窮迴圈
    useEffect(() => {
        fetchMemberEventHistory();
        // fetchOrderHistory();
    }, [sid]);

    return (
        <>
            <div className="xuan-event-history-container">
                {/* 將訂單細項從字串轉為陣列 */}
                {eventHistory.length &&
                    eventHistory.map((v, i) => {
                        return (
                            <Fragment key={v.event_order_sid}>
                                {/* 存放每一筆訂單的大框框 */}
                                <div className="xuan-event-history-item">
                                    {/* 放該筆訂單的編號、時間 */}
                                    <div className="d-flex">
                                        <p className="xuan-subtitle">
                                            No.
                                            {v.event_order_sid}
                                        </p>
                                        <p className="xuan-body">
                                            日期：
                                            {v.order_created_at}
                                        </p>
                                    </div>

                                    <div className="xuan-event-history-list">
                                        {v.eventdetail.map((v, i) => {
                                            return (
                                                <div
                                                    key={v.start}
                                                    className="xuan-member-event-detail d-flex"
                                                >
                                                    <div>
                                                        <img
                                                            src={
                                                                'http://localhost:3500/event/eventlist/' +
                                                                v.img
                                                            }
                                                            alt=""
                                                        />
                                                    </div>

                                                    <div className="xuan-member-event-main ">
                                                        <div className="d-flex xuan-member-event-title">
                                                            <p>
                                                                {v.program_type}
                                                            </p>
                                                            <p className="xuan-subtitle">
                                                                {v.act_title}
                                                            </p>
                                                        </div>

                                                        <div className="d-flex">
                                                            <p>{v.start}</p>
                                                            <p>
                                                                {v.start_time}
                                                            </p>
                                                        </div>

                                                        <p>
                                                            {v.place_location}
                                                        </p>
                                                    </div>

                                                    <p>NT${v.price}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
            </div>
        </>
    );
}

export default EventHistory;
