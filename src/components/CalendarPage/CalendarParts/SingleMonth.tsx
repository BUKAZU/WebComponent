import { useQuery } from '@apollo/client';
import {
  addMonths,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek
} from 'date-fns';
import React from 'react';
import { CALENDAR_QUERY } from '../../../_lib/queries';
import Loading from '../../icons/loading.svg';
import MonthHeader from './MonthHeader';
import RenderCells from './RenderCells';
import WeekDays from './WeekDays';

interface Props {
  count: number;
  currentMonth: Date;
  house: {
    code: string;
  };
  dates: {
    arrivalDate: Object;
    selectedDate: Object;
    departureDate: Object;
  };
  numberOfMonthsInARow: Number;
  onDateClick: Function;
  portalCode: string;
}

function SingleMonth({
  count,
  currentMonth,
  house,
  numberOfMonthsInARow,
  dates,
  portalCode,
  onDateClick
}: Props): JSX.Element {
  let month = addMonths(currentMonth, count);
  let monthStart = startOfMonth(month);
  let monthEnd = endOfMonth(month);
  const variables = {
    id: portalCode,
    house_id: house.code,
    starts_at: startOfWeek(monthStart),
    ends_at: endOfWeek(monthEnd)
  };

  const { loading, error, data } = useQuery(CALENDAR_QUERY, { variables });

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) {
    return <div>Error</div>;
  }

  const results = data.PortalSite.houses[0].availabilities;
  const discounts = data.Discounts;

  return (
    <div className={`calendar calendar-${numberOfMonthsInARow}`} key={month}>
      <MonthHeader month={month} />
      <WeekDays month={month} />

      <RenderCells
        availabilities={results}
        discounts={discounts}
        month={month}
        house={house}
        dates={dates}
        onDateClick={onDateClick}
      />
    </div>
  );
}

export default SingleMonth;
