function NewsCard(props) {
    return (
        <div
            className="ab-card-tag-wrap d-flex"
            onClick={() => {
                props.handleClickChild(props.card.sid);
            }}
        >
            <div className="ab-news-card">
                <div className="ab-news-title">{props.card.topic}</div>
                <div className="ab-news-img-wrap">
                    <img src={'images/news/' + props.card.img} alt="" />
                </div>
                <p className="ab-news-content">{props.card.content}</p>
                <p className="ab-news-date">{props.card.time}</p>
                <div className="ab-news-type">
                    <p>{props.card.type}</p>
                </div>
            </div>
            <div className="ab-tag-wrap flex-wrap">
                {props.card.tag.map((v, i) => {
                    return (
                        <div
                            key={i}
                            className={'ab-news-tag ab-color' + (i % 3)}
                        >
                            <p>#{v}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default NewsCard;
