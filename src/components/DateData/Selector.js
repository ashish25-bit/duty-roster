import "./index.css";
import React, { useState } from "react";
import { getDays } from "../../utils/getDays";
import { getMonths } from "../../utils/getMonths";
import { useData } from "../../utils/DataProvider";

const Selector = () => {
  const months = getMonths();
  Object.freeze(months);

  const { setData } = useData();

  const currMonth = new Date().getMonth();
  const currYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currMonth);
  const [selectedYear, setSelectedYear]   = useState(currYear);

  const validateData = () => {
    const yearStr = toString(selectedYear);
    if (
      yearStr.includes("e") ||
      yearStr.includes(".") ||
      yearStr.length !== 4
    ) {
      setSelectedYear(currYear);
    }

    const days = getDays(parseInt(selectedMonth), parseInt(selectedYear));

    setData({
      numberDays: days,
      selectedYear,
      selectedMonth,
    });
  };

  return (
    <div className="selector-container" style={{ "--i": 3 }}>
      <div className="field">
        <label>Select Month: </label>
        <select
          defaultValue={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
          }}
        >
          {months.map((month, index) => {
            return (
              <option key={index} value={index}>
                {month}
              </option>
            );
          })}
        </select>
      </div>

      <div className="field">
        <label>Enter Year: </label>
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>

      <button onClick={() => validateData()}>Generate</button>
    </div>
  );
};

export default Selector;
