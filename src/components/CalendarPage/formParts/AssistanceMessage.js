import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormatIntl, LONG_DATE_FORMAT, Parse_EN_US } from '../../../_lib/date_helper';

const AssistanceMessage = ({
  arrivalDate,
  departureDate,
  house,
  minNights,
}) => {
  if (departureDate.date) {
    return (
      <div className="assistance">
        <FormattedMessage id={`${house.house_type}.you_picked_arrival_date`} />:{' '}
        {FormatIntl(Parse_EN_US(arrivalDate.date), LONG_DATE_FORMAT)}
        <br />
        <FormattedMessage
          id={`${house.house_type}.you_picked_departure_date`}
        />
        : {FormatIntl(Parse_EN_US(departureDate.date), LONG_DATE_FORMAT)}
      </div>
    );
  }

  if (arrivalDate.date) {
    return (
      <div className="assistance">
        <FormattedMessage id={`${house.house_type}.you_picked_arrival_date`} />:{' '}
        {FormatIntl(Parse_EN_US(arrivalDate.date), LONG_DATE_FORMAT)}
        <br />
        <FormattedMessage
          id={`${house.house_type}.pick_your_departure_in_the_calendar`}
        />
        <br />
        <FormattedMessage
          id="minimum_nights"
          values={{ minimum: minNights }}
          defaultMessage="Minimum {minimum} nights"
        />
      </div>
    );
  }

  return (
    <div className="assistance">
      <FormattedMessage
        id={`${house.house_type}.pick_your_arrivaldate_in_the_calendar`}
      />
    </div>
  );
};

export default AssistanceMessage;
