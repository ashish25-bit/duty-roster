import { monthDays } from './constant';

export function getDays(month, year) {
  if (month === 1) {
    if (isLeapYear(year))
      return monthDays[month].days + 1;
  }
  return monthDays[month].days;
}

function isLeapYear(year) {
  if (year % 400 === 0)
    return true;

  if (year % 100 === 0)
    return false;

  if (year % 4 === 0)
    return true;

  return false;
}
