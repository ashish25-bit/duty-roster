import React from "react";
import NameInput from "./NameInput";
import DutySelector from "./DutySelector";
import { useData } from "../../utils/DataProvider";

const Row = ({ index, data, openModal }) => {
  let days = parseInt(useData().days);
  return (
    <tr>
      <td
        style={{ textAlign: "center", cursor: "pointer" }}
        onClick={() => openModal(true, index)}
      >
        {index + 1}
      </td>
      <NameInput nameClass={"name"} row={index} value={data.name} />
      <NameInput nameClass={"designation"} row={index} value={data.deg} />
      {[...Array(days).keys()].map((col) => (
        <DutySelector key={col} row={index} column={col} initialValue={data.duty[col]} />
      ))}
    </tr>
  );
};

export default Row;
