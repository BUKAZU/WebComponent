import React, { useContext } from 'react';
import Loading from '../icons/loading.svg';
import FormCreator from './FormCreator';
import { BOOKING_PRICE_QUERY } from '../../_lib/queries';
import { useQuery } from '@apollo/client';
import { AppContext } from '../AppContext';
import { CalendarContext } from './CalendarParts/CalendarContext';


function BookingForm(): JSX.Element {
  const { portalCode, objectCode } = useContext(AppContext);
  const { arrivalDate, departureDate } = useContext(CalendarContext)
  const { data, loading, error } = useQuery(BOOKING_PRICE_QUERY, {
    variables: {
      portalCode,
      objectCode,
      starts_at: arrivalDate.date,
      ends_at: departureDate.date
    }
  });

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) {
    return <div>Error</div>;
  }

  const result = data.PortalSite.houses[0];

  return (
    <FormCreator
      house={result}
      PortalSite={data.PortalSite}     
    />
  );
}

export default BookingForm;
