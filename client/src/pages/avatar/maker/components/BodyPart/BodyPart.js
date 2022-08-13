import styled from '@emotion/styled';
import Style from './Styling';
import Colors from './Colors';

function BodyPart(props) {
    const {
        controlChange,
        bodyControlChange,
        setCombination,
        combination,
        colorControlSwitch,
    } = props;
    const title = { hand: '手', foot: '腳', tale: '尾巴', special: '特殊' };
    const Body = styled.div`
        width: 375px;
        height: 100%;
        flex: 0 0 auto;
        padding-left: 60px;
        padding-right: 40px;
        padding-top: 70px;
        box-sizing: border-box;
    `;
    const Title = styled.div`
        font-size: 24px;
        i {
            font-size: 24px;
        }
    `;

    return (
        <>
            <Body>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <Title>
                    {title[bodyControlChange]}
                    <i className="fa-solid fa-dice"></i>
                </Title>
                <div className="controlarea" id="controlareaEyes">
                    <Style
                        combination={combination}
                        bodyControlChange={bodyControlChange}
                        setCombination={setCombination}
                    />
                    <Colors
                        combination={combination}
                        bodyControlChange={bodyControlChange}
                        setCombination={setCombination}
                        colorControlSwitch={colorControlSwitch}
                    />
                </div>
            </Body>
        </>
    );
}

export default BodyPart;
