// import '../styles/_new_progressBar.scss';
import '../styles/_new_cart.scss';

function ProgressBar(props) {
    const { maxSteps, step, progressNames } = props;

    return (
        <>
            <div className="xuan-progress-container">
                <ul className="progressbar">
                    {Array(maxSteps)
                        .fill(1)
                        .map((v, i) => {
                            return (
                                <li
                                    key={i}
                                    className={i + 1 <= step ? 'active' : ''}
                                >
                                    {progressNames[i]}
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
}

export default ProgressBar;
