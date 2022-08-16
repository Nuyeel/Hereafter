import { ReactComponent as Ghost } from '../../AboutUsThird/imgs/ghost.svg';
function NameCard(props) {
    return (
        <>
            <div className="ab-box">
                <div className="ab-g-jump">
                    <Ghost className="ab-g-1" />
                    <Ghost className="ab-g-2" />
                    <Ghost className="ab-g-3" />
                    {/* <Ghost /> */}
                </div>
                <div className="ab-pic">
                    <img src={'images/aboutus/' + props.card.pic} alt=""></img>
                </div>
                <div className="ab-text">{props.card.text}</div>
                <div className="ab-name">{props.card.name}</div>
            </div>
        </>
    );
}
export default NameCard;
