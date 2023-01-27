import React from 'react';
import PropTypes from 'prop-types';
import {
  isAfter,
  differenceInCalendarDays,
  addMonths,
  subMonths
} from 'date-fns';
import { Parse_EN_US } from '../../_lib/date_helper';
import CalendarHeader from './CalendarHeader';
import PriceField from './PriceField';

import AssistanceMessage from './formParts/AssistanceMessage';
import Legend from './CalendarParts/Legend';
import SingleMonth from './CalendarParts/SingleMonth';
import Months from './CalendarParts/Months';
import StartBooking from './CalendarParts/StartBooking';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentMonth: new Date(),
    selectedDate: '',
    numberOfMonths: this.props.numberOfMonths,
    numberOfMonthsInARow: this.props.numberOfMonthsInARow,
    house: this.props.house,
    arrivalDate: '',
    departureDate: '',
    startBooking: false
  };

  onDateClick = (day) => {
    const { arrivalDate, selectedDate } = this.state;
    const { house } = this.props
    
    const date = Parse_EN_US(day.date);

    if (
      day.departure &&
      isAfter(date, selectedDate) &&
      differenceInCalendarDays(date, selectedDate) <= house.max_nights &&
      differenceInCalendarDays(date, selectedDate) >= arrivalDate.min_nights &&
      differenceInCalendarDays(date, selectedDate) <= arrivalDate.max_nights
    ) {
      this.setState({
        departureDate: day,
        startBooking: true
      });
    } else if (day.arrival) {
      this.setState({
        startBooking: false,
        selectedDate: date,
        arrivalDate: day,
        departureDate: ''
      });
    }
  };

  nextMonth = () => {
    const { numberOfMonths, currentMonth } = this.state;
    this.setState({
      currentMonth: addMonths(currentMonth, numberOfMonths)
    });
  };

  prevMonth = () => {
    const { numberOfMonths, currentMonth } = this.state;
    this.setState({
      currentMonth: subMonths(currentMonth, numberOfMonths)
    });
  };

  reset = () => {
    this.setState({
      selectedDate: '',
      arrivalDate: '',
      departureDate: '',
      startBooking: false
    });
  };

  render() {
    const {
      arrivalDate,
      departureDate,
      selectedDate,
      currentMonth,
      startBooking
    } = this.state;
    const {
      numberOfMonths,
      numberOfMonthsInARow,
      portalCode,
      house,
      onBooking
    } = this.props;

    console.log({ house });

    return (
      <div className="calendar-container ">
        <div className="price-overview">
          <StartBooking
            dates={{
              arrivalDate,
              departureDate,
              startBooking
            }}
            house={house}
            portalCode={portalCode}
            onStartBooking={onBooking}
          />
        </div>
        <div className="calendar-section">
          <CalendarHeader
            onGoNext={this.nextMonth}
            onGoPrev={this.prevMonth}
            onReset={this.reset}
          />
          <div className="calendars-row">
            <Months
              house={house}
              numberOfMonths={numberOfMonths}
              numberOfMonthsInARow={numberOfMonthsInARow}
              portalCode={portalCode}
              dates={{
                arrivalDate,
                departureDate,
                selectedDate
              }}
              onDateClick={this.onDateClick}
              currentMonth={currentMonth}
            />
          </div>
          <Legend house={house} />
          <AssistanceMessage
            house={house}
            arrivalDate={arrivalDate}
            departureDate={departureDate}
            minNights={arrivalDate.min_nights}
          />
        </div>
      </div>
    );
  }
}

Calendar.defaultProps = {
  numberOfMonths: 4,
  numberOfMonthsInARow: 2
};

Calendar.propTypes = {
  numberOfMonths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  house: PropTypes.object.isRequired,
  onBooking: PropTypes.func.isRequired,
  objectCode: PropTypes.string.isRequired,
  portalCode: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired
};

export default Calendar;
