import React, { useState } from "react";

const NameInput = ({ nameClass, row, value }) => {
  const [name, setName] = useState(value);

  return (
    <td className={nameClass}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`${nameClass}-field`}
        row={row}
      />
    </td>
  );
};

export default NameInput;
