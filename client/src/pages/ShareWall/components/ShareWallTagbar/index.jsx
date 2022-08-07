// 使用套件 (package)
import { useEffect, useState } from 'react';
import axios from 'axios';

// 使用設定 (config)
import { API_SHAREWALL_TAGS } from '../../../../config/ajax-path';

// 使用樣式 (scss)
import './Tagbar.scss';

// 使用組件 (Component)

function Tagbar(props) {
    const { searchParams, setSearchParams } = props;

    const [tagList, setTagList] = useState([]);

    const axiosGET = async () => {
        const result = await axios.get(`${API_SHAREWALL_TAGS}`);
        const data = result.data;
        setTagList(data);
    };

    useEffect(() => {
        axiosGET();
    }, []);

    return (
        <div className="cpl-tagbar">
            {/* TODO: onClick 時將值傳送到搜尋欄中 */}
            {tagList &&
                tagList.map((v, i) => (
                    <button
                        key={i}
                        className="cpl-tag-item"
                        onClick={(e) => {
                            // ASK: 標籤搜尋與標題搜尋的 RESTful API 設計
                            // console.log(e.target.innerText);
                            if (
                                searchParams.indexOf(e.target.innerText) !== -1
                            ) {
                                // 如果已經有此標籤 什麼事都不用做
                            } else {
                                const newSearchParams = `${searchParams} ${e.target.innerText}`;
                                console.log(newSearchParams);
                                setSearchParams(newSearchParams);
                            }
                        }}
                    >
                        #{v.share_post_tag_text}
                    </button>
                ))}
        </div>
    );
}

export default Tagbar;
