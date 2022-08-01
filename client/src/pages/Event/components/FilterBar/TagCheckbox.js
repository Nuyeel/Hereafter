import React from 'react';

function TagCheckbox(props) {
    const { value, handleChecked, tags } = props;
    return (
        <>
            <div className="checkbox">
                <label className="xuan-label">
                    <input
                        type="checkbox"
                        className="xuan-input-checkbox icheck"
                        value={value}
                        checked={tags.includes(value)}
                        onChange={handleChecked}
                    />
                    {value}
                </label>
            </div>
        </>
    );
}

export default TagCheckbox;
