import './StyleThird.scss';
import { ReactComponent as Arrow } from './imgs/arrow.svg';
import { ReactComponent as Ghost } from './imgs/ghost.svg';
import { Link } from 'react-router-dom';
function AboutUsThird() {
    return (
        <>
            <div class="container">
                <div className="header">轉生3步驟</div>
                <div class="ab-hint-wrap">
                    <Link class="ab-hint-l-wrap" to="#/">
                        <div className="ab-hint-l">
                            <i class="fa-solid fa-star"></i>
                            查看轉生最新消息與活動
                        </div>
                        <div class="ab-hint-arrow"></div>
                    </Link>

                    <Link class="ab-hint-m" to="#/">
                        <i class="fa-solid fa-star"></i>
                        查看前世紀錄與陰德值
                    </Link>

                    <Link class="ab-hint-r" to="#/">
                        <i class="fa-solid fa-star"></i>
                        陰德值不夠嗎？
                    </Link>
                </div>
                <div class="ab-bg">
                    <div class="ab-ghost">
                        <Ghost class="ab-ghost-l1" width="43px" />
                        <Ghost class="ab-ghost-l2" width="23px" />
                        <Ghost class="ab-ghost-l3" width="18px" />
                        <Ghost class="ab-ghost-r1" width="43px" />
                        <Ghost class="ab-ghost-r2" width="21px" />
                    </div>

                    <div class="ab-card-wrap">
                        <div class="ab-card">
                            <div class="ab-c-step">步驟.1</div>
                            <div class="ab-c-pic"></div>
                            <div class="ab-c-text">
                                請先在轉生形象服務區挑選您來生的外在形象
                            </div>
                            <div class="ab-c-btn-wrap d-flex mt-3">
                                <Arrow
                                    class="ab-arrow"
                                    src="./img/Arrow.svg"
                                    alt=""
                                />
                                <div class="ab-c-btn">裝扮去！</div>
                            </div>
                        </div>

                        <div class="ab-card">
                            <div class="ab-c-step">步驟.2</div>
                            <div class="ab-c-pic"></div>
                            <div class="ab-c-text ab-g">
                                接著請在良辰吉地選擇來生想轉生的時間與地點
                            </div>
                            <div class="ab-c-btn-wrap d-flex mt-3">
                                <Arrow
                                    class="ab-arrow"
                                    src="./img/Arrow.svg"
                                    alt=""
                                />
                                <div class="ab-c-btn ab-g">挑個家！</div>
                            </div>
                        </div>

                        <div class="ab-card">
                            <div class="ab-c-step">步驟.3</div>
                            <div class="ab-c-pic"></div>
                            <div class="ab-c-text ab-b">
                                結帳！獲得全新的外型後就可以抬胎到喜養中的地點囉！
                            </div>
                            <div class="ab-c-btn-wrap d-flex mt-3">
                                <Arrow
                                    class="ab-arrow"
                                    src="./img/Arrow.svg"
                                    alt=""
                                />
                                <div class="ab-c-btn ab-b">結帳囉！</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUsThird;
