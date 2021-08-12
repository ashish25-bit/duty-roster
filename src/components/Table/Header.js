import React, { Fragment, useEffect, useState } from "react";
import { weekDays } from "../../utils/constant";
import { useData } from "../../utils/DataProvider";

const Header = () => {
  const month = parseInt(useData().month);
  const year = parseInt(useData().year);
  const days = parseInt(useData().days);
  const [weeks, setWeek] = useState([]);

  useEffect(() => {
    let index = new Date(year, month, 1).getDay();

    let order = [];
    for (let i = 0; i < days; i++, index++) {
      order.push(weekDays[index % 7]);
    }

    setWeek(order);
  }, [month, year, days]);

  return (
    <Fragment>
      <thead>
        <tr>
          <th>SNO</th>
          <th>Name</th>
          <th>Des.</th>
          {[...Array(days).keys(days)].map((val) => (
            <th key={val}>{val + 1 <= 9 ? `0${val + 1}` : val + 1} </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="weekday-row">
          <td colSpan="2"></td>
          <td></td>
          { weeks.map((week, index) => <td key={index}>{week} </td>) }
        </tr>
      </tbody>
    </Fragment>
  );
};

export default Header;
