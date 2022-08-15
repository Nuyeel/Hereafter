import './NextLifeStageIndicator.scss';

function NextLifeStageIndicator(props) {
    const { nextLifeStage } = props;
    return (
        <div className="container cpl-ncf-container">
            <div
                className={`cpl-nextlife-component-indicator ${
                    nextLifeStage === 1 ? 'isShown' : ''
                }`}
            >
                0{nextLifeStage}/03
            </div>
        </div>
    );
}

export default NextLifeStageIndicator;
