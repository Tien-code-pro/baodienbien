export interface AccountInfo {
  AccountName: string;
  FullName: string;
  Phone: string;
  Email: string;
  UserGender: string;
  RegisterDate: string;
  LocationID: number;
  LocationName: string;
  DistrictID: number;
  DistrictName: string;
  WardID: number;
  WardNumber: string;
  AddressDetail: string;
}

export interface AccountVerification {
  accountName: string;
  fullName: string;
  phone: string;
  email: string;
  locationID: number;
  locationName: string;
  districtID: number;
  districtName: string;
  wardID: number;
  wardName: string;
  addressDetail: string;
  logID: number;
}

export interface City {
  locationID: number;
  locationName: string;
  nationalID: number;
  position: number;
  status: number;
  crDatetime: number;
}
export interface District {
  districtID: number;
  districtName: string;
  locationID: number;
  position: number;
  status: number;
  crDatetime: number;
}
export interface Ward {
  districtID: number;
  locationID: number;
  position: number;
  status: number;
  wardID: number;
  wardName: string;
  crDatetime: number;
}
export interface CityShort {
  LocationID: number;
  LocationName: string;
}
export interface SitemapType {
  id: number;
}
export interface NewsItem {
  Idx: number;
  Title: string;
  TitleSeo: string;
  Avatar: string;
  Description: string;
  TimePublic: string;
  Content?: string;
  Author: string;
  Keyswords: string;
  MetaDescription: string;
  Slug: string;
  Category_id: number;
  Category_Name: string;
  Category_Slug: string;
}
export interface IProvince {
  id: number;
  code: string;
  name: string;
  fullname: string;
  latitude: number;
  longitute: number;
}

export interface IWeatherData {
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dtTxt: string | null;
}

interface MainWeather {
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  seaLevel: number;
  grndLevel: number;
  tempKf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
  type: number;
  id: number;
  country: string | null;
  sunrise: number;
  sunset: number;
}
export interface FaviconResponse {
  favicon_id: number;
  favicon_name: string;
  image_url: string;
  description: string;
}
export interface SitemapResponse {
  sitemap_id: number;
  title: string;
  description: string;
  url: string;
  last_modified: Date;
  change_frequency: string;
  priority: number;
}
export interface LoginResponse {
  full_name: string;
  token: string;
}

export interface AccountInfoResponse {
  stt: number;
  account_id: number;
  user_name: string;
  full_name: string;
  type: number;
  type_name: null;
  status: number;
  isLogin: null;
  created_date: Date;
  modifily_date: Date;
  last_login: Date;
}

export interface IUserAccount {
  stt: number;
  account_id: number;
  user_name: string;
  full_name: string;
  type: number;
  type_name: string | null;
  status: number;
  isLogin: boolean | null;
  created_date: string; // or Date if you prefer to handle dates as objects
  modifily_date: string; // or Date if you prefer to handle dates as objects
  last_login: string; // or Date if you prefer to handle dates as objects
}
