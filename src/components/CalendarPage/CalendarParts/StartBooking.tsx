import React from 'react';
import { HouseType } from '../../../types';
import { DatesType } from '../calender_types';
import PriceField from '../PriceField';

interface Props {
  dates: DatesType;
  house: HouseType;
  onStartBooking: Function;
}

function StartBooking({
  dates,  
  house,
  onStartBooking
}: Props): JSX.Element {
  const { startBooking, arrivalDate, departureDate } = dates;

  const bookingStart = ({ persons }: { persons: number }) => {
    const booking = {
      arrivalDate,
      departureDate,
      is_option: 'false',
      persons
    };
    onStartBooking(booking);
  };

  return (
    <div className="price-overview">
      <PriceField
        startsAt={arrivalDate.date || null}
        endsAt={departureDate.date || null}
        minNights={arrivalDate.min_nights || null}
        disabled={startBooking}
        onStartBooking={bookingStart}
        house={house}
      />
    </div>
  );
}

export default StartBooking;
