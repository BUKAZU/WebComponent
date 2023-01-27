import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormatIntl,
  LONG_DATE_FORMAT,
  Parse_EN_US
} from '../../_lib/date_helper';
import { FormattedMessage } from 'react-intl';
import { createPeronsArray } from './formParts/BookingHelpers';
import Price from './PriceField/Price';

const dateFormat = LONG_DATE_FORMAT;

class PriceField extends Component {
  state = {
    persons: 2
  };

  setPersons(persons) {
    this.setState({ persons: persons });
  }

  render() {
    const {
      portalCode,
      objectCode,
      startsAt,
      endsAt,
      house,
      disabled,
      onStartBooking,
      minNights
    } = this.props;
    const { persons } = this.state;

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
                this.setPersons(e.target.value);
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
                id: portalCode,
                house_id: objectCode,
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
}

PriceField.propTypes = {
  portalCode: PropTypes.string.isRequired,
  objectCode: PropTypes.string.isRequired,
  startsAt: PropTypes.string,
  endsAt: PropTypes.string,
  onStartBooking: PropTypes.func.isRequired,
  minNights: PropTypes.number
};

export default PriceField;
