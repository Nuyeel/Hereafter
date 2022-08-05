import { useContext, useState, useEffect } from 'react';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import AuthContext from '../../context/AuthContext/AuthContext';
import Carousel from './Carousel';
import './teststyle.scss';
// import './testCard.scss';

// import TestCard from './TestCard';

function Test(props) {
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid, account, token } = useContext(AuthContext);

    // const [shows, setShows] = useState(['block', 'none', 'none']);
    const [shows, setShows] = useState({
        opacity: ['1', '0', '0'],
        height: ['', '0', '0'],
    });

    const score = 9000 + Math.floor(Math.random() * 3000);

    // useEffect(() => {
    //     setHeader(headers[pageName]);
    // }, []);

    return (
        <>
            {/* <div className="show" style={{ display: shows[0] }}> */}
            <div
                className="show"
                style={{
                    opacity: shows.opacity[0],
                    height: shows.height[0],
                }}
            >
                <div className="yun-start">
                    <div className="yun-start-card">
                        <h3>陰德值檢定</h3>
                        <div className="yun-ques">
                            <div>想知道自己攢下了多少陰德值嗎?</div>
                            <div>來好好規劃自己的來世吧！</div>
                        </div>

                        <button
                            onClick={() => {
                                // setShows(['none', 'block', 'none']);
                                setShows({
                                    opacity: ['0', '1', '0'],
                                    height: ['0', '', ''],
                                });
                            }}
                        >
                            測驗開始！
                        </button>
                        <p>
                            貼心提醒：
                            在未知陰德值的狀況下，並沒有辦法在本網站進行消費。
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="show" style={{ display: shows[1] }}> */}
            <div
                className="show"
                style={{
                    opacity: shows.opacity[1],
                    height: shows.height[1],
                }}
            >
                <div className="yun-test">
                    <Carousel setShows={setShows} />
                </div>
            </div>
            {/* <div className="show" style={{ display: shows[2] }}> */}
            <div
                className="show"
                style={{
                    opacity: shows.opacity[2],
                    height: shows.height[2],
                }}
            >
                <div className="yun-start">
                    <div className="yun-start-card">
                        <h3>感謝作答</h3>
                        <div className="yun-ques">
                            <div>您的陰德值為</div>
                            <h3>{score}</h3>
                        </div>

                        <button>規劃我的來世</button>
                        <p>
                            貼心提醒：
                            <br />
                            陰德值可以透過右上icon點擊查看，
                            <br />
                            或者是到會員中心確認。
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Test;
