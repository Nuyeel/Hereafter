import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ThemeContext from '../../../../context/ThemeContext/ThemeContext';
import AuthContext from '../../../../context/AuthContext/AuthContext';

import { FiSearch } from 'react-icons/fi';

import { API_SHAREWALL } from '../../../../config/ajax-path';

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
    const { searchParams, setSearchParams, setPostsData } = props;
    const { theme } = useContext(ThemeContext);
    const { token } = useContext(AuthContext);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchParams = () => {
        // FIXME: 如果進來無意義字串
        if (searchParams.trim() === '') {
            axiosTitleGET();
            console.log('123');
            navigate('/sharewall');
            return setSearchParams(''); // 有問題再改回 return;
        }
        // 如果有 hashtag 起頭是標籤搜尋 (去除頭尾空格之後)
        if (searchParams.trim().indexOf('#') === 0) {
            // console.log('搜 tag', '?searchtag=...');
            // 去除所有 . 以及空格 (\s)
            const hashSearchParams = searchParams.replace(/[.\s]+/gm, '');
            // console.log(hashSearchParams);
            // TODO: 找出所有 hashtag 位置索引
            let hashIndicesArray = [];
            for (
                let i = 0, strLength = hashSearchParams.length;
                i < strLength;
                i++
            ) {
                if (hashSearchParams[i] === '#') hashIndicesArray.push(i);
            }
            // console.log(hashIndicesArray);
            if (hashIndicesArray.length > 3) {
                alert('一篇文章最多只有三個標籤～');
            } else {
                let searchtagString = '';
                for (let i = 0; i < hashIndicesArray.length; i++) {
                    if (i !== 0) {
                        searchtagString += '&searchtag=';
                    }
                    searchtagString += hashSearchParams.slice(
                        hashIndicesArray[i] + 1,
                        hashIndicesArray[i + 1]
                    );
                }
                // console.log(searchtagString);
                axiosTagGET(searchtagString);
                navigate(`?searchtag=${searchtagString}`, { replace: true });
            }
        } else {
            // console.log('搜 title', '?search=...');
            if (searchParams.indexOf('#') !== -1) {
                alert('您搜尋的標題名稱不符規定～');
            } else {
                axiosTitleGET(searchParams.trim());
                navigate(`?search=${searchParams.trim()}`, { replace: true });
            }
        }
    };

    const axiosTagGET = async (str) => {
        // 這裡做標籤搜尋
        const result = await axios.get(`${API_SHAREWALL}?searchtag=${str}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(result.data);
        setPostsData(result.data);
    };

    const axiosTitleGET = async (str) => {
        // 這裡做標題搜尋
        if (!str) {
            console.log('dabu');
            const result = await axios.get(API_SHAREWALL);
            // console.log(result.data);
            setPostsData(result.data);
        } else {
            const result = await axios.get(`${API_SHAREWALL}?search=${str}`);
            // console.log(result.data);
            setPostsData(result.data);
        }
    };

    return (
        <form className="d-flex">
            {/* TODO: useDebouncing */}
            <input
                className={`form-control cpl-searchbar ${
                    theme.title === 'light'
                        ? 'cpl-searchbar-light'
                        : 'cpl-searchbar-dark'
                } mb-2`}
                type="search"
                ref={searchRef}
                value={searchParams}
                placeholder="search"
                aria-label="Search"
                onChange={(e) => {
                    setSearchParams(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        if (searchParams.trim() === '') {
                            alert('請輸入有意義的內容');
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
                        alert('請輸入有意義的內容');
                    }
                    handleSearchParams();
                }}
            />
        </form>
    );
}

export default ShareWallSearchBar;
