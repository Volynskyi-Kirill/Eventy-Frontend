// components/account/LocationSelects.tsx
'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
import {
  CountrySelect,
  StateSelect,
  CitySelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

interface LocationSelectProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  // Для StateSelect и CitySelect понадобится передавать выбранное значение страны/области
  countryValue?: any;
  stateValue?: any;
}

/** Компонент выбора страны */
export function CountrySelectInput({
  control,
  name,
  label,
  placeholder,
}: LocationSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <CountrySelect
              placeHolder={placeholder}
              defaultValue={value}
              onChange={(country) => onChange(country)}
              onTextChange={(txt) => {
                // Если нужно реализовать поиск на украинском, можно использовать этот callback
                console.log('Country search:', txt);
              }}
              // Если необходимо, можно передать src с данными, где, например, названия на украинском
              // src="/path/to/your/custom-countries.json"
            />
          </FormControl>
          <FormMessage>{error ? error.message : ''}</FormMessage>
        </FormItem>
      )}
    />
  );
}

/** Компонент выбора области (штата) */
export function StateSelectInput({
  control,
  name,
  label,
  placeholder,
  countryValue,
}: LocationSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <StateSelect
              countryid={countryValue?.id}
              placeHolder={placeholder}
              defaultValue={value}
              onChange={(state) => onChange(state)}
              onTextChange={(txt) => {
                console.log('State search:', txt);
              }}
              // При необходимости, можно передать src с данными
              // src="/path/to/your/custom-states.json"
            />
          </FormControl>
          <FormMessage>{error ? error.message : ''}</FormMessage>
        </FormItem>
      )}
    />
  );
}

/** Компонент выбора города */
export function CitySelectInput({
  control,
  name,
  label,
  placeholder,
  countryValue,
  stateValue,
}: LocationSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <CitySelect
              countryid={countryValue?.id}
              stateid={stateValue?.id}
              placeHolder={placeholder}
              defaultValue={value}
              onChange={(city) => onChange(city)}
              onTextChange={(txt) => {
                console.log('City search:', txt);
              }}
              // При необходимости, можно передать src с данными
              // src="/path/to/your/custom-cities.json"
            />
          </FormControl>
          <FormMessage>{error ? error.message : ''}</FormMessage>
        </FormItem>
      )}
    />
  );
}
