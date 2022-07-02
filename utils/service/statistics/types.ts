interface Gender {
  unknown: number;
  male: number;
  female: number;
}

export interface StatisticsOverview {
  course: {
    lastMonthAdded: number;
    total: number;
  };
  student: {
    lastMonthAdded: number;
    total: number;
    gender: Gender;
  };
  teacher: {
    lastMonthAdded: number;
    total: number;
    gender: Gender;
  };
}

export interface Statistic {
  name: string;
  amount: number;
}
export interface StatisticsStudent {
  country: Statistic[];
  typeName: Statistic[];
  courses: Statistic[];
  ctime: Statistic[];
  interest: Statistic[];
  type: Statistic[];
}

export interface StatisticsTeacher {
  country: Statistic[];
  ctime: Statistic[];
  skills: (Statistic & { level: number })[][];
  workExperience: string[];
}

export interface StatisticsCourse {
  typeName: Statistic[];
  ctime: Statistic[];
  classTime: ClassTime[];
  type: Statistic[];
  createdAt: Statistic[];
}
interface ClassTime {
  name: string;
  amount: number;
  courses: { typeName: string; name: string; classTime: string[] }[];
}

export interface WorldMap {
  title: string;
  version: string;
  type: string;
  copyright: string;
  copyrightShort: string;
  copyrightUrl: string;
  crs: CRS;
  'hc-transform': HcTransform;
  features: Feature[];
}

export interface CRS {
  type: string;
  properties: CRSProperties;
}

export interface CRSProperties {
  name: string;
}

export interface Feature {
  type: FeatureType;
  id: string;
  properties: FeatureProperties;
  geometry: Geometry;
}

export interface Geometry {
  type: GeometryType;
  coordinates: Array<Array<Array<number[] | number>>>;
}

export enum GeometryType {
  MultiPolygon = 'MultiPolygon',
  Polygon = 'Polygon',
}

export interface FeatureProperties {
  'hc-group': HcGroup;
  'hc-middle-x': number;
  'hc-middle-y': number;
  'hc-key': string;
  'hc-a2': string;
  name: string;
  labelrank: string;
  'country-abbrev': null | string;
  subregion: string;
  'region-wb': RegionWb;
  'iso-a3': string;
  'iso-a2': null | string;
  'woe-id': string;
  continent: Continent;
}

export enum Continent {
  Africa = 'Africa',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SevenSeasOpenOcean = 'Seven seas (open ocean)',
  SouthAmerica = 'South America',
}

export enum HcGroup {
  Admin0 = 'admin0',
}

export enum RegionWb {
  EastAsiaPacific = 'East Asia & Pacific',
  EuropeCentralAsia = 'Europe & Central Asia',
  LatinAmericaCaribbean = 'Latin America & Caribbean',
  MiddleEastNorthAfrica = 'Middle East & North Africa',
  NorthAmerica = 'North America',
  SouthAsia = 'South Asia',
  SubSaharanAfrica = 'Sub-Saharan Africa',
}

export enum FeatureType {
  Feature = 'Feature',
}

export interface HcTransform {
  default: Default;
}

export interface Default {
  crs: string;
  scale: number;
  jsonres: number;
  jsonmarginX: number;
  jsonmarginY: number;
  xoffset: number;
  yoffset: number;
}
