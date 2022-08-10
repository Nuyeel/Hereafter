import {
    FaSortAmountDownAlt,
    FaSortAmountDown,
    FaSortUp,
    FaSortDown,
} from 'react-icons/fa';

function SortRow(props) {
    const { sortBy, setSortBy, handleSort, displayTotalRows, style } = props;

    const sortChange = (nowSort) => {
        setSortBy(nowSort);
        handleSort(nowSort);
    };

    return (
        <>
            <div className="sort-row" style={style}>
                <label>排序：</label>
                <input
                    type="radio"
                    name="sort"
                    value={sortBy}
                    id="sortYearASC"
                    checked={
                        sortBy === 'sortYearASC' || sortBy === 'sortYearDESC'
                    }
                    onChange={() => {}}
                    onClick={(e) => {
                        let sort = e.currentTarget.value;
                        if (
                            sortBy === 'sortPriceASC' ||
                            sortBy === 'sortPriceDESC'
                        ) {
                            sort = 'sortYearASC';
                        }
                        if (sort === 'sortYearASC') {
                            setSortBy('sortYearDESC');
                            handleSort('sortYearDESC');
                        } else if (sort === 'sortYearDESC') {
                            setSortBy('sortYearASC');
                            handleSort('sortYearASC');
                        }
                    }}
                />
                <label htmlFor="sortYearASC">
                    依時間{' '}
                    {sortBy === 'sortYearDESC' ? <FaSortDown /> : <FaSortUp />}
                </label>
                <input
                    type="radio"
                    name="sort"
                    value={sortBy}
                    id="sortPriceASC"
                    checked={
                        sortBy === 'sortPriceASC' || sortBy === 'sortPriceDESC'
                    }
                    onChange={() => {}}
                    onClick={(e) => {
                        let sort = e.currentTarget.value;
                        if (
                            sortBy === 'sortYearASC' ||
                            sortBy === 'sortYearDESC'
                        ) {
                            sort = 'sortPriceASC';
                        }

                        if (sort === 'sortPriceASC') {
                            setSortBy('sortPriceDESC');
                            handleSort('sortPriceDESC');
                        } else if (sort === 'sortPriceDESC') {
                            setSortBy('sortPriceASC');
                            handleSort('sortPriceASC');
                        }
                    }}
                />
                <label htmlFor="sortPriceASC">
                    依陰德值{' '}
                    {sortBy === 'sortPriceDESC' ? <FaSortDown /> : <FaSortUp />}
                </label>

                <p>總資料筆數：{displayTotalRows}</p>
            </div>
        </>
    );
}

export default SortRow;
