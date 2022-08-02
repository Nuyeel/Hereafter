import { useCallback, useRef, useContext } from 'react';
import { toPng } from 'html-to-image';
import styled from '@emotion/styled';
import BodyData from './BodyData';
import FaceData from './FaceData';
import ThemeContext from '../../../../context/ThemeContext/ThemeContext';
//import Bodytry from "../../../images/avatar/hereafter-imgs/body-M.png";

function CenterPart(props) {
    const {
        conbination,
        controlChange,
        setControlChange,
        setBodyControlChange,
        setColorControlSwitch,
    } = props;
    const ref = useRef(null);
    const { theme } = useContext(ThemeContext);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, {
            cacheBust: true,
            pixelRatio: 1.2,
            canvasWidth: 535,
            canvasHeight: 535,
        })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'my-image-name.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ref]);

    const Center = styled.div`
        width: 450px;
        height: 100%;
        flex: 0 0 auto;
        padding: 50px 0 0 0;
        box-sizing: border-box;
    `;
    const BGSquare = styled.div`
        position: absolute;
        border: ${theme.bcAvatarFrame} 3px solid;
        height: 310px;
        width: 307px;
        top: 22%;
        left: 15.5%;
    `;
    const BGCircle = styled.div`
        position: absolute;
        border: ${theme.bcAvatarFrame} 3px solid;
        border-radius: 50%;
        height: 385px;
        width: 385px;
        top: 5%;
        left: 7%;
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
            conbination['basic_color']
        ]};
    `;
    const Body = styled.div`
        position: absolute;
        top: 36%;
        left: 28%;
        width: 205px;
        height: 123px;
        mask-image: url(${BodyData['bodycenter'][conbination['basic'][0]]});
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            conbination['basic_color']
        ]};
    `;
    const Arm = styled.div`
        position: absolute;
        top: 24%;
        left: 1.8%;
        width: 442px;
        height: 102px;
        mask-image: url(${BodyData['arm'][conbination['basic'][1]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            conbination['basic_color']
        ]};
    `;
    const handLPosition = [
        { top: '20.5%', left: '12%' },
        { top: '15%', left: '7.2%' },
        { top: '11.5%', left: '3%' },
    ];
    const HandL = styled.div`
        position: absolute;
        top: ${handLPosition[conbination['basic'][1]]['top']};
        left: ${handLPosition[conbination['basic'][1]]['left']};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData['hand'][conbination['body']['hand']][
            'left'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            conbination['basic_color']
        ]};
    `;
    const HandPalmL = styled.div`
        position: absolute;
        top: ${handLPosition[conbination['basic'][1]]['top']};
        left: ${handLPosition[conbination['basic'][1]]['left']};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData['hand'][conbination['body']['hand']][
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
        top: ${handRPosition[conbination['basic'][1]]['top']};
        left: ${handRPosition[conbination['basic'][1]]['left']};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData['hand'][conbination['body']['hand']][
            'right'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            conbination['basic_color']
        ]};
    `;
    const HandPalmR = styled.div`
        position: absolute;
        top: ${handRPosition[conbination['basic'][1]]['top']};
        left: ${handRPosition[conbination['basic'][1]]['left']};
        width: 102px;
        height: 102px;
        mask-image: url(${BodyData['hand'][conbination['body']['hand']][
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
        -webkit-mask-image: url(${BodyData['leg'][conbination['basic'][2]]});
        mask-image: url(${BodyData['leg'][conbination['basic'][2]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            conbination['basic_color']
        ]};
        display: ${conbination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const footLPosition = [
        { top: '62%', left: '7.5%' },
        { top: '67.5%', left: '5%' },
        { top: '79%', left: '2.5%' },
    ];
    const FootL = styled.div`
        position: absolute;
        top: ${footLPosition[conbination['basic'][2]]['top']};
        left: ${footLPosition[conbination['basic'][2]]['left']};
        width: 153px;
        height: 85px;
        -webkit-mask-image: url(${BodyData['foot'][conbination['body']['foot']][
            'left'
        ][conbination['basic'][2]]});
        mask-image: url(${BodyData['foot'][conbination['body']['foot']]['left'][
            conbination['basic'][2]
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            conbination['basic_color']
        ]};
        display: ${conbination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const FootPalmL = styled.div`
        position: absolute;
        top: ${footLPosition[conbination['basic'][2]]['top']};
        left: ${footLPosition[conbination['basic'][2]]['left']};
        width: 153px;
        height: 85px;
        -webkit-mask-image: url(${BodyData['foot'][conbination['body']['foot']][
            'palmLeft'
        ][conbination['basic'][2]]});
        mask-image: url(${BodyData['foot'][conbination['body']['foot']][
            'palmLeft'
        ][conbination['basic'][2]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #555;
        opacity: 0.3;
        display: ${conbination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const footRPosition = [
        { top: '62%', left: '59.5%' },
        { top: '67.5%', left: '62.2%' },
        { top: '79%', left: '64.5%' },
    ];
    const FootR = styled.div`
        position: absolute;
        top: ${footRPosition[conbination['basic'][2]]['top']};
        left: ${footRPosition[conbination['basic'][2]]['left']};
        width: 153px;
        height: 85px;
        -webkit-mask-image: url(${BodyData['foot'][conbination['body']['foot']][
            'right'
        ][conbination['basic'][2]]});
        mask-image: url(${BodyData['foot'][conbination['body']['foot']][
            'right'
        ][conbination['basic'][2]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            conbination['basic_color']
        ]};
        display: ${conbination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    const FootPalmR = styled.div`
        position: absolute;
        top: ${footRPosition[conbination['basic'][2]]['top']};
        left: ${footRPosition[conbination['basic'][2]]['left']};
        width: 153px;
        height: 85px;
        -webkit-mask-image: url(${BodyData['foot'][conbination['body']['foot']][
            'palmRight'
        ][conbination['basic'][2]]});
        mask-image: url(${BodyData['foot'][conbination['body']['foot']][
            'palmRight'
        ][conbination['basic'][2]]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: #555;
        opacity: 0.3;
        display: ${conbination['body']['special'] > 0 ? 'none' : 'block'};
    `;
    //MING:Face區
    const Eye = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        width: 109px;
        height: 68px;
        mask-image: url(${FaceData['eye'][conbination['face']['eye']]['eye']});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['eyeColors'][
            conbination['face_color']['eye']
        ]};
    `;
    const EyeWhite = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        width: 109px;
        height: 68px;
        mask-image: url(${FaceData['eye'][conbination['face']['eye']]['eyeW']});
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
        mask-image: url(${FaceData['ear'][conbination['face']['ear']]['src']});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['basicColors'][
            conbination['basic_color']
        ]};
        display: ${conbination['face']['topEar'] > 0 ? 'none' : 'block'};
    `;
    const TopEar = styled.div`
        position: absolute;
        top: 3%;
        left: 30%;
        width: 187px;
        height: 119px;
        -webkit-mask-image: url(${FaceData['topEar'][
            conbination['face']['topEar']
        ]['src']});
        mask-image: url(${FaceData['topEar'][conbination['face']['topEar']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['topEarColors'][
            conbination['face_color']['topEar']
        ]};
    `;
    const Nose = styled.div`
        position: absolute;
        top: 53.5%;
        left: 38.2%;
        width: 27px;
        height: 27px;
        -webkit-mask-image: url(${FaceData['nose'][conbination['face']['nose']][
            'src'
        ]});
        mask-image: url(${FaceData['nose'][conbination['face']['nose']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['noseColors'][
            conbination['face_color']['nose']
        ]};
    `;
    const Lip = styled.div`
        position: absolute;
        top: 73%;
        left: 27.5%;
        width: 51px;
        height: 25px;
        background: url(${FaceData['lip'][conbination['face']['lip']]['src']});
    `;
    const HairFront = styled.div`
        position: absolute;
        top: 3.2%;
        left: 22.4%;
        width: 225px;
        height: 119px;
        -webkit-mask-image: url(${FaceData['hairFront'][
            conbination['face']['hairFront']
        ]['hairFront']});
        mask-image: url(${FaceData['hairFront'][
            conbination['face']['hairFront']
        ]['src']});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['hairColors'][
            conbination['face_color']['hairFront']
        ]};
    `;
    const HairBack = styled.div`
        position: absolute;
        top: 6%;
        left: 16.4%;
        width: 302px;
        height: 207px;
        -webkit-mask-image: url(${FaceData['hairBack'][
            conbination['face']['hairBack']
        ]['hairBack']});
        mask-image: url(${FaceData['hairBack'][conbination['face']['hairBack']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${FaceData['hairColors'][
            conbination['face_color']['hairFront']
        ]};
    `;
    //MING:特殊
    const Tale = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        width: 450px;
        height: 450px;
        -webkit-mask-image: url(${BodyData['tale'][conbination['body']['tale']][
            'src'
        ]});
        mask-image: url(${BodyData['tale'][conbination['body']['tale']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-color: ${BodyData['taleColors'][
            conbination['special_color']['tale']
        ]};
    `;
    const Special = styled.div`
        position: absolute;
        top: 0%;
        left: 0%;
        width: 450px;
        height: 450px;
        -webkit-mask-image: url(${BodyData['special'][
            conbination['body']['special']
        ]['src']});
        mask-image: url(${BodyData['special'][conbination['body']['special']][
            'src'
        ]});
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: cover;
        background-image: linear-gradient(
            Ivory 10%,
            ${BodyData['specialColors'][
                conbination['special_color']['special']
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
    return (
        <>
            <Center>
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
                    <BGSquare></BGSquare>
                    <BGCircle></BGCircle>

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
                    <Body></Body>
                    <Special></Special>
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
                        onClick={() => setControlChange(0)}
                    ></BodyControl>
                </div>
                <div
                    className="info d-flex justify-content-center"
                    style={{ display: 'flex' }}
                >
                    <div onClick={onButtonClick}>
                        <i className="fa-solid fa-floppy-disk"></i> 儲存
                    </div>
                    <div>
                        <i className="fa-solid fa-dice"></i> 隨機
                    </div>
                </div>
            </Center>
        </>
    );
}

export default CenterPart;
