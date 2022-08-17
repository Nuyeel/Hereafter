import { useContext, useEffect } from 'react';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
import { Link } from 'react-router-dom';
import './StyleThird.scss';
//svg
import { ReactComponent as Arrow } from './imgs/arrow.svg';
import { ReactComponent as Ghost } from './imgs/ghost.svg';
import { ReactComponent as Pagearrow } from './imgs/pagearrow.svg';
import Chat from '../../components/Chat/Chat';

function AboutUsThird(props) {
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);

    useEffect(() => {
        setHeader(headers[pageName]);
    }, []);
    return (
        <>
            <div class="container">
                <Chat />
                <div className="ab-third-wrap">
                    <div class="ab-hint-wrap">
                        <Link class="ab-hint-l-wrap" to="/news">
                            <div class="ab-ghost-a">
                                <Ghost class="ab-ghost-l1" width="43px" />
                                <Ghost class="ab-ghost-l2" width="23px" />
                                <Ghost class="ab-ghost-l3" width="18px" />
                            </div>
                            <div className="ab-hint-l">
                                <i class="fa-solid fa-star"></i>
                                查看轉生最新消息與活動
                            </div>
                            <div class="ab-hint-arrow"></div>
                        </Link>

                        <Link class="ab-hint-m" to="/memberprofile">
                            <div className="ab-ghost-c">
                                <Ghost class="ab-ghost-m1" width="43px" />
                                <Ghost class="ab-ghost-m2" width="21px" />
                                <Ghost class="ab-ghost-m3" width="21px" />
                            </div>
                            <i class="fa-solid fa-star"></i>
                            查看前世紀錄與陰德值
                        </Link>

                        <Link class="ab-hint-r" to="/games">
                            <div className="ab-ghost-b">
                                <Ghost class="ab-ghost-r1" width="43px" />
                                <Ghost class="ab-ghost-r2" width="21px" />
                            </div>
                            <i class="fa-solid fa-star"></i>
                            陰德值不夠嗎？
                        </Link>
                    </div>
                    <div class="ab-bg">
                        <Link to="/aboutusfirst">
                            <Pagearrow className="ab-page-arrow" />
                        </Link>
                        <div class="ab-card-wrap">
                            <div class="ab-card">
                                <div class="ab-c-step">步驟.1</div>
                                <div class="ab-c-pic">
                                    <div className="ab-c-pic-wrap">
                                        <img
                                            src={require('./imgs/step01.png')}
                                            alt="step01"
                                        />
                                    </div>
                                </div>
                                <div class="ab-c-text">
                                    請先在轉生形象服務區挑選您來生的外在形象
                                </div>
                                <div class="ab-c-btn-wrap d-flex mt-3">
                                    <Arrow
                                        class="ab-arrow"
                                        src="./img/Arrow.svg"
                                        alt=""
                                    />
                                    <Link class="ab-c-btn" to="/showcase">
                                        裝扮去！
                                    </Link>
                                </div>
                            </div>

                            <div class="ab-card">
                                <div class="ab-c-step">步驟.2</div>
                                <div class="ab-c-pic">
                                    <div className="ab-c-pic-wrap-2">
                                        <img
                                            src={require('./imgs/step02.png')}
                                            alt="step02"
                                        />
                                    </div>
                                </div>
                                <div class="ab-c-text ab-g">
                                    接著請在良辰吉地選擇來生想轉生的時間與地點
                                </div>
                                <div class="ab-c-btn-wrap d-flex mt-3">
                                    <Arrow
                                        class="ab-arrow"
                                        src="./img/Arrow.svg"
                                        alt=""
                                    />
                                    <Link class="ab-c-btn ab-g" to="/place">
                                        挑個家！
                                    </Link>
                                </div>
                            </div>

                            <div class="ab-card">
                                <div class="ab-c-step">步驟.3</div>
                                <div class="ab-c-pic">
                                    <div className="ab-c-pic-wrap-3">
                                        <img
                                            src={require('./imgs/step03.png')}
                                            alt="step03"
                                        />
                                    </div>
                                </div>
                                <div class="ab-c-text ab-b">
                                    結帳！獲得全新的外型後就可以投胎到喜歡的地點囉！
                                </div>
                                <div class="ab-c-btn-wrap d-flex mt-3">
                                    <Arrow
                                        class="ab-arrow"
                                        src="./img/Arrow.svg"
                                        alt=""
                                    />
                                    <Link
                                        class="ab-c-btn ab-b"
                                        to="/reborn-cart"
                                    >
                                        結帳囉！
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUsThird;
