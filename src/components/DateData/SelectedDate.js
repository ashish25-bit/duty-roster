import React from "react";
import { useData } from "../../utils/DataProvider";
import { monthDays } from "../../utils/constant";

const SelectedDate = () => {
  const { month, year, removeData } = useData();

  const createNew = () => {
    if (window.confirm("All your data will be lost")) {
      removeData();
    }
  };

  return (
    <div className="selected-date" style={{ "--i": 2 }}>
      <div>
        <h1>{monthDays[month].month} {year}</h1>
      </div>
      <div>
        <button
          className="clear"
          onClick={() => {
            createNew();
          }}
        >
          Create New
        </button>
      </div>
    </div>
  );
};

export default SelectedDate;
