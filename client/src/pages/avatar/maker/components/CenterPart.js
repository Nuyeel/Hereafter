import { useCallback, useRef, useContext } from 'react';
import { toPng } from 'html-to-image';
import styled from '@emotion/styled';
import BodyData from './BodyData';
import FaceData from './FaceData';
import ThemeContext from '../../../../context/ThemeContext/ThemeContext';
import { Avatar_Update } from '../../../../config/ajax-path';
import axios from 'axios';
import { ReactComponent as Soul } from '../../../../images/Nav/nav_soul.svg';
//import Bodytry from "../../../images/avatar/hereafter-imgs/body-M.png";

function CenterPart(props) {
    const {
        combination,
        controlChange,
        setControlChange,
        setBodyControlChange,
        setColorControlSwitch,
        setFaceControlChange,
    } = props;
    const ref = useRef(null);
    const { theme } = useContext(ThemeContext);
    const avatarTotalPrice =
        BodyData['hand'][combination['body']['hand']]['price'] +
        (combination['body']['special']
            ? BodyData['special'][combination['body']['special']]['price']
            : BodyData['foot'][combination['body']['foot']]['price']) +
        BodyData['tale'][combination['body']['tale']]['price'] +
        FaceData['eye'][combination['face']['eye']]['price'] +
        FaceData['nose'][combination['face']['nose']]['price'] +
        FaceData['lip'][combination['face']['lip']]['price'] +
        FaceData['hairFront'][combination['face']['hairFront']]['price'] +
        FaceData['hairBack'][combination['face']['hairBack']]['price'] +
        (combination['face']['topEar']
            ? FaceData['topEar'][combination['face']['topEar']]['price']
            : FaceData['ear'][combination['face']['ear']]['price']);
    const combinationText = {
        hand: BodyData['hand'][combination['body']['hand']]['name'],
        foot: combination['body']['special']
            ? BodyData['special'][combination['body']['special']]['name']
            : BodyData['foot'][combination['body']['foot']]['name'],
        bodyColor: BodyData['basicColorsName'][combination['basic_color']],
        specialColor: combination['body']['special']
            ? BodyData['specialColorsName'][
                  combination['special_color']['special']
              ]
            : '',
        tale: combination['body']['tale'] ? '有' : '無',
        taleColor: combination['body']['tale']
            ? BodyData['taleColorsName'][combination['special_color']['tale']]
            : '',
        eye: FaceData['eye'][combination['face']['eye']]['name'],
        eyeColor: FaceData['eyeColorsName'][combination['face_color']['eye']],
        nose: FaceData['nose'][combination['face']['nose']]['name'],
        noseColor:
            FaceData['noseColorsName'][combination['face_color']['nose']],
        hair:
            FaceData['hairFront'][combination['face']['hairFront']]['name'] +
            '+' +
            FaceData['hairBack'][combination['face']['hairBack']]['name'],
        hairColor:
            FaceData['hairColorsName'][combination['face_color']['hairFront']],
        ear: combination['face']['topEar']
            ? FaceData['topEar'][combination['face']['topEar']]['name']
            : FaceData['ear'][combination['face']['ear']]['name'],
        topearColor: combination['face']['topEar']
            ? FaceData['topEarColorsName'][combination['face_color']['topEar']]
            : '',
        lip: FaceData['lip'][combination['face']['lip']]['name'],
    };
    const orderData = { combination: { ...combination } };
    //MING:目前的假資料:會員ID,訂單編號
    const aid = sessionStorage.getItem('avatar_id');
    const member = JSON.parse(localStorage.getItem('auth'));
    orderData.id = member['sid'];
    orderData.avatar_id = aid;
    orderData.combinationText = combinationText;
    orderData.totalPrice = avatarTotalPrice;
    const onButtonClick = useCallback(async () => {
        if (ref.current === null) {
            return;
        }
        await toPng(ref.current, {
            cacheBust: true,
            pixelRatio: 1.2,
            canvasWidth: 535,
            canvasHeight: 535,
        })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'my-image-name.png';
                link.href = dataUrl;
                orderData.img = dataUrl;
                if (sessionStorage.getItem('avatar_id') === null) {
                    link.click();
                }
            })
            .catch((err) => {
                console.log(err);
            });
        if (sessionStorage.getItem('avatar_id') === null) {
            console.log('Meow 目前沒有訂單編號!');
        } else {
            const r = await axios.post(Avatar_Update, orderData);
            console.log(orderData);
            console.log(r.data);
            sessionStorage.removeItem('avatar_id');
        }
    }, [ref]);

    const Center = styled.div`
        width: 450px;
        height: 100%;
        flex: 0 0 auto;
        padding: 50px 0 0 0;
        box-sizing: border-box;
        position: relative;
    `;
    const BGSquare = styled.div`
        position: absolute;
        border: ${theme.bcAvatarFrame} 3px solid;
        height: 310px;
        width: 307px;
        top: 23%;
        left: 16.3%;
    `;
    const BGCircle = styled.div`
        position: absolute;
        border: ${theme.bcAvatarFrame} 3px solid;
        border-radius: 50%;
        height: 385px;
        width: 385px;
        top: 10.5%;
        left: 7.6%;
    `;
    //*MING:Body區
    const Face = styled.div`
        position: absolute;
        top: 15.2%;
        left: 38.6%;
        width: 109px;
        height: 95px;
        mask-image: url(${BodyData['head'][0]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
    `;
    const Body = styled.div`
        position: absolute;
        top: 35.8%;
        left: 28%;
        width: 205px;
        height: 136px;
        mask-image: url(${BodyData['bodycenter'][combination['basic'][0]]});
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
    `;
    const Arm = styled.div`
        position: absolute;
        top: 24%;
        left: 1.8%;
        width: 442px;
        height: 102px;
        mask-image: url(${BodyData['arm'][combination['basic'][1]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
    `;
    const handLPosition = [
        { top: '20.5%', left: '12%' },
        { top: '15%', left: '7.2%' },
        { top: '11.5%', left: '3%' },
    ];
    const HandL = styled.div`
        position: absolute;
        top: ${handLPosition[combination['basic'][1]]['top']};
        left: ${handLPosition[combination['basic'][1]]['left']};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData['hand'][combination['body']['hand']][
            'left'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
    `;
    const HandPalmL = styled.div`
        position: absolute;
        top: ${handLPosition[combination['basic'][1]]['top']};
        left: ${handLPosition[combination['basic'][1]]['left']};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData['hand'][combination['body']['hand']][
            'palmLeft'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #555;
        opacity: 0.3;
    `;
    const handRPosition = [
        { top: '20.5%', left: '66.5%' },
        { top: '15%', left: '71%' },
        { top: '11.5%', left: '75.5%' },
    ];
    const HandR = styled.div`
        position: absolute;
        top: ${handRPosition[combination['basic'][1]]['top']};
        left: ${handRPosition[combination['basic'][1]]['left']};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData['hand'][combination['body']['hand']][
            'right'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
    `;
    const HandPalmR = styled.div`
        position: absolute;
        top: ${handRPosition[combination['basic'][1]]['top']};
        left: ${handRPosition[combination['basic'][1]]['left']};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData['hand'][combination['body']['hand']][
            'palmRight'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #555;
        opacity: 0.3;
    `;
    const Leg = styled.div`
        position: absolute;
        top: 54%;
        left: 1.5%;
        width: 442px;
        height: 170px;
        -webkit-mask-image: url(${BodyData['leg'][combination['basic'][2]]});
        mask-image: url(${BodyData['leg'][combination['basic'][2]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
        display: ${combination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const footLPosition = [
        { top: '62%', left: '7.5%' },
        { top: '67.5%', left: '5%' },
        { top: '79%', left: '2.5%' },
    ];
    const FootL = styled.div`
        position: absolute;
        top: ${footLPosition[combination['basic'][2]]['top']};
        left: ${footLPosition[combination['basic'][2]]['left']};
        width: 153px;
        height: 85px;
        -webkit-mask-image: url(${BodyData['foot'][combination['body']['foot']][
            'left'
        ][combination['basic'][2]]});
        mask-image: url(${BodyData['foot'][combination['body']['foot']]['left'][
            combination['basic'][2]
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
        display: ${combination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const FootPalmL = styled.div`
        position: absolute;
        top: ${footLPosition[combination['basic'][2]]['top']};
        left: ${footLPosition[combination['basic'][2]]['left']};
        width: 153px;
        height: 85px;
        -webkit-mask-image: url(${BodyData['foot'][combination['body']['foot']][
            'palmLeft'
        ][combination['basic'][2]]});
        mask-image: url(${BodyData['foot'][combination['body']['foot']][
            'palmLeft'
        ][combination['basic'][2]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #555;
        opacity: 0.3;
        display: ${combination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const footRPosition = [
        { top: '62%', left: '59.5%' },
        { top: '67.5%', left: '62.2%' },
        { top: '79%', left: '64.5%' },
    ];
    const FootR = styled.div`
        position: absolute;
        top: ${footRPosition[combination['basic'][2]]['top']};
        left: ${footRPosition[combination['basic'][2]]['left']};
        width: 153px;
        height: 85px;
        -webkit-mask-image: url(${BodyData['foot'][combination['body']['foot']][
            'right'
        ][combination['basic'][2]]});
        mask-image: url(${BodyData['foot'][combination['body']['foot']][
            'right'
        ][combination['basic'][2]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
        display: ${combination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const FootPalmR = styled.div`
        position: absolute;
        top: ${footRPosition[combination['basic'][2]]['top']};
        left: ${footRPosition[combination['basic'][2]]['left']};
        width: 153px;
        height: 85px;
        -webkit-mask-image: url(${BodyData['foot'][combination['body']['foot']][
            'palmRight'
        ][combination['basic'][2]]});
        mask-image: url(${BodyData['foot'][combination['body']['foot']][
            'palmRight'
        ][combination['basic'][2]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #555;
        opacity: 0.3;
        display: ${combination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    //MING:Face區
    const Eye = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        width: 109px;
        height: 68px;
        mask-image: url(${FaceData['eye'][combination['face']['eye']]['eye']});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['eyeColors'][
            combination['face_color']['eye']
        ]};
    `;
    const EyeWhite = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        width: 109px;
        height: 68px;
        mask-image: url(${FaceData['eye'][combination['face']['eye']]['eyeW']});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #fff;
    `;
    const Ear = styled.div`
        position: absolute;
        top: 15.5%;
        left: 30%;
        width: 187px;
        height: 95px;
        mask-image: url(${FaceData['ear'][combination['face']['ear']]['src']});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            combination['basic_color']
        ]};
        display: ${combination['face']['topEar'] > 0 ? 'none' : 'block'};
    `;
    const TopEar = styled.div`
        position: absolute;
        top: 3%;
        left: 30%;
        width: 187px;
        height: 119px;
        -webkit-mask-image: url(${FaceData['topEar'][
            combination['face']['topEar']
        ]['src']});
        mask-image: url(${FaceData['topEar'][combination['face']['topEar']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['topEarColors'][
            combination['face_color']['topEar']
        ]};
    `;
    const Nose = styled.div`
        position: absolute;
        top: 53.5%;
        left: 38.2%;
        width: 27px;
        height: 27px;
        -webkit-mask-image: url(${FaceData['nose'][combination['face']['nose']][
            'src'
        ]});
        mask-image: url(${FaceData['nose'][combination['face']['nose']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['noseColors'][
            combination['face_color']['nose']
        ]};
    `;
    const Lip = styled.div`
        position: absolute;
        top: 73%;
        left: 27.5%;
        width: 51px;
        height: 25px;
        background: url(${FaceData['lip'][combination['face']['lip']]['src']});
    `;
    const HairFront = styled.div`
        position: absolute;
        top: 3.2%;
        left: 22.4%;
        width: 225px;
        height: 119px;
        -webkit-mask-image: url(${FaceData['hairFront'][
            combination['face']['hairFront']
        ]['hairFront']});
        mask-image: url(${FaceData['hairFront'][
            combination['face']['hairFront']
        ]['src']});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['hairColors'][
            combination['face_color']['hairFront']
        ]};
    `;
    const HairBack = styled.div`
        position: absolute;
        top: 6%;
        left: 16.4%;
        width: 302px;
        height: 207px;
        -webkit-mask-image: url(${FaceData['hairBack'][
            combination['face']['hairBack']
        ]['hairBack']});
        mask-image: url(${FaceData['hairBack'][combination['face']['hairBack']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['hairColors'][
            combination['face_color']['hairFront']
        ]};
    `;
    //MING:特殊
    const Tale = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        width: 450px;
        height: 450px;
        -webkit-mask-image: url(${BodyData['tale'][combination['body']['tale']][
            'src'
        ]});
        mask-image: url(${BodyData['tale'][combination['body']['tale']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['taleColors'][
            combination['special_color']['tale']
        ]};
    `;
    const Special = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        width: 450px;
        height: 450px;
        -webkit-mask-image: url(${BodyData['special'][
            combination['body']['special']
        ]['src']});
        mask-image: url(${BodyData['special'][combination['body']['special']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-image: linear-gradient(
            Ivory 10%,
            ${BodyData['specialColors'][
                combination['special_color']['special']
            ]}
        );
    `;

    //MING:控制面板
    const FaceControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 135px;
        width: 135px;
        border-radius: 50%;
        top: 6%;
        left: 34.5%;
        cursor: pointer;
    `;
    const HandRControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 120px;
        width: 90px;
        border-radius: 50%;
        top: 15%;
        left: 70%;
        cursor: pointer;
    `;
    const HandLControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 120px;
        width: 90px;
        border-radius: 50%;
        top: 15%;
        left: 10%;
        cursor: pointer;
    `;
    const FootRControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 130px;
        width: 120px;
        border-radius: 50%;
        top: 67%;
        left: 60%;
        cursor: pointer;
    `;
    const FootLControl = styled.div`
        position: absolute;
        ${'' /* border: #ffc 5px dotted; */}
        height: 130px;
        width: 120px;
        border-radius: 50%;
        top: 67%;
        left: 16%;
        cursor: pointer;
    `;
    const TaleControl = styled.div`
        position: absolute;
        ${'' /* border: #cff 5px dotted; */}
        height: 60px;
        width: 150px;
        border-radius: 50%;
        top: 46%;
        left: 62%;
        cursor: pointer;
    `;
    const SpecialControl = styled.div`
        position: absolute;
        ${'' /* border: #cff 5px dotted; */}
        height: 60px;
        width: 150px;
        border-radius: 50%;
        top: 55%;
        left: 32%;
        cursor: pointer;
    `;
    const BodyControl = styled.div`
        position: absolute;
        height: 450px;
        width: 450px;
        display: ${controlChange ? 'block' : 'none'};
        cursor: pointer;
    `;
    const Info = styled.div`
        position: relative;
        top: -10%;
        left: 40%;
    `;
    const SaveBtn = styled.div`
        display: ${controlChange ? 'none' : 'flex'};
        justify-content: center;
        div {
            border: 1px solid;
            padding: 10px 30px;
            border-radius: 12px;
            margin: 0 10px;
            font-size: 20px;
            cursor: pointer;
            i {
                font-size: 24px;
            }
        }
    `;
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
            <Center>
                <BGSquare></BGSquare>
                <BGCircle></BGCircle>
                <div
                    ref={ref}
                    className="pic text-center mb-4"
                    style={{
                        width: '450px',
                        height: '450px',
                        position: 'relative',
                        boxSizing: 'border-box',
                        opacity: `${controlChange ? '0.3' : '1'}`,
                    }}
                >
                    <HairBack></HairBack>
                    <Ear></Ear>
                    <TopEar></TopEar>
                    <Face>
                        <EyeWhite></EyeWhite>
                        <Eye></Eye>
                        <Nose></Nose>
                        <Lip></Lip>
                    </Face>
                    <HairFront></HairFront>
                    <Tale></Tale>
                    <Special></Special>
                    <Body></Body>

                    <Arm></Arm>
                    <HandL></HandL>
                    <HandPalmL></HandPalmL>
                    <HandR></HandR>
                    <HandPalmR></HandPalmR>
                    <Leg></Leg>
                    <FootL></FootL>
                    <FootPalmL></FootPalmL>
                    <FootR></FootR>
                    <FootPalmR></FootPalmR>
                    <FaceControl
                        onClick={() => {
                            setControlChange(1);
                            setColorControlSwitch(1);
                            setFaceControlChange('eye');
                        }}
                    ></FaceControl>
                    <HandRControl
                        onClick={() => {
                            setBodyControlChange('hand');
                            setColorControlSwitch(0);
                        }}
                    ></HandRControl>
                    <HandLControl
                        onClick={() => {
                            setBodyControlChange('hand');
                            setColorControlSwitch(0);
                        }}
                    ></HandLControl>
                    <FootRControl
                        onClick={() => {
                            setBodyControlChange('foot');
                            setColorControlSwitch(0);
                        }}
                    ></FootRControl>
                    <FootLControl
                        onClick={() => {
                            setBodyControlChange('foot');
                            setColorControlSwitch(0);
                        }}
                    ></FootLControl>
                    <SpecialControl
                        onClick={() => {
                            setBodyControlChange('special');
                            setColorControlSwitch(1);
                        }}
                    ></SpecialControl>
                    <TaleControl
                        onClick={() => {
                            setBodyControlChange('tale');
                            setColorControlSwitch(1);
                        }}
                    ></TaleControl>
                    <BodyControl
                        onClick={() => {
                            setControlChange(0);
                            setBodyControlChange('hand');
                            setColorControlSwitch(0);
                        }}
                    ></BodyControl>
                </div>
                <Info>
                    <SoulColor>
                        <p>
                            總計:{avatarTotalPrice}
                            <Soul />
                        </p>
                    </SoulColor>
                </Info>
                <SaveBtn>
                    <div onClick={onButtonClick}>
                        <i className="fa-solid fa-floppy-disk"></i> 儲存
                    </div>
                    <div>
                        <i className="fa-solid fa-dice"></i> 隨機
                    </div>
                </SaveBtn>
            </Center>
        </>
    );
}

export default CenterPart;
