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
import PhoneNumberInput from '@/components/originUI/PhoneNumberInput';
import { Textarea } from '@/components/ui/textarea';

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  description?: string;
  min?: string;
  className?: string;
}

export function FormField({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  description,
  ...rest
}: FormFieldProps) {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => {
        let component;
        switch (type) {
          case 'password':
            component = (
              <PasswordInput placeholder={placeholder} {...field} {...rest} />
            );
            break;
          case 'tel':
            component = (
              <PhoneNumberInput
                control={control}
                placeholder={placeholder}
                {...field}
                {...rest}
              />
            );
            break;
          case 'textarea':
            component = (
              <Textarea placeholder={placeholder} {...field} {...rest} />
            );
            break;
          default:
            component = (
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                {...rest}
              />
            );
        }
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>{component}</FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
