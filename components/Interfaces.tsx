export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}
export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}
export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  precipitation_probability: string;
  visibility: string;
}
export interface Hourly {
  time?: (string)[] | null;
  temperature_2m?: (number)[] | null;
  relativehumidity_2m?: (number)[] | null;
  precipitation_probability?: (number)[] | null;
  visibility?: (number)[] | null;
}
export interface DailyUnits {
  time: string;
  temperature_2m_min: string;
  temperature_2m_max: string;
  sunrise: string;
  sunset: string;
  uv_index_max: string;
  weathercode: string;
}
export interface Daily {
  time?: (string)[] | null;
  temperature_2m_min?: (number)[] | null;
  temperature_2m_max?: (number)[] | null;
  sunrise?: (string)[] | null;
  sunset?: (string)[] | null;
  uv_index_max?: (number)[] | null;
  weathercode?: (number)[] | null;
}
