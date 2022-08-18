import React from 'react';

function SortBar(props) {
    const { sortBy, setSortBy } = props;
    return (
        <>
            <div className="xuan-sortby btn-group">
                <select
                    className="xuan-form-select xuan-form-select-sm xuan-input-text"
                    aria-label="xuan-form-select-sm xuan-example"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">請選擇排序</option>
                    {/* <option value="1">熱門活動</option> */}
                    {/* <option value="2">(不處理)評價最高</option> */}
                    <option value="3">價格（由低至高）</option>
                    {/* <option value="4">(不處理)時間(由近到遠)</option> */}
                    <option value="5">陰德值（由低到高）</option>
                </select>
            </div>
        </>
    );
}

export default SortBar;
