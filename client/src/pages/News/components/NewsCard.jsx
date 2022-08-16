import { ReactComponent as Email } from '../imgs/email.svg';
import { NEWS_MAIL } from '../../../config/ajax-path';

function NewsCard(props) {
    const handleSendMail = async () => {
        fetch(NEWS_MAIL, {
            method: 'POST',
            body: JSON.stringify(props.card),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((result) => {
                console.log(result);
            });
    };
    return (
        <div
            className="ab-card-tag-wrap d-flex"
            onClick={(e) => {
                if (e.target.closest('div').classList.contains('ab-mail')) {
                    handleSendMail();
                } else {
                    props.handleClickChild(props.card.sid);
                }
            }}
        >
            <div className="ab-news-card">
                <div className="ab-news-type">
                    <p>{props.card.type}</p>
                </div>
                <div className="ab-news-title">{props.card.topic}</div>
                <div className="ab-news-img-wrap">
                    <img
                        src={'http://localhost:3500/news/' + props.card.img}
                        alt=""
                    />
                    {/* <img src={'images/news/' + props.card.img} alt="" /> */}
                </div>
                <div className="ab-news-content-wrap">
                    <p className="ab-news-content">{props.card.content}</p>
                </div>
                <p className="ab-news-date">發布時間 {props.card.time}</p>
                <div className="ab-mail">
                    <Email />
                    <p>寄送電子報</p>
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
