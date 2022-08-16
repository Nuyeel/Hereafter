import './NextLifeStageIndicator.scss';

function NextLifeStageIndicator(props) {
    const { nextLifeStage, cubeIsMaking } = props;
    return (
        <div className="container cpl-ncf-container">
            <div
                className={`cpl-nextlife-component-indicator ${
                    nextLifeStage === 1 ? 'isShown' : ''
                } ${cubeIsMaking ? 'isMaking' : ''}`}
            >
                0{nextLifeStage}/03
            </div>
        </div>
    );
}

export default NextLifeStageIndicator;
