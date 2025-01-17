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
