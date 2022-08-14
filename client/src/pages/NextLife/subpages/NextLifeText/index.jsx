import { useRef } from 'react';

import './NextLifeText.scss';

function NextLifeText(props) {
    const { textIsHidden, nextLifeTextareaString, setNextLifeTextareaString } = props;
    const nextLifeTextareaRef = useRef();

    const handleNextLifeTextareaChange = (e) => {
        // console.log(e.target.value);
        const trimmedString = e.target.value.trim();
        setNextLifeTextareaString(trimmedString);
    };

    return (
        <div
            className={`cpl-nextlife-magic-cube-container nlText ${
                textIsHidden ? 'isHidden' : 'isShown'
            }`}
        >
            <div className="container cpl-nextlife-text-container d-flex justify-content-center align-items-center">
                <div className="cpl-nextlife-text-inner">
                    <h5 className="cpl-nl-ti-title">
                        請輸入您對
                        <span className="cpl-nl-ti-title-altenative">
                            今生的感想或
                        </span>
                        來生的期望：
                    </h5>
                    <div className="cpl-nl-ti-baseline-1"></div>
                    <div className="cpl-nl-ti-baseline-2"></div>
                    <div className="cpl-nl-ti-baseline-3"></div>
                    <textarea
                        className="cpl-nl-ti-textarea"
                        cols="30"
                        rows="2"
                        name="nextLifeTextArea"
                        placeholder="將心情書寫於此"
                        maxLength="30"
                        ref={nextLifeTextareaRef}
                        value={nextLifeTextareaString}
                        onChange={handleNextLifeTextareaChange}
                    ></textarea>
                    <p className="cpl-nl-ti-notice">最多可以輸入 30 個字元。</p>
                </div>
            </div>
        </div>
    );
}

export default NextLifeText;
