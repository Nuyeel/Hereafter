import React from 'react';
import PriceRangeRadio from './PriceRangeRadio';
import TagCheckbox from './TagCheckbox';
import TagCheckboxArea from './TagCheckboxArea';

import '../../_xuan_styles.scss';

function FilterBar(props) {


    

    const {
        // price radio
        priceRangeTypes,
        priceRange,
        setPriceRange,

        // type select
        tagTypes,
        tags,
        setTags,

        // area select
        areaTypes,
        areas,
        setAreas,
    } = props;

    const handleChecked = (e) => {
        const value = e.target.value;
        if (!tags.includes(value)) return setTags([...tags, value]);

        if (tags.includes(value)) {
            const newTags = tags.filter((v) => v !== value);
            setTags(newTags);
        }
    };

    const handleCheckedArea = (e) => {
        const value = e.target.value;
        if (!areas.includes(value)) return setAreas([...areas, value]);

        if (areas.includes(value)) {
            const newAreas = areas.filter((v) => v !== value);
            setAreas(newAreas);
        }
    };

    return (
        <>
            {/* <h2 className="grid-title">
        <i className="fa fa-filter"></i> 過濾
      </h2> */}
            {/* <hr /> */}

            <h4>價格</h4>

            {priceRangeTypes.map((value, i) => (
                <PriceRangeRadio
                    key={i}
                    value={value}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                />
            ))}

            <hr />

            <h4>
                標籤
                <button
                    className="xuan-button xuan-btn-pri xuan-btn-s"
                    onClick={() => {
                        setTags([]);
                        setAreas([]);
                    }}
                >
                    重設
                </button>
            </h4>

            <p>有包含勾選標籤均會顯示</p>
            <p>活動種類</p>
            {tagTypes.map((value, i) => (
                <TagCheckbox
                    value={value}
                    key={i}
                    tags={tags}
                    handleChecked={handleChecked}
                />
            ))}

            <p>地區種類</p>
            {areaTypes.map((value, i) => (
                <TagCheckboxArea
                    value={value}
                    key={i}
                    areas={areas}
                    handleCheckedArea={handleCheckedArea}
                />
            ))}

            <p>checkbox測試</p>

            <div className="padding"></div>
        </>
    );
}

export default FilterBar;
