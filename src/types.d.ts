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

type name_id_type = {
  id: number;
  name: string;
};

type PortalOptions = {
  filtersForm: FiltersFormType;
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
  persons: string;
};
