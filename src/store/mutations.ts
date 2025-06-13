import { Parse_EN_US } from '../_lib/date_helper';
import { differenceInCalendarDays, isAfter } from 'date-fns';
import { BookingType } from '../components/CalendarPage/calender_types';

export default {
    selectDate(state: BookingType, payload: any) {
        const { selectedDate, arrivalDate } = state.bookingState;
        const date = Parse_EN_US(payload.date);
        const defaultMaxPersons = payload.house.persons > 2 ? 2 : payload.house.persons;

        if (
            payload.departure &&
            selectedDate &&
            arrivalDate &&
            isAfter(date, selectedDate) &&
            differenceInCalendarDays(date, selectedDate) <= payload.house.max_nights &&
            differenceInCalendarDays(date, selectedDate) >=
            arrivalDate.min_nights &&
            differenceInCalendarDays(date, selectedDate) <= arrivalDate.max_nights
        ) {
            state.bookingState.departureDate = payload;
        }
        else if (payload.arrival) {
            state.bookingState = {
                ...state.bookingState,
                arrivalDate: payload,
                departureDate: null,
                persons: defaultMaxPersons,
                bookingStarted: false,
                selectedDate: date
            }
        }
        return state;
    }
};