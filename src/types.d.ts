export type FiltersFormType = {
  showCity: boolean;
  showRegion: boolean;
  showCountry: boolean;
  showPersons: boolean;
  showBathrooms: boolean;
  showBedrooms: boolean;
  showPrice: boolean;
  categories: number[];
  no_results: number;
  location: string;
};

type BookingFormType = {
  adults_from: number;
  children: boolean;
  children_from: number;
  children_til: number;
  babies: boolean;
  babies_til: number;
  showDiscountCode: boolean;
};

type name_id_type = {
  id: number;
  name: string;
};

type PortalOptions = {
  filtersForm: FiltersFormType;
  bookingFields: object[];
  bookingForm: BookingFormType;
};

export type PortalSiteType = {
  categories: { id: number; name: string; properties: name_id_type[] }[];
  options: PortalOptions;
  max_persons: number;
  name: string;
  max_bedrooms: number;
  max_bathrooms: number;
  max_weekprice: number;
};

export type LocaleType = 'nl' | 'en' | 'de' | 'es' | 'fr' | 'it';

export type BuDate = {
  arrival: Boolean;
  departure: Boolean;
  min_nights: Number;
  max_nights: Number;
  date: string;
  special_offer: Number;
};

export type HouseType = {
  id: number;
  code: string;
  house_type: string;
  persons: number;
  max_nights: number
  allow_option?: boolean;
  cancel_insurance?: boolean;
  discounts?: string;
  discounts_info?: string;
  booking_price?: {
    optional_house_costs: {
      id: number;
    }[];
  };
};
