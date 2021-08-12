import React from 'react';
import './index.css';
import SelectedDate from './SelectedDate';
import Selector from './Selector';
import { useData } from '../../utils/DataProvider';

function DateData() {
  const { hasDateAdded } = useData();
  return (
    <div className='date-container'>{
      hasDateAdded ?
        <SelectedDate /> :
        <Selector />
    }</div>
  )
}

export default DateData;
