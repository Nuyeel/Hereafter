import getDatestr from '../components/getDatestr';
import SoulProps from '../components/SoulProps';
import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';

function AvatarCard(props) {
    const { theme, avatarinfo } = props;
    const navigate = useNavigate();
    const time = getDatestr(avatarinfo.avatar_created_at);
    const combination = JSON.parse(avatarinfo.combination);
    const combinationText = JSON.parse(avatarinfo.combinationText);
    const editAvatar = () => {
        sessionStorage.setItem('avatar_id', avatarinfo.avatar_id);
        navigate('/maker');
    };
    const BGSquareShowcase = styled.div`
        position: absolute;
        border: ${theme.bcAvatarFrame} 3px solid;
        height: 68%;
        width: 68%;
        top: 20%;
        left: 16%;
    `;
    const BGCircleShowcase = styled.div`
        position: absolute;
        border: ${theme.bcAvatarFrame} 3px solid;
        border-radius: 50%;
        height: 82%;
        width: 82%;
        top: 6%;
        left: 9%;
    `;
    return (
        <>
            <div
                className="showcaseCard"
                style={{ backgroundColor: theme.bgcAvatarMaker }}
            >
                <p className="showcaseCardTitle">
                    投生形象{avatarinfo.avatar_id}
                </p>
                <p className="showcaseCardTime">最後編輯時間:{time}</p>
                <div
                    className="showcaseCardIMG"
                    style={{
                        background: `radial-gradient(
            50% 50% at 50% 50%,
            ${theme.bgcShowacseCard} 0%,
            transparent 100%
        )`,
                    }}
                >
                    <BGCircleShowcase />
                    <BGSquareShowcase />
                    <img
                        src={
                            'http://localhost:3500/uploads/images/avatar/' +
                            avatarinfo.img_name
                        }
                        alt=""
                    ></img>
                </div>
                <div className="showcaseText">
                    <p className="avatarConbination">
                        膚色:{combinationText.bodyColor}
                        <br />
                        手:{combinationText.hand}
                        <br />
                        {(combination.special ? '尾:' : '腳:') +
                            combinationText.foot}{' '}
                        {combination.body.special
                            ? `  尾色:${combinationText.specialColor}`
                            : null}
                        <br />
                        眼:{combinationText.eye}
                        &nbsp;&nbsp;&nbsp;瞳色:
                        {combinationText.eyeColor}
                        <br />
                        髮型:{combinationText.hair} &nbsp;&nbsp;&nbsp;髮色:
                        {combinationText.hairColor}
                        <br />
                        嘴巴:{combinationText.lip}
                        <br />
                        鼻子:{combinationText.nose}&nbsp;&nbsp;&nbsp;顏色:
                        {combinationText.noseColor}
                        <br />
                        耳朵:
                        {combinationText.ear}&nbsp;&nbsp;&nbsp;
                        {combination.face.topEar
                            ? `顏色:${combinationText.topearColor}`
                            : null}
                        <br />
                        獸尾:{combinationText.tale}&nbsp;&nbsp;&nbsp;
                        {combination.body.tale
                            ? `尾色:${combinationText.taleColor}`
                            : null}
                    </p>

                    <p className="avatarTotalPrice">
                        總計價格:&nbsp;{avatarinfo.price}&nbsp;
                        <SoulProps theme={theme} />
                    </p>

                    <div className="showcaseBtns">
                        <div style={{ border: '1px solid' }}>
                            <p
                                onClick={() => {
                                    navigate(
                                        `/sharewall/post/${avatarinfo.avatar_id}`
                                    );
                                }}
                            >
                                分享
                            </p>
                        </div>
                        <div
                            style={{ border: '1px solid' }}
                            onClick={editAvatar}
                        >
                            <p>編輯</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AvatarCard;
