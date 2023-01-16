import React from 'react';
import PropTypes from 'prop-types';
import {
  isAfter,
  differenceInCalendarDays,
  addMonths,
  subMonths,
} from 'date-fns';
import { Parse_EN_US } from '../../_lib/date_helper';
import CalendarHeader from './CalendarHeader';
import PriceField from './PriceField';

import AssistanceMessage from './formParts/AssistanceMessage';
import Legend from './CalendarParts/Legend';
import SingleMonth from './CalendarParts/SingleMonth';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.bookingStart = this.bookingStart.bind(this);
  }

  state = {
    currentMonth: new Date(),
    selectedDate: '',
    numberOfMonths: this.props.numberOfMonths,
    numberOfMonthsInARow: this.props.numberOfMonthsInARow,
    house: this.props.house,
    arrivalDate: '',
    departureDate: '',
    startBooking: false,
  };

  renderMonths() {
    const {
      numberOfMonthsInARow,
      house,
      arrivalDate,
      selectedDate,
      departureDate,
      currentMonth
    } = this.state;
    let template = [];
    for (let i = 0; i < this.state.numberOfMonths; i++) {
      template.push(
        <SingleMonth key={currentMonth + i} house={house} numberOfMonthsInARow={numberOfMonthsInARow} dates={{ arrivalDate, selectedDate, departureDate }} currentMonth={currentMonth} count={i} portalCode={this.props.portalCode} onDateClick={this.onDateClick} />
      );
    }
    return template;
  }

  onDateClick = (day) => {
    const { arrivalDate, selectedDate, house } = this.state;
    const date = Parse_EN_US(day.date)
    if (
      day.departure &&
      isAfter(date, selectedDate) &&
      differenceInCalendarDays(date, selectedDate) <= house.max_nights &&
      differenceInCalendarDays(date, selectedDate) >=
        arrivalDate.min_nights &&
      differenceInCalendarDays(date, selectedDate) <= arrivalDate.max_nights
    ) {
      this.setState({
        departureDate: day,
        startBooking: true,
      });
    } else if (day.arrival) {
      this.setState({
        startBooking: false,
        selectedDate: date,
        arrivalDate: day,
        departureDate: '',
      });
    }
  };

  nextMonth = () => {
    const { numberOfMonths, currentMonth } = this.state;
    this.setState({
      currentMonth: addMonths(currentMonth, numberOfMonths),
    });
  };

  prevMonth = () => {
    const { numberOfMonths, currentMonth } = this.state;
    this.setState({
      currentMonth: subMonths(currentMonth, numberOfMonths),
    });
  };

  reset = () => {
    this.setState({
      selectedDate: '',
      arrivalDate: '',
      departureDate: '',
      startBooking: false,
    });
  };

  showBooking() {
    const { startBooking, arrivalDate, departureDate, house } =
      this.state;
    const { portalCode, objectCode } = this.props;

    return (
      <PriceField
        portalCode={portalCode}
        objectCode={objectCode}
        startsAt={arrivalDate.date || null}
        endsAt={departureDate.date || null}
        minNights={arrivalDate.min_nights || null}
        disabled={startBooking}
        onStartBooking={this.bookingStart}
        house={house}
      />
    );
  }

  bookingStart(status, persons) {
    const { arrivalDate, departureDate } = this.state;
    const { portalCode, objectCode } = this.props;
    const booking = {
      portalCode,
      objectCode,
      arrivalDate,
      departureDate,
      is_option: status,
      persons,
    };
    this.props.onBooking(booking);
  }

  render() {
    const { house, arrivalDate, departureDate } = this.state;

    return (
      <div className="calendar-container ">
        <div className="price-overview">{this.showBooking()}</div>
        <div className="calendar-section">
          <CalendarHeader
            onGoNext={this.nextMonth}
            onGoPrev={this.prevMonth}
            onReset={this.reset}
          />
          <div className="calendars-row">{this.renderMonths()}</div>
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
  numberOfMonthsInARow: 2,
};

Calendar.propTypes = {
  numberOfMonths: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  house: PropTypes.object.isRequired,
  onBooking: PropTypes.func.isRequired,
  objectCode: PropTypes.string.isRequired,
  portalCode: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Calendar;
