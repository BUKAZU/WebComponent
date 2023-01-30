import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Loading from '../icons/loading.svg';
import FormCreator from './FormCreator';
import { BOOKING_PRICE_QUERY } from '../../_lib/queries';
import { useQuery } from '@apollo/client';
import { AppContext } from '../AppContext';

interface Props {
  booking: object;
  onReturn: Function;
}

function BookingForm({ booking, onReturn }: Props): JSX.Element {
  const { portalCode, objectCode } = useContext(AppContext);
  const { data, loading, error } = useQuery(BOOKING_PRICE_QUERY, {
    variables: {
      portalCode,
      objectCode,
      starts_at: booking.arrivalDate.date,
      ends_at: booking.departureDate.date
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
      booking={booking}
      PortalSite={data.PortalSite}
      onReturn={() => {
        onReturn(booking);
      }}
    />
  );
}

BookingForm.propTypes = {
  booking: PropTypes.object.isRequired,
  onReturn: PropTypes.func.isRequired
};

export default BookingForm;
