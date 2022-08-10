import { ReactComponent as Close } from '../imgs/close.svg';
function PopCard(props) {
    return (
        <>
            <div
                className="ab-popup"
                style={{ display: props.popShow ? 'block' : 'none' }}
            >
                <div className="ab-pop-card">
                    <Close className="ab-pop-close" />
                    <div className="ab-pop-tag-wrap d-flex">
                        {/* {props.popData.tag.map((v, i) => {
                            return (
                                <div
                                    key={i}
                                    className={'ab-tag ab-color' + (i % 3)}
                                >
                                    <p>#{v}</p>
                                </div>
                            );
                        })} */}
                    </div>
                    <div className="ab-pop-title">{props.popData.topic}</div>
                    <div className="ab-pop-img-wrap">
                        <img src={'images/news/' + props.popData.img} alt="" />
                    </div>
                    <p className="ab-pop-content">{props.popData.content}</p>
                    <p className="ab-pop-time">{props.popData.time}</p>
                    <div className="ab-pop-type">
                        <p>{props.popData.type}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PopCard;
