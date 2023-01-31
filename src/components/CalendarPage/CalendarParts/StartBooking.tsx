import React from 'react';
import { HouseType } from '../../../types';
import PriceField from '../PriceField';

interface Props {
  house: HouseType;
}

function StartBooking({ house }: Props): JSX.Element {
  return (
    <div className="price-overview">
      <PriceField house={house} />
    </div>
  );
}

export default StartBooking;
