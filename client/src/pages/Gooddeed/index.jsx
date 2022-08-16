import { useContext, useState, useEffect } from 'react';
// 會員登入context
import AuthContext from '../../context/AuthContext/AuthContext';
//載入資料
//TODO:後端修改資料獲取
import axios from 'axios';
import { API_GOODDEED_GET } from '../../config/ajax-path';
// 標題（不會用）
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
// 子曾元件和css
import Carousel from './Carousel';
import './teststyle.scss';
import { useNavigate } from 'react-router-dom';

function Gooddeed(props) {
    const { pageName, setUserGooddeed } = props;
    const { setHeader } = useContext(HeaderContext);
    const navigate = useNavigate();
    const backtoAbout = () => {
        navigate('/AboutUsThird', { replace: true });
    };
    const { authorized, sid, account, token } = useContext(AuthContext);
    const [shows, setShows] = useState({
        opacity: ['1', '0', '0'],
        height: ['', '0', '0'],
    });

    // 確定有沒有陰德值
    // const [haveScore, setHaveScore] = useState(true);
    const [haveScore, setHaveScore] = useState(false);

    // const randomscore = 9000 + Math.floor(Math.random() * 3000);

    const [randomScore, setRandomScore] = useState(0);

    const [score, setScore] = useState(0);

    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    useEffect(() => {
        const getGooddeedData = async () => {
            // console.log('authContext:', authorized, sid, account, token);
            const r = await fetch(`${API_GOODDEED_GET}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const rows = await r.json();
            console.log(rows[0].gooddeed_score);
            if (rows[0].gooddeed_score) {
                setHaveScore(true);
                setScore(rows[0].gooddeed_score);
            }
        };

        getGooddeedData();
    }, []);

    const TestResult = (
        <>
            {/* 測驗結果頁 */}
            <div
                className="yun-show"
                style={{
                    opacity: shows.opacity[0],
                    height: shows.height[0],
                }}
            >
                <div className="yun-start">
                    <div className="yun-start-card">
                        <h3>{account}您已經測驗過了！</h3>
                        <div className="yun-ques">
                            <div>您的陰德值為</div>
                            {/*TODO:後端取得既有分數*/}
                            {score ? <h3>{score}</h3> : ''}
                        </div>

                        <button onClick={backtoAbout}>規劃我的來世</button>
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
    const TestStart = (
        <>
            {/* 開始測驗頁 */}
            <div
                className="yun-show"
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
                className="yun-show"
                style={{
                    opacity: shows.opacity[1],
                    height: shows.height[1],
                }}
            >
                <div className="yun-test">
                    <Carousel
                        setShows={setShows}
                        setRandomScore={setRandomScore}
                        setUserGooddeed={setUserGooddeed}
                    />
                </div>
            </div>
            {/* 測驗結果頁 */}
            <div
                className="yun-show"
                style={{
                    opacity: shows.opacity[2],
                    height: shows.height[2],
                }}
            >
                <div className="yun-start">
                    <div className="yun-start-card">
                        <h3>感謝作答</h3>
                        <div className="yun-ques">
                            {/*TODO:加入使用者的名字*/}
                            <div>{account}您的陰德值為</div>
                            {/*TODO:給予新的亂數分數 並且送到後端資料庫*/}
                            <h3>{randomScore}</h3>
                        </div>

                        <button onClick={backtoAbout}>規劃我的來世</button>
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

    return <>{haveScore ? TestResult : TestStart}</>;
}

export default Gooddeed;
