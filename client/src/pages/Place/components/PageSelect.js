import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    );
}

export default PageSelect;
