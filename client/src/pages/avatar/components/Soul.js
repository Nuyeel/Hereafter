import { ReactComponent as SoulSVG } from '../../../images/Nav/nav_soul.svg';
import { css } from '@emotion/react';
import { useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext/ThemeContext';

function Soul() {
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <SoulSVG
                css={css`
                    path {
                        fill: ${theme.cHeader};
                    }
                    circle {
                        stroke: ${theme.cHeader};
                    }
                `}
            />
        </>
    );
}

export default Soul;
