import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import HeaderContext from '../../../../context/HeaderContext/HeaderContext';
import ThemeContext from '../../../../context/ThemeContext/ThemeContext';

import { FiSearch } from 'react-icons/fi';
import OutlineSoulAlert from '../../../../images/sweetalert2/outline_soul_alert.svg';

import './SearchBar.scss';

// FIXME: 刪除搜尋欄內容的問題 會跟放大鏡重疊
// DONE: 把 pseudo-element 推開即可
// FIXME: 這東西的顏色要怎麼調整
// ASK: 怎麼換掉網址列但不重新抓資料
// ASK: 無意義字串時的網址列重置
// DONE: navigate() 記得 return 終止函式
// FIXME: 搜尋時要發 AJAX 去新增被搜尋的次數
// TODO: Lodash/debounce
function ShareWallSearchBar(props) {
    const { handleSearchParams, axiosListGET } = props;
    const { searchParams, setSearchParams } = useContext(HeaderContext);
    const { theme } = useContext(ThemeContext);
    const searchRef = useRef(null);

    const navigate = useNavigate();

    return (
        <form className="d-flex cpl-searchbar-container">
            {/* TODO: useDebouncing */}
            <input
                className={`form-control cpl-searchbar ${
                    theme.title === 'light'
                        ? 'cpl-searchbar-light'
                        : 'cpl-searchbar-dark'
                }`}
                type="search"
                ref={searchRef}
                value={searchParams}
                placeholder="search"
                aria-label="Search"
                onChange={(e) => {
                    setSearchParams(e.target.value);
                    // DONE: 清空時重新抓資料
                    if (e.target.value === '') {
                        axiosListGET();
                        navigate('/sharewall');
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (searchParams.trim() === '') {
                            Swal.fire({
                                title: '請輸入有意義的內容～',
                                imageUrl: OutlineSoulAlert,
                                imageHeight: 50,
                                imageWidth: 50,
                                showConfirmButton: false,
                            });
                        }
                        handleSearchParams();
                    }
                }}
            />
            {/* TODO: onClick 時進行標籤搜尋 */}
            {/* FIXME: 所以文章標題不可以有 # */}
            <FiSearch
                className={`cpl-search-icon ${
                    theme.title === 'light'
                        ? 'cpl-search-icon-light'
                        : 'cpl-search-icon-dark'
                }`}
                onClick={() => {
                    if (searchParams.trim() === '') {
                        Swal.fire({
                            title: '請輸入有意義的內容～',
                            imageUrl: OutlineSoulAlert,
                            imageHeight: 50,
                            imageWidth: 50,
                            showConfirmButton: false,
                        });
                    }
                    handleSearchParams();
                }}
            />
        </form>
    );
}

export default ShareWallSearchBar;
