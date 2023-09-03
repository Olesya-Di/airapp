import React from "react";
import Label from "./UI/Label";

const CheckboxBlock = ({
  direct,
  transfer,
  handleDirectChange,
  handleTransferChange,
}) => {
  return (
    <section>
      <section className="сheckboxBlock">
        <div>
          <input
            type="checkbox"
            id="one"
            checked={transfer}
            onChange={handleTransferChange}
          />
          <Label htmlFor="one" labelText=" - 1 пересадка" />
        </div>
        <div>
          <input
            type="checkbox"
            id="none"
            checked={direct}
            onChange={handleDirectChange}
          />
          <Label htmlFor="none" labelText=" - без пересадок" />
        </div>
      </section>
    </section>
  );
};

export default CheckboxBlock;
