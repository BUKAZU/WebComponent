import React from 'react';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  isBefore,
  isAfter,
  differenceInCalendarDays,
  addMonths,
  isSameMonth,
  parse,
  isSameDay
} from 'date-fns';
import { FormatIntl, Parse_EN_US } from '../../../_lib/date_helper';
import DayClasses from './DayClasses';
import { HouseType } from '../../../types';

interface CellProps {
  availabilities: [];
  month: Date;
  discounts: [];
  dates: {
    selectedDate: string;
    departureDate: object;
    arrivalDate: string;
  };
  house: HouseType;
  onDateClick: Function;
}

function RenderCells({
  availabilities,
  month,
  discounts,
  dates,
  house,
  onDateClick
}: CellProps): JSX.Element {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const rows: JSX.Element[] = [];

  let days: JSX.Element[] = [];
  let day: Date = startDate;

  while (day <= endDate) {
    // for (let daz of dayz) {
    for (let i = 0; i < 7; i++) {
      let date = FormatIntl(day, 'yyyy-MM-dd');
      let yesterday = FormatIntl(subDays(day, 1), 'yyyy-MM-dd');
      let daz = availabilities.find((x) => x.date === date);

      const prevBooked = availabilities.find((x) => x.date === yesterday);
      const cloneDay = daz;

      days.push(
        <div
          className={DayClasses({
            day,
            monthStart,
            discounts,
            buDate: daz,
            prevBooked,
            house,
            dates,
          })}
          key={daz.date}
          date={daz.date}
          role="button"
          tabIndex={0}
          onClick={() => onDateClick(cloneDay)}
          onKeyPress={() => onDateClick(cloneDay)}
        >
          <span>{FormatIntl(day, 'd')}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
}

export default RenderCells;
