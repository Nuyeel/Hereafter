// import styled from '@emotion/styled';

// Background Light
import { ReactComponent as BGLCloudLT } from '../images/Background/bg-L-cloud-left-top.svg';
import { ReactComponent as BGLMistRT } from '../images/Background/bg-L-mist-right-top.svg';
import { ReactComponent as BGLCloudRB } from '../images/Background/bg-L-cloud-right-bottom.svg';

// Background Dark
import { ReactComponent as BGDCloudLB } from '../images/Background/bg-D-cloud-left-bottom.svg';
import { ReactComponent as BGDWaveRT } from '../images/Background/bg-D-wave-right-top.svg';
import { ReactComponent as BGDStarL } from '../images/Background/bg-D-star-left.svg';
import { ReactComponent as BGDStarR } from '../images/Background/bg-D-star-right.svg';

// TODO: 調整切換背景的動畫 底色換完 svg 再從兩側滑入應該較易實作

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
                    <BGDWaveRT className="bg-D-wave-right-top" />
                    <BGDStarL className="bg-D-star-left" />
                    <BGDStarR className="bg-D-star-right" />
                </>
            )}
        </div>
    );
}

export default Background;
