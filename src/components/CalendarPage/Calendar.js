import React from 'react';
import PropTypes from 'prop-types';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subDays,
  isBefore,
  isAfter,
  differenceInCalendarDays,
  addMonths,
  isSameMonth,
  parse,
  isSameDay,
} from 'date-fns';
import { Query } from '@apollo/client/react/components';
import Loading from '../icons/loading.svg';
import { FormatIntl, Parse_EN_US } from '../../_lib/date_helper';
import CalendarHeader from './CalendarHeader';
import PriceField from './PriceField';

import { CALENDAR_QUERY } from '../../_lib/queries';
import AssistanceMessage from './formParts/AssistanceMessage';
import MonthHeader from './CalendarParts/MonthHeader';
import Legend from './CalendarParts/Legend';
import RenderCells from './CalendarParts/RenderCells';
import WeekDays from './CalendarParts/WeekDays';
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

  renderSingleMonth(count) {
    const {
      numberOfMonthsInARow,
      house,
      arrivalDate,
      selectedDate,
      departureDate,
    } = this.state;
    let month = addMonths(this.state.currentMonth, count);
    let monthStart = startOfMonth(month);
    let monthEnd = endOfMonth(month);
    const variables = {
      id: this.props.portalCode,
      house_id: this.props.objectCode,
      starts_at: startOfWeek(monthStart),
      ends_at: endOfWeek(monthEnd),
      locale: this.props.locale,
    };

    return (
      <div className={`calendar calendar-${numberOfMonthsInARow}`} key={month}>
        <MonthHeader month={month} />
        <WeekDays month={month} />
        <Query query={CALENDAR_QUERY} variables={variables}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <div>
                  <Loading />
                </div>
              );
            if (error) {
              return <div>Error</div>;
            }

            const results = data.PortalSite.houses[0].availabilities;
            const discounts = data.Discounts;

            return (
              <RenderCells
                availabilities={results}
                discounts={discounts}
                month={month}
                house={house}
                dates={{ arrivalDate, selectedDate, departureDate }}
                onDateClick={this.onDateClick}
              />
            );
          }}
        </Query>
      </div>
    );
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
    const { portalCode, objectCode, locale } = this.props;

    return (
      <PriceField
        portalCode={portalCode}
        objectCode={objectCode}
        locale={locale}
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
    const { portalCode, objectCode, locale } = this.props;
    const booking = {
      portalCode,
      objectCode,
      arrivalDate,
      departureDate,
      is_option: status,
      locale,
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
