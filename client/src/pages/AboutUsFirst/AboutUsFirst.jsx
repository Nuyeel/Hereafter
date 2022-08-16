import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
//svg
import { ReactComponent as Flag } from './imgs/flag.svg';
import { ReactComponent as Taiwan } from './imgs/taiwan.svg';
import { ReactComponent as Pagearrow } from './imgs/pagearrow.svg';
import { ReactComponent as Star } from './imgs/star.svg';
import { ReactComponent as StarS } from './imgs/star-s.svg';
import { ReactComponent as Ghost } from '../AboutUsThird/imgs/ghost.svg';
import './StyleFirst.scss';

function AboutUsFirst(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);

    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);

    return (
        <>
            <div className="container">
                <div className="ab-a-bg-wrap">
                    <Link to="/aboutussecond">
                        <Pagearrow className="ab-page-arrow" />
                    </Link>
                    <div className="ab-bg-b">
                        <div className="ab-flag">
                            <Flag src="./img/flag.svg" />
                            <h3 className="ab-title">
                                <i className="fa-solid fa-location-dot"></i>
                                分佈據點
                            </h3>
                        </div>
                        <div className="ab-star-twinkle">
                            <StarS className="ab-star-a" width="20px" />
                            <StarS className="ab-star-b" width="15px" />
                            <StarS className="ab-star-c" width="30px" />
                            <StarS className="ab-star-d" width="25px" />
                            <StarS className="ab-star-e" width="18px" />
                            <StarS className="ab-star-f" width="30px" />
                            <StarS className="ab-star-g" width="50px" />
                        </div>
                        <div className="ab-star-wrap">
                            <Star className="ab-star" />
                        </div>

                        <Taiwan
                            className="ab-t-logo"
                            src="./img/taiwan.svg"
                            alt="#/"
                        />
                        <div className="ab-line-1">
                            <div className="ab-c1">高雄</div>
                        </div>
                        <div className="ab-line-2">
                            <div className="ab-c2">台南</div>
                        </div>
                        <div className="ab-line-3">
                            <div className="ab-c3">台中</div>
                        </div>
                        <div className="ab-line-4">
                            <div className="ab-c4">新竹</div>
                        </div>
                        <div className="ab-line-5">
                            <div className="ab-c5">台北</div>
                        </div>
                    </div>
                    <div className="ab-bg-a">
                        <div className="ab-flag">
                            <Flag />
                            <h3 className="ab-title">
                                <i className="fa-solid fa-moon"></i>
                                服務內容
                            </h3>
                        </div>
                        <p>
                            當生命走向盡頭的那刻，回歸靈魂狀態，在度過三途川、在喝下孟婆湯之前，都會看到這樣的一個網站，在此決
                            定進入下個來生的樣貌，留下最後對於今生的記憶...你相信嗎？你是否曾想過，你不僅可以決定下輩子出生的
                            時間地點，也能趁還在世時日行一善將功折過...
                        </p>
                        <p>
                            投放所提供你選擇來生樣貌與投胎時間地點的機會，你可以選擇喜愛的外表，若陰德值不夠則可透過參加活動累積陰德德。
                            <br />
                            若你已結束了此生，也可透過小遊戲連接陽介提升少許陰德值。
                        </p>
                        <div className="ab-a-wrap">
                            <img
                                className="ab-body02"
                                src={require('./imgs/a02.png')}
                                alt="bodybottom"
                            />
                            <Ghost className="ab-body03" />

                            <img
                                className="ab-body01"
                                src={require('./imgs/a01.png')}
                                alt="bodytop"
                            />
                            <Star className="ab-body04" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AboutUsFirst;
