function NameCard(props) {
    return (
        <>
            <div className="ab-box">
                <div className="ab-pic">
                    <img src={'images/newsimgs/' + props.card.pic} alt=""></img>
                </div>
                <div className="ab-text">{props.card.text}</div>
                <div className="ab-name">{props.card.name}</div>
            </div>
        </>
    );
}
export default NameCard;
