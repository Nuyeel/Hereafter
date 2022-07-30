import React from 'react';

function SearchBar(props) {
    const { searchWord, setSearchWord } = props;
    return (
        <>
            <div className="xuan-input-group">
                <input
                    type="text"
                    className="xuan-input-text form-control"
                    placeholder="以活動名稱搜尋"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                />
            </div>
        </>
    );
}

export default SearchBar;
