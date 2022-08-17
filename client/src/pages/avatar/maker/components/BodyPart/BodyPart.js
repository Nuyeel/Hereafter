import styled from '@emotion/styled';
import Style from './Styling';
import Colors from './Colors';

function BodyPart(props) {
    const {
        bodyControlChange,
        setCombination,
        combination,
        colorControlSwitch,
        theme,
        gooddeed,
        canSave,
        setCanSave,
    } = props;
    const title = { hand: '手', foot: '腳', tale: '尾巴', special: '特殊' };
    const Body = styled.div`
        position: relative;
        width: 375px;
        height: 100%;
        flex: 0 0 auto;
        padding-left: 60px;
        padding-right: 40px;
        padding-top: 70px;
        box-sizing: border-box;
    `;
    const Title = styled.div`
        padding-top: 15px;
        padding-bottom: 35px;
        border-bottom: 1px solid ${theme.cHeader};
        font-size: 24px;
        color: ${canSave[bodyControlChange] ? theme.cHeader : '#fa49b6'};
        i {
            font-size: 24px;
        }
    `;
    return (
        <>
            <Body>
                <Title>{title[bodyControlChange]}</Title>
                <div className="controlarea" id="controlareaEyes">
                    <Style
                        combination={combination}
                        bodyControlChange={bodyControlChange}
                        setCombination={setCombination}
                        canSave={canSave}
                        setCanSave={setCanSave}
                        gooddeed={gooddeed}
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
