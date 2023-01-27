import React from 'react';
import { HouseType } from '../../../types';
import { DatesType } from '../calender_types';
import PriceField from '../PriceField';

interface Props {
  dates: DatesType;
  portalCode: string;
  house: HouseType;
  onStartBooking: Function;
}

function StartBooking({
  dates,
  portalCode,
  house,
  onStartBooking
}: Props): JSX.Element {
  const { startBooking, arrivalDate, departureDate } = dates;

  const bookingStart = ({
    persons
  }: {
    persons: number;
  }) => {    
    const booking = {
      portalCode,
      objectCode: house.code,
      arrivalDate,
      departureDate,
      is_option: 'false',
      persons
    };
    onStartBooking(booking);
  };

  return (
    <PriceField
      portalCode={portalCode}
      objectCode={house.code}
      startsAt={arrivalDate.date || null}
      endsAt={departureDate.date || null}
      minNights={arrivalDate.min_nights || null}
      disabled={startBooking}
      onStartBooking={bookingStart}
      house={house}
    />
  );
}

export default StartBooking;
