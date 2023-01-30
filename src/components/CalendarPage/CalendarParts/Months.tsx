import { addMonths, format } from 'date-fns';
import React from 'react';
import { HouseType } from '../../../types';
import SingleMonth from './SingleMonth';

interface Props {
  dates: {
    arrivalDate: Object;
    selectedDate: Object;
    departureDate: Object;
  };
  house: HouseType;
  numberOfMonths: number;
  numberOfMonthsInARow: number;
  currentMonth: Date;
  onDateClick: Function;
}

function Months({
  dates,
  numberOfMonthsInARow,
  currentMonth,
  numberOfMonths,
  onDateClick,
  house
}: Props): JSX.Element {
  let template:JSX.Element[] = [];
  
  for (let i = 0; i < numberOfMonths; i++) {
    template.push(
      <SingleMonth
        key={format(addMonths(currentMonth, i), 'MM-yyyy')}
        house={house}
        numberOfMonthsInARow={numberOfMonthsInARow}
        dates={dates}
        currentMonth={currentMonth}
        count={i}
        onDateClick={onDateClick}
      />
    );
  }

  return <div className="calendars-row">{template}</div>;
}

export default Months;
