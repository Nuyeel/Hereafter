import { useContext, useEffect, useState } from 'react';
import HeaderContext, {
    headers,
} from '../../context/HeaderContext/HeaderContext';
//components
import NewsCard from './components/NewsCard';
import './StyleNews.scss';
import PopCard from './components/PopCard';
//data
import newsDataJson from './data/newsData.json';
import Chat from '../../components/Chat/Chat';

function News(props) {
    const [newsData, setNewsData] = useState([]);
    const [popData, setPopData] = useState({});
    const [popShow, setShow] = useState(false);
    const { pageName } = props;
    const { setHeader } = useContext(HeaderContext);
    const typeArray = ['新聞', '造型', '時間', '地點'];

    useEffect(() => {
        setHeader(headers[pageName]);
        setNewsData(newsDataJson.news);
    }, []);

    // useEffect(() => {
    //     //axios

    //     setNewsData(newsDatas);
    // }, []);

    const handleClickParent = (sid) => {
        let tempData = newsData.find((item) => {
            return item.sid === sid;
        });
        setPopData(tempData);
        setShow(true);
    };

    const handleFilter = (type) => {
        let tempData = [...newsDataJson.news];
        tempData = tempData.filter((v) => {
            return v.type === type;
        });
        setNewsData(tempData);
    };

    return (
        <>
            <div className="container">
                <Chat />
                <div className="ab-news-filter-wrap">
                    {typeArray.map((v, i) => {
                        return (
                            <div
                                key={i}
                                className="ab-news-filter"
                                onClick={() => {
                                    handleFilter(v);
                                }}
                            >
                                {v}
                            </div>
                        );
                    })}
                </div>

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
                                {newsData.map((v, i) => {
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
