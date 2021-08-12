import React, { useState } from "react";
import { dutyList } from "../../utils/constant";

const DutySelector = ({ row, column, initialValue }) => {
  const [val, setVal] = useState(initialValue);
  return (
    <td>
      <input
        className="selector"
        type="text"
        list="duty"
        row={row}
        col={column}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <datalist id="duty">
        {dutyList.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </datalist>
    </td>
  );
};

export default DutySelector;
