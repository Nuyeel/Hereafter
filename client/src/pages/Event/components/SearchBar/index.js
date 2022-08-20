import React from 'react';
import find from '../../imgs/find.svg';

function SearchBar(props) {
    const { searchWord, setSearchWord } = props;
    return (
        <>
            <div className="xuan-search-bar xuan-input-group">
                <input
                    // type="text"
                    className="xuan-input-text"
                    placeholder="以活動名稱搜尋"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                />

                <img src={find} alt="" />
            </div>
        </>
    );
}

export default SearchBar;
