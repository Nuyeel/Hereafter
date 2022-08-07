import styled from '@emotion/styled';
import { ReactComponent as Soul } from '../../../images/Nav/nav_soul.svg';
import testpng from '../../../images/avatar/test1.png';

function AvatarCard(props) {
    const { theme, avatarinfo } = props;
    const SoulColor = styled.div`
        path {
            fill: ${theme.cHeader};
        }
        circle {
            stroke: ${theme.cHeader};
        }
    `;
    const time = avatarinfo.avatar_created_at;
    const combinationText = JSON.parse(avatarinfo.combinationText);
    return (
        <>
            <div
                className="showcaseCard"
                style={{ backgroundColor: theme.bgcAvatarMaker }}
            >
                <p className="showcaseCardTitle">投生形象1</p>
                <p className="showcaseCardTime">最後編輯時間:{time}</p>
                <div className="showcaseCardIMG">
                    <img src={testpng} alt=""></img>
                </div>
                <div className="showcaseText">
                    <p className="avatarConbination">
                        膚色:{combinationText.bodyColor}
                        <br />
                        手:{combinationText.hand}
                        <br />
                        腳:{combinationText.foot}
                        <br />
                        腳:{combinationText.foot}
                    </p>
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
        </>
    );
}

export default AvatarCard;
