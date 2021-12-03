import React from "react";
import NameInput from "./NameInput";
import DutySelector from "./DutySelector";
import { useData } from "../../utils/DataProvider";

const Row = ({ index, data, openModal, onKeyDownHandler }) => {
  let days = parseInt(useData().days);
  return (
    <tr>
      <td
        style={{ textAlign: "center", cursor: "pointer" }}
        onClick={() => openModal(true, index)}
      >
        {index + 1}
      </td>
      <NameInput
        nameClass={"name"}
        row={index}
        value={data.name}
        column={1}
        onKeyDownHandler={onKeyDownHandler}
      />
      <NameInput
        nameClass={"designation"}
        row={index}
        value={data.deg}
        column={2}
        onKeyDownHandler={onKeyDownHandler}
      />
      {[...Array(days).keys()].map((col) => (
        <DutySelector
          key={col}
          row={index}
          column={col}
          initialValue={data.duty[col]}
          onKeyDownHandler={onKeyDownHandler}
        />
      ))}
    </tr>
  );
};

export default Row;
