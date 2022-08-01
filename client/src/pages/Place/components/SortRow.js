function SortRow(props) {
    const { sortBy, setSortBy, handleSort } = props;

    const sortChange = (e) => {
        const nowSort = e.target.value;
        setSortBy(nowSort);
        handleSort(nowSort);
    };

    return (
        <>
            <div className="sort-row">
                <label>排序：</label>
                <input
                    type="radio"
                    name="sort"
                    value="sortYearASC"
                    id="sortYearASC"
                    checked={sortBy === "sortYearASC"}
                    onChange={sortChange}
                />
                <label htmlFor="sortYearASC">依時間 遞增&#9652;</label>
                <input
                    type="radio"
                    name="sort"
                    value="sortYearDESC"
                    id="sortYearDESC"
                    checked={sortBy === "sortYearDESC"}
                    onChange={sortChange}
                />
                <label htmlFor="sortYearDESC">依時間 遞減&#9662;</label>
                <input
                    type="radio"
                    name="sort"
                    value="sortPriceASC"
                    id="sortPriceASC"
                    checked={sortBy === "sortPriceASC"}
                    onChange={sortChange}
                />
                <label htmlFor="sortPriceASC">依陰德值 遞增&#9652;</label>
                <input
                    type="radio"
                    name="sort"
                    value="sortPriceDESC"
                    id="sortPriceDESC"
                    checked={sortBy === "sortPriceDESC"}
                    onChange={sortChange}
                />
                <label htmlFor="sortPriceDESC">依陰德值 遞減&#9662;</label>
            </div>
        </>
    );
}

export default SortRow;
