import { BuDate } from '../../../types';

export type PossibleValues = {
  arrivalDate: BuDate;
  departureDate: BuDate;
  is_option: 'false' | 'true';
  costs: any;
  adults: number;
  children: number;
  babies: number;
  persons: number;
  discount: number;
  country: number;
  cancel_insurance: '0' | '1' | '2';
  discount_code: string;
};

export type BookingFieldsType = SingleBookingFieldType[];

export type SingleBookingFieldType = {
  id: string;
  label: string;
  type: InputTypes;
  options?: string[];
  required?: boolean;
  mandatory?: boolean;
  rows?: number;
  placeholder?: string;
};

type InputTypes =
  | 'textarea'
  | 'text'
  | 'email'
  | 'date'
  | 'country'
  | 'select'
  | 'booking_field';
