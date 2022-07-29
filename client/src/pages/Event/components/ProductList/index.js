import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../styles/index.scss';
import '../../_xuan_styles.scss';

import soul from '../../imgs/soul.svg';
import location from '../../imgs/location.png';



function ProductList(props) {
    const { events } = props;

    return (
        <>
            {events.map((v, i) => {
                return (
                    <Link
                        to={`/events/${v.sid}`}
                        className="event-card"
                        key={v.sid}
                    >
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

                        <div className="event-img"></div>

                        <div className="event_title_bg">
                            <span className="xuan-title event_title">
                                {v.act_title}
                            </span>
                        </div>

                        <div className="event_npo_name">
                            <span className="xuan-subtitle">{v.npo_name}</span>
                        </div>
                        <p className="event-time xuan-subtitle">
                            活動時間：{v.start}
                        </p>

                        <div className="event-cost  xuan-subtitle">
                        <span> {v.city}</span>
                        <span>${v.price}</span>
                        </div>
                    </Link>
                );
            })}
        </>
    );
}

export default ProductList;
