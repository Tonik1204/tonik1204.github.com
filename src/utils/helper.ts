const ZERO_KELVIN = -273.15;

export const hasOnlyLetters = (value: string): boolean =>
  /^[A-Za-z]+$/.test(value);

export const convertKelvinToCelsius = (value: number): number =>
  Math.round(value + ZERO_KELVIN);
