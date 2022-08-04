import NewsCard from './components/NewsCard';
import './StyleNews.scss';
function News() {
    return (
        <>
            <div className="container">
                <div className="header">最新消息</div>
                <div className="ab-bg">
                    <div className="ab-news-box">
                        <div className="ab-news-card-wrap">
                            <NewsCard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default News;
