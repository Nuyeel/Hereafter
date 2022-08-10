// import { useContext, useEffect } from 'react';

import NewsCard from './components/NewsCard';
import './StyleNews.scss';
import newsData from './data/newsData.json';
// import PopCard from './components/PopCard';

function News() {
    // const [newsData, setNewsData] = useState([]);

    // useEffect(() => {
    //     //axios

    //     setNewsData(newsDatas);
    // }, []);

    return (
        <>
            <div className="container">
                <div className="header">最新消息</div>
                <div className="ab-bg-wrap">
                    {/*<PopCard />*/}
                    <div className="ab-news-bg">
                        <div className="ab-news-box">
                            <div className="ab-news-card-wrap">
                                <div className="ab-fake"></div>
                                {newsData.news.map((v, i) => {
                                    return <NewsCard key={v.sid} card={v} />;
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
