import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/Place/components/pageSelect.scss';

import { IoPersonCircleSharp, IoCaretDown } from 'react-icons/io5';

import ThemeContext from '../context/ThemeContext/ThemeContext';

function HeaderPlaceButton() {
    const { theme } = useContext(ThemeContext);

    const navigate = useNavigate();

    const [pageSelect, setPageSelect] = useState('place-list');

    return (
        <div
            className={
                theme.title === 'light'
                    ? 'place-page-select place-light'
                    : 'place-page-select'
            }
        >
            <li className="show-page">
                <span className="page-select-link">
                    {pageSelect === 'place-list' ? '列表' : '我的收藏'}
                    <IoCaretDown className="dropDown-icon" />
                </span>

                <ul>
                    <li
                        className="page-option"
                        onClick={() => {
                            setPageSelect('place-list');
                            navigate('/place', {
                                state: true,
                            });
                        }}
                    >
                        列表
                    </li>
                    <li
                        className="page-option"
                        onClick={() => {
                            setPageSelect('liked-place');
                            navigate('/place-liked', {
                                state: true,
                            });
                        }}
                    >
                        我的收藏
                    </li>
                </ul>
            </li>
        </div>
    );
}

export default HeaderPlaceButton;
