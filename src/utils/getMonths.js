import { monthDays } from './constant';

export function getMonths() {
  const res = monthDays.map((data) => {
    return data.month;
  });

  return res;
}