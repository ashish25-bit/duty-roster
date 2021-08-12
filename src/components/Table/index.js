import React, { Fragment, useEffect, useCallback, useState } from "react";
import Header from "./Header";
import { useData } from "../../utils/DataProvider";
import { saveRowData } from "../../utils/alterData";
import Row from "./Row";
import "./index.css";
import ControllerContainer from "./ControllerContainer";

const Table = () => {
  let { hasDateAdded, rowData, addRow, deleteRowContext } = useData();
  const days = parseInt(useData().days);
  const [isOpen, setIsOpen] = useState(false);
  const [alterIndex, setAlterIndex] = useState(-1);

  const handleUserKeyPress = useCallback(
    (e) => {
      if (e.code === "Enter" && e.ctrlKey) {
        addRow();
      } else if (e.code === "KeyS" && e.ctrlKey) {
        e.preventDefault();
        const data = saveRowData(rowData.length, days);
        localStorage.setItem("duty", JSON.stringify(data));
      }
    },
    [addRow, rowData, days]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => window.removeEventListener("keydown", handleUserKeyPress);
  }, [handleUserKeyPress]);

  function deleteRow() {
    if (alterIndex < 0) return;

    deleteRowContext(alterIndex);
    setIsOpen(false);
    setAlterIndex(-1);
  }

  function openModal(status, index) {
    setIsOpen(status);
    setAlterIndex(index);
  }

  return (
    <Fragment>
      {hasDateAdded && (
        <Fragment>
          <table border="1px" cellSpacing="0" cellPadding="0">
            <Header />
            <tbody>
              {rowData.map((data, index) => (
                <Row
                  key={index}
                  index={index}
                  data={data}
                  openModal={openModal}
                />
              ))}
            </tbody>
          </table>
          {isOpen && (
            <ControllerContainer openModal={openModal} deleteRow={deleteRow} />
          )}

          <div style={{
            marginTop: '30px'
          }}>Signature: </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Table;
