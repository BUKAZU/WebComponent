import {
  addDays,
  differenceInCalendarDays,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  subDays
} from 'date-fns';
import { BuDate } from '../../../types';
import { Parse_EN_US } from '../../../_lib/date_helper';

interface Props {
  day: Date;
  monthStart: Date;
  prevBooked: BuDate;
  buDate: BuDate;
  dates: {
    selectedDate: Date;
    departureDate: BuDate;
    arrivalDate: BuDate;
  };
  house: {
    max_nights: Number;
  };
  discounts: [];
}

function DayClasses({
  day,
  monthStart,
  buDate,
  prevBooked,
  dates,
  house,
  discounts
}: Props): string {
  // console.debug("DayClasses", dates);
  const { selectedDate, departureDate, arrivalDate } = dates;
  let classes = ['bu-calendar-col', 'cell'];
  const selected = Parse_EN_US(selectedDate);

  if (!isSameMonth(day, monthStart)) {
    classes.push('disabled');
    return classes.join(' ');
  }
  if (buDate) {
    if (buDate.arrival && isAfter(day, new Date()) && buDate.max_nights !== 0) {
      if (prevBooked.max_nights === 0) {
        classes.push('departure-arrival');
      } else {
        classes.push('arrival');
        classes.push('arrival');
      }
    } else if (buDate.max_nights === 0) {
      if (prevBooked.max_nights !== 0) {
        classes.push('booked-departure');
      } else {
        classes.push('booked');
      }
    } else if (buDate.max_nights > 0 && prevBooked.max_nights === 0 && !buDate.arrival) {
      classes.push('booked');
    }
  }

  if (selected && selectedDate) {
    if (isSameDay(day, selected)) {
      classes.push('selected');
    }
    const minimum =
      differenceInCalendarDays(day, selected) >= arrivalDate.min_nights;
    const maximum =
      differenceInCalendarDays(day, selected) <= house.max_nights &&
      differenceInCalendarDays(day, selected) <= arrivalDate.max_nights;

    if (
      buDate.departure &&
      isAfter(day, selected) &&
      minimum &&
      maximum &&
      prevBooked.max_nights !== 0
    ) {
      classes.push('departure');
    }
  }

  if (departureDate) {
    if (
      isAfter(day, selected) &&
      isBefore(day, Parse_EN_US(departureDate.date))
    ) {
      classes.push('selected');
    }
    if (isSameDay(day, Parse_EN_US(departureDate.date))) {
      classes.push('selected');
    }
  }

  const daysFromToday = differenceInCalendarDays(day, new Date());
  const last_minute =
    daysFromToday <= house.last_minute_days && daysFromToday > 0;

  const discount = discounts.find(
    (x) =>
      isBefore(subDays(Parse_EN_US(x.discount_starts_at), 1), day) &&
      isAfter(addDays(Parse_EN_US(x.discount_ends_at), 1), day)
  );
  if (last_minute || discount || buDate.special_offer > 0) {
    classes.push('discount');
  }
  return classes.join(' ');
}

export default DayClasses;
