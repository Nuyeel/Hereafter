function NameCard(props) {
    return (
        <>
            <div className="ab-box">
                <div className="ab-pic">{props.card.pic}</div>
                <div className="ab-text">{props.card.text}</div>
                <div className="ab-name">{props.card.name}</div>
            </div>
        </>
    );
}
export default NameCard;
