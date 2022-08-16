import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
//svg
import { ReactComponent as Flag } from './imgs/flag.svg';
import { ReactComponent as Taiwan } from './imgs/taiwan.svg';
import { ReactComponent as Pagearrow } from './imgs/pagearrow.svg';
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
                    <div className="ab-a-bg">
                        <div className="ab-flag">
                            <Flag />
                            <h3 className="ab-title">
                                <i class="fa-solid fa-moon"></i>
                                服務內容
                            </h3>
                        </div>
                        <p>
                            華因，心有白人資奶氣理現在大一牌告元完了腫喉能膨表影噢活並並、賜考前容次憬光？選途字尺檬。版已艱開轉的則扮近近儼每道，蛙。棟指就一橫啊他像她該球當打一文詳？是接東毀的華？
                            <br />
                            興萬論最、代能那今花捍題內？知華因，心有白人資奶氣理現在大一牌告元完了腫喉能膨表影噢活並並、賜考前容次憬光？
                            <br />
                            選途字尺檬。版已艱開轉的則扮近近儼每道，蛙。棟指就一橫啊他像她該球當打一文詳？是接東毀的華？興萬論最、代能那今花捍題內知
                        </p>
                    </div>
                    <div className="ab-a-bg">
                        <div className="ab-flag">
                            <Flag src="./img/flag.svg" />
                            <h3 className="ab-title">
                                <i className="fa-solid fa-location-dot"></i>
                                分佈據點
                            </h3>
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
                </div>
            </div>
        </>
    );
}
export default AboutUsFirst;
