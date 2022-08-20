import React from 'react';
import PriceRangeRadio from './PriceRangeRadio';
import TagCheckbox from './TagCheckbox';
import TagCheckboxArea from './TagCheckboxArea';

import '../../_xuan_styles.scss';

//img
import filter_star from '../../imgs/filter_star.svg';

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

        // 活動形式 select
        howTags,
        setHowTags,
        howtagsTypes,
    } = props;

    const handleChecked = (e) => {
        const value = e.target.value;
        if (!tags.includes(value)) return setTags([...tags, value]);

        if (tags.includes(value)) {
            const newTags = tags.filter((v) => v !== value);
            setTags(newTags);
        }
    };
    // const handleCheckedType = (e) => {
    //     const value = e.target.value;
    //     if (!howTags.includes(value)) return setHowTags([...howTags, value]);

    //     if (howTags.includes(value)) {
    //         const newHowTags = howTags.filter((v) => v !== value);
    //         setHowTags(newHowTags);
    //     }
    // };

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
            <div className="xuan-filter-all-bar">
                {/* 重設按鈕 */}

                <div className="xuan-price-filter ">
                    <h4 className="xuan-title">價格</h4>
                    <img src={filter_star} alt="" />

                    <div className="d-flex">
                        {priceRangeTypes.map((value, i) => (
                            <PriceRangeRadio
                                key={i}
                                value={value}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                            />
                        ))}
                    </div>
                </div>

                <div className="xuan-type-filter">
                    <h4 className="xuan-title">活動種類</h4>
                    <img src={filter_star} alt="" />

                    <div className="d-flex">
                        {tagTypes.map((value, i) => (
                            <TagCheckbox
                                value={value}
                                key={i}
                                tags={tags}
                                handleChecked={handleChecked}
                            />
                        ))}
                    </div>
                </div>

                <div className="xuan-area-filter">
                    <h4 className="xuan-title">地區種類</h4>
                    <img src={filter_star} alt="" />

                    <div className="d-flex">
                        {areaTypes.map((value, i) => (
                            <TagCheckboxArea
                                value={value}
                                key={i}
                                areas={areas}
                                handleCheckedArea={handleCheckedArea}
                            />
                        ))}
                    </div>
                </div>

                <div className="xuan-reset-filter-bar">
                    <button
                        className="xuan-button xuan-btn-pri xuan-btn-s"
                        onClick={() => {
                            setTags([]);
                            setAreas([]);
                            setHowTags([]);
                        }}
                    >
                        重設
                    </button>
                </div>
            </div>
        </>
    );
}

export default FilterBar;
