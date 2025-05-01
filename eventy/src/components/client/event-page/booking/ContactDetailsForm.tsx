'use client';

import { FormField } from '@/components/shared/FormField';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { DEFAULT_COUNTRY_PHONE_CODE } from '@/lib/constants';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms',
  }),
  marketingConsent: z.boolean().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type ContactDetailsFormProps = {
  onSubmit: (data: ContactFormValues) => void;
};

const ContactDetailsForm = ({ onSubmit }: ContactDetailsFormProps) => {
  const t = useTranslations('BookingPage');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      agreeToTerms: false,
      marketingConsent: false,
    },
  });

  const handleSubmit = (data: ContactFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        id='contact-form'
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-6'
      >
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>{t('contactDetails')}</h3>

          <FormField
            control={form.control}
            name='name'
            label={t('name')}
            placeholder={t('enterName')}
          />

          <FormField
            control={form.control}
            name='phone'
            label={t('phoneNumber')}
            placeholder={`+${DEFAULT_COUNTRY_PHONE_CODE} 00 000 00 00`}
            type='tel'
          />

          <FormField
            control={form.control}
            name='email'
            label={t('email')}
            placeholder={t('enterEmail')}
            type='email'
          />
        </div>

        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='terms'
              checked={form.watch('agreeToTerms')}
              onCheckedChange={(checked) =>
                form.setValue('agreeToTerms', checked as boolean, {
                  shouldValidate: true,
                })
              }
            />
            <label
              htmlFor='terms'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {t('agreeToTerms')}{' '}
              <Link href='/terms' className='text-primary hover:underline'>
                {t('termsLink')}
              </Link>
            </label>
          </div>
          {form.formState.errors.agreeToTerms && (
            <p className='text-sm text-destructive'>
              {form.formState.errors.agreeToTerms.message}
            </p>
          )}

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='marketing'
              checked={form.watch('marketingConsent')}
              onCheckedChange={(checked) =>
                form.setValue('marketingConsent', checked as boolean)
              }
            />
            <label
              htmlFor='marketing'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {t('marketingConsent')}
            </label>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContactDetailsForm;
