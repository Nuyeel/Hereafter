// import styled from '@emotion/styled';

// Background Light
import { ReactComponent as BGLCloudLT } from '../images/Background/bg-L-cloud-left-top.svg';
import { ReactComponent as BGLMistRT } from '../images/Background/bg-L-mist-right-top.svg';
import { ReactComponent as BGLCloudRB } from '../images/Background/bg-L-cloud-right-bottom.svg';

// Background Dark
import { ReactComponent as BGDCloudLB } from '../images/Background/bg-D-cloud-left-bottom.svg';
import { ReactComponent as BGDWavedRT } from '../images/Background/bg-D-wave-right-top.svg';
import { ReactComponent as BGDStarL } from '../images/Background/bg-D-star-left.svg';
import { ReactComponent as BGDStarR } from '../images/Background/bg-D-star-right.svg';

function Background(props) {
    const { theme } = props;

    return (
        <div
            className={`background ${
                theme === 'light' ? '' : 'background-dark'
            }`}
        >
            {theme === 'light' ? (
                <>
                    <BGLCloudLT className="bg-L-cloud-left-top" />
                    <BGLMistRT className="bg-L-mist-right-top" />
                    <BGLCloudRB className="bg-L-cloud-right-bottom" />
                </>
            ) : (
                <>
                    <BGDCloudLB className="bg-D-cloud-left-bottom" />
                    {/* FIXME: 目前下行 svg 素材會導致視窗被撐高 */}
                    {/* <BGDWaveRT className="bg-D-wave-right-top" /> */}
                    <BGDStarL className="bg-D-star-left" />
                    <BGDStarR className="bg-D-star-right" />
                </>
            )}
            <h1>Background.jsx</h1>
        </div>
    );
}

export default Background;
