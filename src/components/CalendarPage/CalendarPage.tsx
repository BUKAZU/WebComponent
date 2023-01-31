import React, { useContext } from 'react';
import BookingForm from './BookingForm';
import GenerateCalendar from './CalendarParts/GenerateCalendar';
import { PortalSiteType } from '../../types';
import {
  CalendarContext,
  CalendarProvider
} from './CalendarParts/CalendarContext';

interface Props {
  PortalSite: PortalSiteType;
}

function CalendarPage({ PortalSite }: Props): JSX.Element {
  const { bookingStarted } = useContext(CalendarContext);

  if (bookingStarted) {
    return <BookingForm />;
  } else {
    return <GenerateCalendar PortalSite={PortalSite} />;
  }
}

CalendarPage.DefaultProps = {
  PortalSite: {
    options: {
      bookingForm: {
        numberOfMonths: 4,
        numberOfMonthsInARow: 2
      }
    }
  }
};

function CalendarWrapper({ PortalSite }: Props): JSX.Element {
  return (
    <CalendarProvider>
      <CalendarPage PortalSite={PortalSite} />
    </CalendarProvider>
  );
}

export default CalendarWrapper;
