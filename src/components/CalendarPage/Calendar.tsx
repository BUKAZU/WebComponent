import React from 'react';
import {
  isAfter,
  differenceInCalendarDays,
  addMonths,
  subMonths
} from 'date-fns';
import { Parse_EN_US } from '../../_lib/date_helper';
import CalendarHeader from './CalendarParts/CalendarHeader';
import AssistanceMessage from './formParts/AssistanceMessage';
import Legend from './CalendarParts/Legend';
import Months from './CalendarParts/Months';
import StartBooking from './CalendarParts/StartBooking';
import { BuDate, HouseType } from '../../types';

interface Props {
  numberOfMonths: number;
  numberOfMonthsInARow: number;
  house: HouseType;
}

interface State {
  currentMonth: Date;
  selectedDate: string | Date;
  startBooking: Boolean;
  arrivalDate: string | BuDate;
  departureDate: string | BuDate;
}

class Calendar extends React.Component<Props, State> {
  state = {
    currentMonth: new Date(),
    selectedDate: '',
    arrivalDate: '',
    departureDate: '',
    startBooking: false
  };

  onDateClick = (day: BuDate) => {
    const { arrivalDate, selectedDate } = this.state;
    const { house } = this.props;

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
    const { currentMonth } = this.state;
    const { numberOfMonths } = this.props;

    this.setState({
      currentMonth: addMonths(currentMonth, numberOfMonths)
    });
  };

  prevMonth = () => {
    const { currentMonth } = this.state;
    const { numberOfMonths } = this.props;
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
      house,
      onBooking
    } = this.props;

    console.log({ house });

    return (
      <div className="calendar-container ">
        <StartBooking
          dates={{
            arrivalDate,
            departureDate,
            startBooking
          }}
          house={house}
          onStartBooking={onBooking}
        />
        <div className="calendar-section">
          <CalendarHeader
            onGoNext={this.nextMonth}
            onGoPrev={this.prevMonth}
            onReset={this.reset}
          />
          <Months
            house={house}
            numberOfMonths={numberOfMonths}
            numberOfMonthsInARow={numberOfMonthsInARow}
            dates={{
              arrivalDate,
              departureDate,
              selectedDate
            }}
            onDateClick={this.onDateClick}
            currentMonth={currentMonth}
          />
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

export default Calendar;
