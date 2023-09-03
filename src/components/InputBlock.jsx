import React from "react";

const InputBlock = ({
  sortByPriceFrom,
  setSortByPriceFrom,
  sortByPriceTo,
  setSortByPriceTo,
  type,
}) => {
  const handleSortByPriceFromChange = (e) => {
    setSortByPriceFrom(e.target.value);
  };

  const handleSortByPriceToChange = (e) => {
    setSortByPriceTo(e.target.value);
  };

  return (
    <section>
      <section className="inputBlock">
        <div>
          <label htmlFor="from">От: </label>
          <input
            className="input"
            id="from"
            type={type}
            value={sortByPriceFrom}
            onChange={handleSortByPriceFromChange}
          />
        </div>
        <div>
          <label htmlFor="to">До: </label>
          <input
            className="input"
            id="to"
            type={type}
            value={sortByPriceTo}
            onChange={handleSortByPriceToChange}
          />
        </div>
      </section>
    </section>
  );
};

export default InputBlock;
