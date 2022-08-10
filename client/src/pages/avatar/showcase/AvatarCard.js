//import styled from '@emotion/styled';
// import { ReactComponent as Soul } from '../../../images/Nav/nav_soul.svg';
import Soul from '../components/Soul';
//import testpng from '../../../images/avatar/test1.png';
import { useNavigate } from 'react-router-dom';

function AvatarCard(props) {
    const { theme, avatarinfo } = props;
    const navigate = useNavigate();
    // const SoulColor = styled.div`
    //     path {
    //         fill: ${theme.cHeader};
    //     }
    //     circle {
    //         stroke: ${theme.cHeader};
    //     }
    // `;
    const time = avatarinfo.avatar_created_at;
    const combination = JSON.parse(avatarinfo.combination);
    const combinationText = JSON.parse(avatarinfo.combinationText);
    //console.log(avatarinfo);
    const editAvatar = () => {
        sessionStorage.setItem('avatar_id', avatarinfo.avatar_id);
        navigate('/maker', { replace: true });
    };
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
                <div className="showcaseCardIMG">
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
                            ? `尾色:${combinationText.specialColor}`
                            : null}
                        <br />
                        眼:{combinationText.eye} 瞳色:{combinationText.eyeColor}
                        <br />
                        髮型:{combinationText.hair} 髮色:
                        {combinationText.hairColor}
                        <br />
                        嘴巴:{combinationText.lip}
                        <br />
                        鼻子:{combinationText.nose} 顏色:
                        {combinationText.noseColor}
                        <br />
                        耳朵:
                        {combination.face.topEar
                            ? combinationText.topEar
                            : combinationText.ear}
                        {combination.face.topEar
                            ? `尾色:${combinationText.topearColor}`
                            : null}
                        <br />
                        獸尾:{combinationText.tale}
                        {combination.body.tale
                            ? `尾色:${combinationText.taleColor}`
                            : null}
                    </p>

                    <p className="avatarTotalPrice">
                        總計價格:{avatarinfo.price}
                        <Soul />
                    </p>

                    <div className="showcaseBtns">
                        <div style={{ border: '1px solid' }}>
                            <p>分享</p>
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
