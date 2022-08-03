import { useContext, useEffect } from 'react';
// import HeaderContext, { headers } from '../../context/HeaderContext/HeaderContext';
import AuthContext from '../../context/AuthContext/AuthContext';

// import '../../styles/variables.scss';

import TestCard from './TestCard';

function Test(props) {
    const { pageName } = props;
    // const { setHeader } = useContext(HeaderContext);
    const { authorized, sid, account, token } = useContext(AuthContext);

    // useEffect(() => {
    //     setHeader(headers[pageName]);
    // }, []);
    return (
        <>
            {/* <div className="container">
                {authorized ? <p>我有登入</p> : <p>我沒登入</p>}
            </div> */}
            <div className="yun-steps">
                <div></div>
            </div>
            <div className="yun-card-container">
                <div className="yun-card">
                    <h3>陰德值檢定</h3>
                    <div className="yun-ques">
                        <div>想知道自己攢下了多少陰德值嗎?</div>
                        <div>測定後就可以好好規劃自己的來世！</div>
                    </div>

                    <button>測驗開始！</button>
                    <p>
                        貼心提醒：
                        在未知陰德值的狀況下，並沒有辦法在本網站進行消費。
                    </p>
                </div>
                <TestCard />
            </div>
        </>
    );
}

export default Test;
