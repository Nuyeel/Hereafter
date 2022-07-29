// import styled from '@emotion/styled';

import { useContext } from 'react';

import ThemeContext from '../context/ThemeContext/ThemeContext';

// Background Light
import { ReactComponent as BGLCloudLT } from '../images/Background/bg-L-cloud-left-top.svg';
import { ReactComponent as BGLMistRTL } from '../images/Background/bg-L-mist-right-top-L.svg';
import { ReactComponent as BGLMistRTS } from '../images/Background/bg-L-mist-right-top-S.svg';
import { ReactComponent as BGLCloudRB } from '../images/Background/bg-L-cloud-right-bottom.svg';

// Background Dark
import { ReactComponent as BGDCloudLB } from '../images/Background/bg-D-cloud-left-bottom.svg';
import { ReactComponent as BGDWaveRTL } from '../images/Background/bg-D-wave-right-top-L.svg';
import { ReactComponent as BGDWaveRTS } from '../images/Background/bg-D-wave-right-top-S.svg';
import { ReactComponent as BGDStarL } from '../images/Background/bg-D-star-left.svg';
import { ReactComponent as BGDStarR } from '../images/Background/bg-D-star-right.svg';

// TODO: 調整切換背景的動畫 底色換完 svg 再從兩側滑入應該較易實作

function Background() {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`background ${
                theme.title === 'light' ? '' : 'background-dark'
            }`}
        >
            {theme.title === 'light' ? (
                <>
                    <BGLCloudLT className="bg-L-cloud-left-top" />
                    <BGLMistRTL className="bg-L-mist-right-top-L" />
                    <BGLMistRTS className="bg-L-mist-right-top-S" />
                    <BGLCloudRB className="bg-L-cloud-right-bottom" />
                </>
            ) : (
                <>
                    <BGDCloudLB className="bg-D-cloud-left-bottom" />
                    <BGDWaveRTL className="bg-D-wave-right-top-L" />
                    <BGDWaveRTS className="bg-D-wave-right-top-S" />
                    <BGDStarL className="bg-D-star-left" />
                    <BGDStarR className="bg-D-star-right" />
                </>
            )}
        </div>
    );
}

export default Background;
