import React, { Fragment, useEffect, useCallback, useState, useRef } from "react";
import Header from "./Header";
import { useData } from "../../utils/DataProvider";
import { saveRowData } from "../../utils/alterData";
import Row from "./Row";
import "./index.css";
import ControllerContainer from "./ControllerContainer";
import { KEYBOARD_ACTIONS } from "../../utils/actions";

const Table = () => {
  let { hasDateAdded, rowData, addRow, deleteRowContext } = useData();
  const days = parseInt(useData().days);
  const [isOpen, setIsOpen] = useState(false);
  const [alterIndex, setAlterIndex] = useState(-1);

  const mainTableBody = useRef();

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

  function onKeyDownHandler(e) {
    if (!e.ctrlKey)
      return;

    const code = e.code;

    if (![
      KEYBOARD_ACTIONS.down,
      KEYBOARD_ACTIONS.up,
      KEYBOARD_ACTIONS.right,
      KEYBOARD_ACTIONS.left,
    ].includes(code)) return;

    if (!mainTableBody?.current)
      return;

    const currRow = +e.target.getAttribute('row');
    const currCol = +e.target.getAttribute('col');

    const rows = mainTableBody.current.childNodes;

    if (!rows || rows.length === 0)
      return;

    if (code === KEYBOARD_ACTIONS.right) {
      const cols = rows[currRow].childNodes;

      if (!cols || cols.length === 0)
        return;

      if (currCol + 1 >= cols.length)
        return;

      cols[currCol+1]?.childNodes[0]?.focus();
    }

    if (code === KEYBOARD_ACTIONS.left) {
      const cols = rows[currRow].childNodes;

      if (!cols || cols.length === 0)
        return;

      if (currCol - 1 <= 0)
        return;

      cols[currCol-1]?.childNodes[0]?.focus();
    }

    if (code === KEYBOARD_ACTIONS.up) {
      if (currRow - 1 < 0)
        return;

      const cols = rows[currRow - 1].childNodes;

      if (!cols || cols.length === 0)
        return;

      cols[currCol]?.childNodes[0]?.focus();
    }

    if (code === KEYBOARD_ACTIONS.down) {
      if (currRow + 1 >= rows.length)
        return;

      const cols = rows[currRow + 1].childNodes;

      if (!cols || cols.length === 0)
        return;

      cols[currCol]?.childNodes[0]?.focus();
    }
  }

  return (
    <Fragment>
      {hasDateAdded && (
        <Fragment>
          <table border="1px" cellSpacing="0" cellPadding="0">
            <Header />
            <tbody ref={mainTableBody}>
              {rowData.map((data, index) => (
                <Row
                  key={index}
                  index={index}
                  data={data}
                  openModal={openModal}
                  onKeyDownHandler={onKeyDownHandler}
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
