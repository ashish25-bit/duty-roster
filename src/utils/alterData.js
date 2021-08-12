export function saveRowData(totalRows, totalDays) {
  if (isNaN(totalRows) || isNaN(totalDays)) {
    return null;
  }

  const nameInputs = document.querySelectorAll('table .name-field');
  const degInputs = document.querySelectorAll('table .designation-field');
  const selectors = document.querySelectorAll('.selector');

  const data = new Array(totalRows);

  for (let i=0; i < totalRows; i++) {
    data[i] = {
      name: '', deg: '',
      duty: new Array(totalDays)
    };
  }

  for (const name of nameInputs) {
    const rowNum = parseInt(name.getAttribute('row'));
    data[rowNum].name = name.value;
  }

  for (const deg of degInputs) {
    const rowNum = parseInt(deg.getAttribute('row'));
    data[rowNum].deg = deg.value;
  }

  for (const duty of selectors) {
    const row = parseInt(duty.getAttribute('row'));
    const col = parseInt(duty.getAttribute('col'));
    data[row].duty[col] = duty.value;
  }

  return data;
}