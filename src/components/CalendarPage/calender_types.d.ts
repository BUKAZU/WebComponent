import { BuDate } from "../../types";

export type DatesType = {
  arrivalDate: BuDate;
  selectedDate: Date;
  departureDate: BuDate;
  startBooking: Boolean;
};

export type BookingType {
  arrivalDate: BuDate;
  departureDate: BuDate;
}