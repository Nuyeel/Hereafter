import { useState } from 'react';

import './NextLifeMusic.scss';

function NextLifeMusic(props) {
    const { setNextLifeStage } = props;

    const [isAnimation, setIsAnimation] = useState(false);

    const handleMusicSubmit = () => {
        const NewNextLifeStage = 1;
        console.log(NewNextLifeStage);

        setIsAnimation(true);

        if (NewNextLifeStage === 1) {
            setTimeout(() => {
                setNextLifeStage(NewNextLifeStage);
            }, 2000);
        }
    };

    return (
        <div
            className={`cpl-nextlife-music-lightbox d-flex flex-column justify-content-center ${
                isAnimation ? 'isAnimation' : ''
            }`}
        >
            <div className="cpl-nlm-l-title-area">
                <h4 className="cpl-nlm-l-ta-title">
                    在今生最後的此刻...
                    <br />
                    心情如何？
                </h4>
            </div>
            <div className="cpl-nlm-l-button-area d-flex justify-content-center">
                <button
                    className="cpl-nlm-l-ba-button"
                    onClick={handleMusicSubmit}
                >
                    輕鬆
                </button>
                <button
                    className="cpl-nlm-l-ba-button"
                    onClick={handleMusicSubmit}
                >
                    複雜
                </button>
                <button
                    className="cpl-nlm-l-ba-button"
                    onClick={handleMusicSubmit}
                >
                    遺憾
                </button>
            </div>
            <p></p>
        </div>
    );
}

export default NextLifeMusic;
