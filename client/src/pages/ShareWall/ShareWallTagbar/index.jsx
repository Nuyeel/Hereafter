// 使用套件 (package)
import { useEffect, useState } from 'react';
import axios from 'axios';

// 使用設定 (config)
import { API_SHAREWALL_TAGS } from '../../../config/ajax-path';

// 使用樣式 (scss)
import './Tagbar.scss';

// 使用組件 (Component)

function Tagbar(props) {
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
            {tagList &&
                tagList.map((v, i) => (
                    <button
                        key={i}
                        className="tag-item p-2"
                        onClick={() => {
                            console.log('tag search');
                        }}
                    >
                        #{v.share_post_tag_text}
                    </button>
                ))}
        </div>
    );
}

export default Tagbar;
