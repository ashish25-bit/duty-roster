import { createContext, useContext, useState, useEffect } from "react";
import { saveRowData } from './alterData';

export const DataContext = createContext({});

const DataProvider = (props) => {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [days, setDays] = useState(null);
  const [hasDateAdded, setHasDateAdded] = useState(false);
  const [rowData, setRowData] = useState([]);

  function isValidDateData(item) {
    if (item === null || item === undefined) return false;
    return true;
  }

  useEffect(() => {
    if (
      isValidDateData(localStorage.getItem("month")) === false ||
      isValidDateData(localStorage.getItem("year")) === false ||
      isValidDateData(localStorage.getItem("days")) === false
    ) {
      setData(
        { selectedMonth: null, selectedYear: null, numberDays: null },
        false
      );
      setHasDateAdded(false);
    } else {
      setData(
        {
          selectedMonth: localStorage.getItem("month"),
          selectedYear: localStorage.getItem("year"),
          numberDays: localStorage.getItem("days"),
        },
        false
      );
      setHasDateAdded(true);
      if (isValidDateData(JSON.parse(localStorage.getItem("duty"))) === false)
        setRowData([]);
      else setRowData(JSON.parse(localStorage.getItem("duty")));
    }
  }, [month, year, days, hasDateAdded]);

  function printData() {
    console.log(month);
    console.log(year);
    console.log(days);
  }

  function setData({ selectedMonth, selectedYear, numberDays }, check = true) {
    if (!check) {
      setMonth(selectedMonth);
      setYear(selectedYear);
      setDays(numberDays);
      return;
    }

    if (
      selectedMonth === null ||
      selectedMonth === undefined ||
      selectedYear === null ||
      selectedYear === undefined ||
      numberDays === null ||
      numberDays === undefined
    )
      return;

    setMonth(selectedMonth);
    setYear(selectedYear);
    setDays(numberDays);

    localStorage.setItem("month", selectedMonth);
    localStorage.setItem("year", selectedYear);
    localStorage.setItem("days", numberDays);
  }

  function removeData() {
    localStorage.clear();
    setData(
      { selectedMonth: null, selectedYear: null, numberDays: null },
      false
    );
    setHasDateAdded(false);
    setRowData([]);
  }

  function setRowDataContext(data) {
    localStorage.setItem("duty", JSON.stringify(data));
    setRowData(data);
  }

  function addRow() {
    const days = parseInt(localStorage.getItem("days"));

    const obj = {
      name: "",
      deg: "",
      duty: new Array(days),
    };

    setRowData((prevState) => [...prevState, obj]);
  }

  function deleteRowContext(alterIndex) {
    const temp = saveRowData(rowData.length, days).filter((_, index) => index !== alterIndex);

    localStorage.setItem('duty', JSON.stringify(temp));
    window.location.reload();
  }

  return (
    <DataContext.Provider
      value={{
        month,
        setMonth,
        year,
        setYear,
        days,
        setDays,
        printData,
        setData,
        hasDateAdded,
        removeData,
        setRowDataContext,
        rowData,
        addRow,
        deleteRowContext,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
