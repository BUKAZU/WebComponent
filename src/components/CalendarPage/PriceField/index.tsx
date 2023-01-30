import React, { Component, useState } from 'react';
import {
  FormatIntl,
  LONG_DATE_FORMAT,
  Parse_EN_US
} from '../../../_lib/date_helper';
import { FormattedMessage } from 'react-intl';
import { createPeronsArray } from '../formParts/BookingHelpers';
import Price from './Price';
import { HouseType } from '../../../types';

const dateFormat = LONG_DATE_FORMAT;

interface Props {
  startsAt: string | null;
  endsAt: string | null;
  house: HouseType;
  disabled: boolean;
  onStartBooking: Function;
  minNights: number | null;
}

function PriceField({
  startsAt,
  endsAt,
  house,
  disabled,
  onStartBooking,
  minNights
}: Props) {
  const [persons, setPersons] = useState(2);

  let adults = createPeronsArray(house.persons);

  return (
    <div className="calendar--picker">
      <div className="calendar--picker--date">
        <span className="name">
          <FormattedMessage id={`${house.house_type}.arrival`} />
        </span>
        <span className="detail">
          {startsAt ? (
            <span>{FormatIntl(Parse_EN_US(startsAt), dateFormat)}</span>
          ) : (
            <FormattedMessage
              id={`${house.house_type}.pick_your_arrivaldate_in_the_calendar`}
            />
          )}
        </span>
      </div>
      <div className="calendar--picker--date">
        <span className="name">
          <FormattedMessage id={`${house.house_type}.departure`} />
        </span>
        <span className="detail">
          {endsAt ? (
            <span>{FormatIntl(Parse_EN_US(endsAt), dateFormat)}</span>
          ) : (
            <div>
              <div>
                <FormattedMessage
                  id={`${house.house_type}.pick_your_departure_in_the_calendar`}
                />
              </div>
              {minNights && (
                <FormattedMessage
                  id="minimum_nights"
                  defaultMessage="Minimum {minimum} nights"
                  values={{ minimum: minNights }}
                />
              )}
            </div>
          )}
        </span>
      </div>
      <div className="calendar--picker--date">
        <span className="detail">
          <select
            className="calendar--picker--persons"
            value={persons}
            onChange={(e) => {
              setPersons(e.target.value);
            }}
          >
            {adults.map((person) => (
              <FormattedMessage
                id="persons"
                key={person}
                children={(text) => (
                  <option value={person} key={person}>
                    {person} {text}
                  </option>
                )}
              />
            ))}
          </select>
        </span>
      </div>
      <div className="calendar--picker--date">
        {startsAt && endsAt && (
          <Price
            persons={parseInt(persons)}
            variables={{
              starts_at: startsAt,
              ends_at: endsAt
            }}
          />
        )}
      </div>
      <button
        className="button"
        disabled={!disabled}
        onClick={() => {
          if (startsAt && endsAt) {
            onStartBooking({ persons });
          }
        }}
      >
        <FormattedMessage id="calculate" />
      </button>
    </div>
  );
}

export default PriceField;
