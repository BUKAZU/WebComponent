export default {
    selectDate(state, payload) {
        state.bookingState.selectedDate = payload.date;
        if (!state.bookingState.arrivalDate) {
            state.bookingState.arrivalDate = payload;
        } else if (!state.bookingState.departureDate) {
            state.bookingState.departureDate = payload;
        } else {
            state.bookingState.arrivalDate = payload;
            state.bookingState.departureDate = null;
        }
        return state;
    }
};