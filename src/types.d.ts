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

export type BuDate = {};
