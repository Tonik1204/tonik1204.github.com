import moment from 'moment';

export const ZERO_KELVIN = -273;

export const hasOnlyLetters = (value: string): boolean =>
  /^[A-Za-z]+$/.test(value);

export const convertKelvinToCelsius = (value: number): number =>
  Math.round(value + ZERO_KELVIN);

export const getSunData = (text: string, time: number): string =>
  `${text} - ${moment(time * 1000).format('HH:mm')}`;

export const isDayTime = (sunrise: number, sunset: number): boolean => {
  const hours = new Date().getHours();
  return hours > sunrise && hours < sunset;
};
