import React from 'react';

function TagCheckboxArea(props) {
    const { value, handleCheckedArea, areas } = props;
    return (
        <>
            <div className="checkbox">
                <label className="xuan-label">
                    <input
                        type="checkbox"
                        className="xuan-input-checkbox icheck"
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
