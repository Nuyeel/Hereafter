import React from 'react';
import { Link } from 'react-router-dom';
// import '../../_xuan_styles.scss';
import '../../_new_eventlist.scss';

import soul from '../../imgs/soul.svg';

// 活動圖片
// import pic01 from '../../../../images/Event/01.svg';

function ProductList(props) {
    const { events } = props;

    return (
        <>
            {events.map((v, i) => {
                return (
                    <Link
                        to={`/events/${v.sid}`}
                        // className="event-card"
                        key={v.sid}
                    >
                        <div className="event-card">
                            <div className="good-cost xuan-body">
                                <img src={soul} alt="" />
                                陰德值：{v.value}
                            </div>

                            <div className="event-type xuan-body">
                                {v.name === '身心障礙' ? '身障' : v.name}
                            </div>

                            <div className="program-type xuan-body">
                                {v.program_type}
                            </div>

                            <div className="event-img">
                                {/* <img src={pic01} alt="" /> */}
                                <img
                                    src={
                                        'http://localhost:3500/event/eventlist/' +
                                        v.img
                                    }
                                    alt=""
                                />
                            </div>

                            <div className="event-title-group">
                                <div className="event_title_bg">
                                    <div className="xuan-title event_title">
                                        {v.act_title}
                                    </div>
                                </div>

                                <div className="event_npo_name">
                                    <span className="xuan-subtitle">
                                        {v.npo_name}
                                    </span>
                                </div>

                                <p className="event-time xuan-subtitle">
                                    活動時間：{v.start}
                                </p>
                            </div>

                            <div className="event-cost  xuan-subtitle">
                                {/* TODO: 手機版先消失 */}
                                <span className="xuan-event-city">
                                    {v.city}
                                </span>
                                <span>${v.price}</span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default ProductList;
