import { useContext } from 'react';

import ThemeContext from '../context/ThemeContext/ThemeContext';
import HeaderContext from '../context/HeaderContext/HeaderContext';
import HeaderShareWallButton from './HeaderShareWallButton';
import HeaderPlaceButton from './HeaderPlaceButton';

function Header() {
    // TODO: headerList 中的 item.params 匹配時顯示 item.title
    const { theme } = useContext(ThemeContext);
    const headerContext = useContext(HeaderContext);

    return (
        <>
            {headerContext.title && (
                <div
                    className={`container d-flex header-container ${
                        headerContext.title === '交流分享'
                            ? 'header-container-sharewall-edition'
                            : ''
                    } ${
                        headerContext.title === '良辰吉地'
                            ? 'header-container-place'
                            : ''
                    }
                    
                    `}
                >
                    <h2
                        className="header"
                        style={{
                            color: theme.cHeader,
                        }}
                    >
                        {headerContext.title}
                        <span
                            className="header-baseline-decoration"
                            style={{
                                backgroundColor: theme.bgcHeaderDecor,
                            }}
                        />
                    </h2>
                    {/* TODO: 某些頁面必須要顯示分頁鈕 例如分享牆 */}
                    {headerContext.title === '交流分享' ? (
                        <HeaderShareWallButton
                            setShareWallPostsData={
                                headerContext.setShareWallPostsData
                            }
                        />
                    ) : (
                        ''
                    )}
                    {headerContext.title === '良辰吉地' ? (
                        <HeaderPlaceButton
                            setShareWallPostsData={
                                headerContext.setShareWallPostsData
                            }
                        />
                    ) : (
                        ''
                    )}
                </div>
            )}
        </>
    );
}

export default Header;
