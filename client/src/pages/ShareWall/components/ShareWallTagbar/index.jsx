// 使用套件 (package)
import { useEffect, useState } from 'react';
import axios from 'axios';

// 使用設定 (config)
import { API_SHAREWALL_TAGS } from '../../../../config/ajax-path';

// 使用樣式 (scss)
import './Tagbar.scss';

// 使用組件 (Component)

function Tagbar(props) {
    const { setSearchParams } = props;

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
        <div className="mb-4">
            {/* TODO: onClick 時將值傳送到搜尋欄中 */}
            {tagList &&
                tagList.map((v, i) => (
                    <button
                        key={i}
                        className="cpl-tag-item p-2"
                        onClick={(e) => {
                            // ASK: 標籤搜尋與標題搜尋的 RESTful API 設計
                            // console.log(e.target.innerText);
                            setSearchParams(e.target.innerText);
                        }}
                    >
                        #{v.share_post_tag_text}
                    </button>
                ))}
        </div>
    );
}

export default Tagbar;
