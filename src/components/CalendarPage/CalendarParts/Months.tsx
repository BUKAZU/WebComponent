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
  portalCode: string;
  house: HouseType;
  numberOfMonths: number;
  numberOfMonthsInARow: number;
  currentMonth: Date;
  onDateClick: Function;
}

function Months({
  dates,
  portalCode,
  numberOfMonthsInARow,
  currentMonth,
  numberOfMonths,
  onDateClick,
  house
}: Props): JSX.Element[] {
  let template = [];
  for (let i = 0; i < numberOfMonths; i++) {
    template.push(
      <SingleMonth
        key={format(addMonths(currentMonth, i), 'MM-yyyy')}
        house={house}
        numberOfMonthsInARow={numberOfMonthsInARow}
        dates={dates}
        currentMonth={currentMonth}
        count={i}
        portalCode={portalCode}
        onDateClick={onDateClick}
      />
    );
  }
  return template;
}

export default Months;
