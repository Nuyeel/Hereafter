import React from 'react';

function TypeCheckbox(props) {
    const { value, handleChecked, howTags } = props;
    return (
        <>
            <div className="checkbox d-flex">
                <label className="xuan-label-title">
                    <input
                        type="checkbox"
                        className="xuan-input-checkbox icheck"
                        value={value}
                        checked={howTags.includes(value)}
                        onChange={handleChecked}
                    />
                    {value}
                </label>
            </div>
        </>
    );
}

export default TypeCheckbox;
