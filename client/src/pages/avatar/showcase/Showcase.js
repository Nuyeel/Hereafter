import testpng from '../../../images/avatar/test1.png';
import './showcase.css';
import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext/ThemeContext';
import { ReactComponent as Soul } from '../../../images/Nav/nav_soul.svg';
import styled from '@emotion/styled';

function Showcase() {
    const { theme } = useContext(ThemeContext);

    const SoulColor = styled.div`
        path {
            fill: ${theme.cHeader};
        }
        circle {
            stroke: ${theme.cHeader};
        }
    `;
    return (
        <>
            <div
                className="container showcase"
                style={{
                    color: theme.cHeader,
                }}
            >
                <div
                    className="showcaseCard"
                    style={{ backgroundColor: theme.bgcAvatarMaker }}
                >
                    <p className="showcaseCardTitle">投生形象1</p>
                    <p className="showcaseCardTime">
                        最後編輯時間:1234566124123446
                    </p>
                    <div className="showcaseCardIMG">
                        <img src={testpng} alt=""></img>
                    </div>
                    <div className="showcaseText">
                        <p className="avatarConbination">組合文字</p>
                        <SoulColor>
                            <p className="avatarTotalPrice">
                                總計價格:3000
                                <Soul />
                            </p>
                        </SoulColor>
                        <div className="showcaseBtns">
                            <div style={{ border: '1px solid' }}>
                                <p>分享</p>
                            </div>
                            <div style={{ border: '1px solid' }}>
                                <p>編輯</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Showcase;
