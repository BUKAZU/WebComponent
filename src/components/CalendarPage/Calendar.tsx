import React, { useState } from 'react';
import CalendarHeader from './CalendarParts/CalendarHeader';
import AssistanceMessage from './formParts/AssistanceMessage';
import Legend from './CalendarParts/Legend';
import Months from './CalendarParts/Months';
import StartBooking from './CalendarParts/StartBooking';
import { HouseType, PortalSiteType } from '../../types';

interface Props {
  numberOfMonths: number;
  numberOfMonthsInARow: number;
  house: HouseType;
  PortalSite: PortalSiteType;
  locale: string;
  objectCode: string;
}

function Calendar({
  numberOfMonths,
  house,
  numberOfMonthsInARow,
  PortalSite,
  locale,
  objectCode
}: Props): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  return (
    <div className="calendar-container ">
      <StartBooking house={house} />
      <div className="calendar-section">
        <CalendarHeader
          changeMonth={setCurrentMonth}
          currentMonth={currentMonth}
          numberOfMonths={numberOfMonths}
        />
        <Months
          house={house}
          numberOfMonths={numberOfMonths}
          numberOfMonthsInARow={numberOfMonthsInARow}
          currentMonth={currentMonth}
          PortalSite={PortalSite}
          locale={locale}
          objectCode={objectCode}
        />
        <Legend house={house} />
        <AssistanceMessage house={house} />
      </div>
    </div>
  );
}

Calendar.defaultProps = {
  numberOfMonths: 4,
  numberOfMonthsInARow: 2
};

export default Calendar;
