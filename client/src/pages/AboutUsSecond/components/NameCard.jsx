import { ReactComponent as Ghost } from '../../AboutUsThird/imgs/ghost.svg';
function NameCard(props) {
    const getRandom = (min, max) => {
        return Math.floor(Math.random() * max) + min;
    };
    const random = getRandom(0, 2);

    return (
        <>
            <div className="ab-box">
                <div className="ab-g-jump">
                    {/* 分開亂數 */}
                    <Ghost className={'ab-g-a' + getRandom(0, 2)} />
                    <Ghost className={'ab-g-b' + getRandom(0, 2)} />
                    <Ghost className={'ab-g-c' + getRandom(0, 2)} />
                    <Ghost className={'ab-g-a' + getRandom(0, 2)} />
                    <Ghost className={'ab-g-b' + getRandom(0, 2)} />
                    <Ghost className={'ab-g-c' + getRandom(0, 2)} />
                    {/* 一組一起變 */}
                    {/* <Ghost className={'ab-g-a' + random} />
                    <Ghost className={'ab-g-b' + random} />
                    <Ghost className={'ab-g-c' + random} /> */}
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
