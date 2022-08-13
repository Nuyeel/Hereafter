import { useEffect, useState, useContext, Fragment } from 'react';
import axios from 'axios';

import ThemeContext, { themes } from '../../context/ThemeContext/ThemeContext';
import AuthContext from '../../context/AuthContext/AuthContext';

// 測試用scss
import './_xuan_event_order.scss';
import '../Event/_xuan_styles.scss';
import { now } from 'lodash';

function EventHistory(props) {
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

                {/* TODO: 這邊放如果沒有購物紀錄會顯示的文字 */}
                {/* FIXME: 尚未修 CSS */}
                {!eventHistory.length ? (
                    <p>您尚未有購買紀錄</p>
                ) : (
                    eventHistory.length &&
                    eventHistory.map((v, i) => {
                        return (
                            <Fragment key={v.event_order_sid}>
                                {/* 存放每一筆訂單的大框框 */}
                                <div className="xuan-event-history-item">
                                    {/* 放該筆訂單的編號、時間 */}
                                    <div className="d-flex">
                                        <p className="xuan-subtitle xuan-member-num member-page-title">
                                            No.
                                            {v.event_order_sid}
                                        </p>
                                        <p className="xuan-body member-event-field">
                                            成立日期：
                                            {v.order_created_at}
                                        </p>
                                    </div>

                                    {/* 每筆訂單的詳細內容放這邊 */}
                                    <div className="xuan-event-history-list">
                                        {v.eventdetail.map((v, i) => {
                                            return (
                                                <div
                                                    key={v.start}
                                                    className="xuan-member-event-detail"
                                                >
                                                    <div className="xuan-member-event-detai-img">
                                                        <img
                                                            src={
                                                                'http://localhost:3500/event/eventlist/' +
                                                                v.img
                                                            }
                                                            alt=""
                                                        />
                                                    </div>

                                                    <div className="xuan-member-event-main">
                                                        <div className=" xuan-member-event-title">
                                                            <p className="member-event-type">
                                                                {v.program_type}
                                                            </p>
                                                            <p className=" member-page-field">
                                                                {v.act_title}
                                                            </p>
                                                        </div>

                                                        <div className="d-flex">
                                                            <div>
                                                                <p className="xuan-day member-event-info-2">
                                                                    {' '}
                                                                    {
                                                                        v.start
                                                                    }{' '}
                                                                    {
                                                                        v.start_time
                                                                    }{' '}
                                                                </p>

                                                                <p className="member-event-info-2">
                                                                    {
                                                                        v.place_location
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="member-event-info">
                                                            NT${v.price}
                                                        </p>{' '}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })
                )}
            </div>
        </>
    );
}

export default EventHistory;
