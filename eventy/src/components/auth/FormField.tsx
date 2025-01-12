import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/originUI/PasswordInput';

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  description?: string;
}

export function FormField({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  description,
}: FormFieldProps) {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === 'password' ? (
              <PasswordInput placeholder={placeholder} {...field} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
