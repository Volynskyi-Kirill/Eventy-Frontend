'use client';

import {
  CityType,
  CountryType,
  StateType,
} from '@/components/shared/accountSettings/LocationSelects';
import citiesData from '@/lib/countryData/citiesminified.json';
import countriesData from '@/lib/countryData/countriesminified.json';
import statesData from '@/lib/countryData/statesminified.json';

export function convertLocation<T>(
  value: string | T | null,
  convertFn: (value: string) => T | null
): T | null {
  return typeof value === 'string' ? convertFn(value) : value;
}

export function getCountryByName(name: string): CountryType | null {
  const countries = countriesData as CountryType[];

  return countries.find((c) => c.name === name) || null;
}

export function getStateByName(name: string): StateType | null {
  const arr = statesData as { states: StateType[] }[];

  const allStates = arr.flatMap((item) => item.states);

  return allStates.find((s) => s.name === name) || null;
}

export function getCityByName(name: string): CityType | null {
  const arr = citiesData as { states: { cities: CityType[] }[] }[];

  const allCities = arr.flatMap((item) =>
    item.states.flatMap((state) => state.cities)
  );

  return allCities.find((c) => c.name === name) || null;
}
