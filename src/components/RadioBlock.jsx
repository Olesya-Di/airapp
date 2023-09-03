import React from "react";
import Label from "./UI/Label";

const RadioBlock = ({
  sortByPriceAsc,
  handleSortByPriceAscChange,
  sortByPriceDesc,
  handleSortByPriceDescChange,
  sortByDuration,
  handleSortByDurationChange,
}) => {
  return (
    <section>
      <div>
        <input
          id="max"
          type="radio"
          name="sort"
          checked={sortByPriceAsc}
          onChange={handleSortByPriceAscChange}
        />
        <Label htmlFor="max" labelText=" - по возрастанию цены" />
      </div>
      <div>
        <input
          id="min"
          type="radio"
          name="sort"
          checked={sortByPriceDesc}
          onChange={handleSortByPriceDescChange}
        />
        <Label htmlFor="min" labelText=" - по убыванию цены" />
      </div>
      <div>
        <input
          id="duration"
          type="radio"
          name="sort"
          checked={sortByDuration}
          onChange={handleSortByDurationChange}
        />
        <Label htmlFor="duration" labelText=" - по времени в пути" />
      </div>
    </section>
  );
};

export default RadioBlock;
