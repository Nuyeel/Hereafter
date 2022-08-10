import { useEffect, useState } from 'react';

function TimeNewsRow({ style }) {
    // 現在時間
    const [nowTime, setNowTime] = useState({
        y: 0,
        m: 0,
        d: 0,
        cDay: '',
        hh: 0,
        mm: 0,
        sec: 0,
    });

    // 現在時間
    const dayList = ['日', '一', '二', '三', '四', '五', '六'];
    useEffect(() => {
        const nowDate = setInterval(() => {
            const now = new Date();

            const y = now.getFullYear();
            const m = now.getMonth() + 1;
            const d = now.getDate();
            const dIndex = now.getDay();
            const hh = now.getHours();
            const mm = now.getMinutes();
            const sec = now.getSeconds();

            const cDay = dayList[dIndex];

            const newNowTime = {
                y: y,
                m: m,
                d: d,
                cDay: cDay,
                hh: hh,
                mm: mm,
                sec: sec,
            };

            setNowTime(newNowTime);
            // console.log(newNowTime);
        }, 1000);
        return () => clearInterval(nowDate);
    }, []);

    return (
        <div className="time-news-row row">
            <div className="col-sm-4 col-12 p-0 pe-2 my-2">
                <div className="time-wrap dark-bg-50" style={style}>
                    <p className="tn-title">現在時間：</p>
                    <p className="time tn">
                        {nowTime.y}年{nowTime.m}月{nowTime.d}日(
                        {nowTime.cDay})
                        {`${nowTime.hh}` < 10
                            ? ` 0${nowTime.hh}`
                            : ` ${nowTime.hh}`}
                        :
                        {`${nowTime.mm}` < 10
                            ? `0${nowTime.mm}`
                            : `${nowTime.mm}`}
                        :
                        {`${nowTime.sec}` < 10
                            ? `0${nowTime.sec}`
                            : `${nowTime.sec}`}
                    </p>
                </div>
            </div>
            <div className="col-sm-8 col-12 p-0 pe-2">
                <div className="news-wrap dark-bg-50" style={style}>
                    <p className="tn-title">最新消息：</p>
                    <p className="news tn">
                        受氣候變遷及戰爭影響，近年全球轉生名額不斷減少。海外轉生訂單需求增加，帶動...
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TimeNewsRow;
