import React from 'react';

function TagCheckboxArea(props) {
    const { value, handleCheckedArea, areas } = props;
    return (
        <>
            <div className="checkbox d-flex">
                <label className="xuan-label-title ">
                    <input
                        type="checkbox"
                        className="xuan-input-checkbox"
                        value={value}
                        checked={areas.includes(value)}
                        onChange={handleCheckedArea}
                    />
                    {value}
                </label>
            </div>
        </>
    );
}

export default TagCheckboxArea;
