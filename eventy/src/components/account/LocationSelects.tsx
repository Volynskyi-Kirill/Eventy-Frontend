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

// Типы для объектов локации
export interface CountryType {
  id: number;
  name: string;
  iso2?: string;
}
export interface StateType {
  id: number;
  name: string;
}
export interface CityType {
  id: number;
  name: string;
}

// Универсальный компонент-обёртка для выбора локации
interface LocationSelectFieldProps<T> {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  Component: React.ElementType;
  componentProps: T;
}

function LocationSelectField<T>({
  control,
  name,
  label,
  placeholder,
  Component,
  componentProps,
}: LocationSelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Component
              placeHolder={placeholder}
              defaultValue={value}
              onChange={(selected: any) => onChange(selected)}
              {...componentProps}
            />
          </FormControl>
          <FormMessage>{error ? error.message : ''}</FormMessage>
        </FormItem>
      )}
    />
  );
}

// Пропсы для выбора страны
interface CountrySelectInputProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
}

export function CountrySelectInput({
  control,
  name,
  label,
  placeholder,
}: CountrySelectInputProps) {
  return (
    <LocationSelectField
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      Component={CountrySelect}
      componentProps={{
        src: '/countryData',
        onTextChange: (txt: string) => console.log('Country search:', txt),
        showFlag: true,
      }}
    />
  );
}

// Пропсы для выбора области (штата)
interface StateSelectInputProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  countryValue?: CountryType | null;
}

export function StateSelectInput({
  control,
  name,
  label,
  placeholder,
  countryValue,
}: StateSelectInputProps) {
  return (
    <LocationSelectField
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      Component={StateSelect}
      componentProps={{
        countryid: countryValue?.id,
        src: '/countryData',
        onTextChange: (txt: string) => console.log('State search:', txt),
      }}
    />
  );
}

// Пропсы для выбора города
interface CitySelectInputProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  countryValue?: CountryType | null;
  stateValue?: StateType | null;
}

export function CitySelectInput({
  control,
  name,
  label,
  placeholder,
  countryValue,
  stateValue,
}: CitySelectInputProps) {
  return (
    <LocationSelectField
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      Component={CitySelect}
      componentProps={{
        countryid: countryValue?.id,
        stateid: stateValue?.id,
        src: '/countryData',
        onTextChange: (txt: string) => console.log('City search:', txt),
      }}
    />
  );
}
