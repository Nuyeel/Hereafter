import { ReactComponent as SoulSVG } from '../../../images/avatar/soul_circle.svg';
import styled from '@emotion/styled';

function SoulProps(props) {
    const { theme } = props;
    const Soulcolor = styled.i`
        path {
            fill: ${theme.cHeader};
        }
        circle {
            stroke: ${theme.cHeader};
        }
    `;
    return (
        <>
            <Soulcolor>
                <SoulSVG />
            </Soulcolor>
        </>
    );
}

export default SoulProps;
