export type Category = "Cultural" | "Mixed" | "Natural";

export type CategoryShort = "C" | "C/N" | "N";

export interface Employees {
  emp_no: number | null;
  first_name: string | null;
  last_name: string | null;
}

export interface GeographyColumns {
  f_table_catalog: string | null;
  f_table_schema: string | null;
  f_table_name: string | null;
  f_geography_column: string | null;
  coord_dimension: number | null;
  srid: number | null;
  type: string | null;
}

export interface GeometryColumns {
  f_table_catalog: string | null;
  f_table_schema: string | null;
  f_table_name: string | null;
  f_geometry_column: string | null;
  coord_dimension: number | null;
  srid: number | null;
  type: string | null;
}

export interface WhcSites2021 {
  unique_number: number;
  id_no: number;
  rev_bis: string | null;
  name_en: string;
  name_fr: string;
  short_description_en: string;
  short_description_fr: string;
  justification_en: string | null;
  justification_fr: string | null;
  date_inscribed: number;
  secondary_dates: string | null;
  danger: number | null;
  date_end: number | null;
  danger_list: string | null;
  longitude: number;
  latitude: number;
  area_hectares: number | null;
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
  c6: number;
  n7: number;
  n8: number;
  n9: number;
  n10: number;
  criteria_txt: string;
  category: Category;
  category_short: CategoryShort;
  states_name_en: string;
  states_name_fr: string;
  region_en: string;
  region_fr: string;
  iso_code: string | null;
  udnp_code: string | null;
  transboundary: number;
  location: string | null;
}

export interface DB {
  employees: Employees;
  geography_columns: GeographyColumns;
  geometry_columns: GeometryColumns;
  whc_sites_2021: WhcSites2021;
}
