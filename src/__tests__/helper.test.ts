import React from 'react';
import {
  ZERO_KELVIN,
  hasOnlyLetters,
  convertKelvinToCelsius,
} from 'utils/helper';

describe('Helper function hasOnlyLetters', () => {
  it('should work correctly', () => {
    expect(hasOnlyLetters('123test')).toBe(false);
    expect(hasOnlyLetters('test test')).toBe(false);
    expect(hasOnlyLetters('test')).toBe(true);
  });
});

describe('Helper function convertKelvinToCelsius', () => {
  it('should work correctly', () => {
    expect(convertKelvinToCelsius(0)).toBe(ZERO_KELVIN);
    expect(convertKelvinToCelsius('test')).toBeNaN();
  });
});
