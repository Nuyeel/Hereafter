import { useState } from 'react';
import NewsCard from './components/NewsCard';
import './StyleNews.scss';
import newsData from './data/newsData.json';
import PopCard from './components/PopCard';

function News() {
    // const [newsData, setNewsData] = useState([]);
    const [popData, setPopData] = useState({});
    const [popShow, setShow] = useState(false);

    // useEffect(() => {
    //     //axios

    //     setNewsData(newsDatas);
    // }, []);
    const handleClickParent = (sid) => {
        let tempData = newsData.news.find((item) => {
            return item.sid === sid;
        });
        setPopData(tempData);
        setShow(true);
    };

    return (
        <>
            <div className="container">
                <div className="header">最新消息</div>
                <div className="ab-bg-wrap">
                    <PopCard
                        popData={popData}
                        popShow={popShow}
                        setShow={setShow}
                    />
                    <div className="ab-news-bg">
                        <div className="ab-news-box row">
                            <div
                                className={
                                    'ab-pop-fake ' + (popShow ? 'col-6' : '')
                                }
                            ></div>
                            <div
                                className={
                                    'ab-news-card-wrap ' +
                                    (popShow ? 'col-6' : 'col-12')
                                }
                                style={{ columnCount: popShow ? 2 : 4 }}
                            >
                                <div className="ab-fake"></div>
                                {newsData.news.map((v, i) => {
                                    return (
                                        <NewsCard
                                            handleClickChild={handleClickParent}
                                            key={v.sid}
                                            card={v}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default News;
