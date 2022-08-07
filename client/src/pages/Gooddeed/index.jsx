import { useContext, useState, useEffect } from 'react';
// 會員登入context
import AuthContext from '../../context/AuthContext/AuthContext';
//載入資料
//TODO:修改資料獲取
import axios from 'axios';
import { GET_GOODDEED_API } from '../../config/ajax-path';
// 標題（不會用）
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
// 子曾元件和css
import Carousel from './Carousel';
import './teststyle.scss';

function Gooddeed(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);
    const { authorized, sid, account, token } = useContext(AuthContext);
    const [shows, setShows] = useState({
        opacity: ['1', '0', '0'],
        height: ['', '0', '0'],
    });

    // 確定有沒有陰德值
    // const [haveScore, setHaveScore] = useState(true);
    const [haveScore, setHaveScore] = useState(false);

    const randomscore = 9000 + Math.floor(Math.random() * 3000);
    const [newscore, setNewScore] = useState(0);

    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    const testResult = (
        <>
            {/* 測驗結果頁 */}
            <div
                className="show"
                style={{
                    opacity: shows.opacity[2],
                    height: shows.height[2],
                }}
            >
                <div className="yun-start">
                    <div className="yun-start-card">
                        <h3>你已經測驗過了！</h3>
                        <div className="yun-ques">
                            <div>您的陰德值為</div>
                            <h3>{newscore}</h3>
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
    const testStart = (
        <>
            {/* 開始測驗頁 */}
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
            {/* 題目頁面 */}
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
            {/* 測驗結果頁 */}
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
                            <h3>{randomscore}</h3>
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

    // (authorized ? 呈現頁面 :跳轉到登入頁)
    // authCOntext.sid 可以抓取後端資料吧？
    // fetch 資料出來
    // 會員sid => authContext
    //TODO:修改資料獲取
    // const getGooddeedData = async () => {
    //     console.log('authContext:', authorized, sid, account, token);
    //     const r = await fetch(`${GET_GOODDEED_API}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'Application/json',
    //             Authorization: token,

    //         }
    //         .then(res =>res.json())
    //     });
    //     const rows = await r.json();
    //     console.log(rows);
    //     setHaveScore(false);
    // };
    // useEffect(() => {
    //     getGooddeedData();
    // }, []);

    return <>{haveScore ? testResult : testStart}</>;
}

export default Gooddeed;
