import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './pageSelect.scss';

function PageSelect(props) {
    const { page } = props;
    const navigate = useNavigate();

    // TODO: 狀態可以放在component裡面嗎~
    const [pageSelect, setPageSelect] = useState(page);

    // 頁面切換(列表/收藏)
    const handlePageSelect = (e) => {
        const newPage = e.target.value;
        setPageSelect(newPage);
        if (newPage === 'place-list') {
            navigate('/place', {
                state: true,
            });
        }
        if (newPage === 'liked-place') {
            navigate('/place-liked', {
                state: true,
            });
        }
    };

    return (
        <>
            <select
                style={{
                    color: '#222',
                    position: 'fixed',
                    top: '130px',
                    left: '400px',
                }}
                value={pageSelect}
                onChange={(e) => handlePageSelect(e)}
            >
                <option value={'place-list'}>列表</option>
                <option value={'liked-place'}>我的收藏</option>
            </select>

            <div className="place-page-select">
                <li className="show-page">
                    <Link to="" className="page-select-link">
                        列表
                    </Link>

                    <ul>
                        <li className="page-option">
                            <Link to="/place" className="page-select-link">
                                列表
                            </Link>
                        </li>
                        <li className="page-option">
                            <Link
                                to="/place-liked"
                                className="page-select-link"
                            >
                                我的收藏
                            </Link>
                        </li>
                    </ul>
                </li>
            </div>
        </>
    );
}

export default PageSelect;
