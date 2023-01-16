import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FormatIntl, LONG_DATE_FORMAT } from '../../../_lib/date_helper';

export const Summary = ({ house, bookingPrice }) => (
  <React.Fragment>
    <h2>
      <FormattedMessage id="booking_details" />
    </h2>
    <div className="house-details">
      <div>{house.name}</div>
      <img src={house.image_url} alt="" />
      <table>
        <tbody>
          <tr>
            <th>
              <FormattedMessage id={`${house.house_type}.arrival`} />
            </th>
            <td className="price">
              {FormatIntl(bookingPrice.arrival_date, LONG_DATE_FORMAT)}
            </td>
            <td>{bookingPrice.arrival_time}</td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id={`${house.house_type}.departure`} />
            </th>
            <td className="price">
              {FormatIntl(bookingPrice.departure_date, LONG_DATE_FORMAT)}
            </td>
            <td>{bookingPrice.departure_time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </React.Fragment>
);

Summary.propTypes = {
  house: PropTypes.object.isRequired,
  bookingPrice: PropTypes.object.isRequired,
};
