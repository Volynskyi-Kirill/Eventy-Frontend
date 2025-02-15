import * as z from 'zod';

const isCurrentPasswordRequired = (data: any) =>
  data.newPassword && !data.password;
const doPasswordsMatch = (data: any) =>
  data.newPassword === data.confirmPassword;

export const accountSettingsSchema = z
  .object({
    userName: z.string().min(1, 'Name is required'),
    userSurname: z.string().min(1, 'Surname is required'),
    phoneNumber: z.string().optional(),
    country: z
      .object({
        id: z.number(),
        name: z.string(),
        iso2: z.string().optional(),
      })
      .nullable()
      .refine((val) => val !== null, { message: 'Select country' }),
    state: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, { message: 'Select state' }),
    city: z
      .object({
        id: z.number(),
        name: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, { message: 'Select city' }),
    email: z.string().email('Invalid email address'),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => !isCurrentPasswordRequired(data), {
    message: 'Current password is required when setting a new password',
    path: ['password'],
  })
  .refine((data) => doPasswordsMatch(data), {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'],
  });

export type AccountSettingsFormData = z.infer<typeof accountSettingsSchema>;
