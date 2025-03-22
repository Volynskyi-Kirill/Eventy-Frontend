import { z } from 'zod';

export const createEventDateSchema = (t: any) =>
  z.object({
    date: z
      .string()
      .min(1, t('DateSelector.validation.dateRequired'))
      .refine((val) => !isNaN(Date.parse(val)), {
        message: t('DateSelector.validation.invalidDateFormat'),
      }),
  });

export const createEventSocialMediaSchema = (t: any) =>
  z.object({
    platform: z
      .string()
      .min(1, t('EventSocialMedia.validation.platformRequired'))
      .max(50, t('EventSocialMedia.validation.platformMaxLength')),
    link: z
      .string()
      .min(1, t('EventSocialMedia.validation.linkRequired'))
      .max(500, t('EventSocialMedia.validation.linkMaxLength')),
  });

export const createEventZoneSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .min(1, t('EventSeatsAndPrice.validation.zoneNameRequired'))
      .max(100, t('EventSeatsAndPrice.validation.zoneNameMaxLength')),
    price: z.number().min(0, t('EventSeatsAndPrice.validation.positivePrice')),
    currency: z
      .string()
      .min(1, t('EventSeatsAndPrice.validation.currencyRequired'))
      .max(20, t('EventSeatsAndPrice.validation.currencyMaxLength')),
    seatCount: z
      .number()
      .min(1, t('EventSeatsAndPrice.validation.minSeatCount')),
  });

export const createEventSchema = (t: any) =>
  z.object({
    title: z
      .string()
      .min(1, t('EventInformation.validation.titleRequired'))
      .max(100, t('EventInformation.validation.titleMaxLength')),
    categoryIds: z.array(z.number()).optional(),
    dates: z
      .array(createEventDateSchema(t))
      .min(1, t('DateSelector.validation.minDatesRequired')),
    country: z
      .object({ id: z.number(), name: z.string() })
      .nullable()
      .optional(),
    state: z.object({ id: z.number(), name: z.string() }).nullable().optional(),
    street: z
      .string()
      .max(200, t('EventInformation.validation.streetMaxLength'))
      .optional(),
    buildingNumber: z
      .string()
      .max(20, t('EventInformation.validation.buildingNumberMaxLength'))
      .optional(),
    city: z.object({ id: z.number(), name: z.string() }).nullable().optional(),
    speakerIds: z.array(z.number()).optional(),
    shortDescription: z
      .string()
      .min(1, t('EventInformation.validation.shortDescriptionRequired'))
      .max(250, t('EventInformation.validation.shortDescriptionMaxLength')),
    fullDescription: z
      .string()
      .min(1, t('EventInformation.validation.fullDescriptionRequired'))
      .max(5000, t('EventInformation.validation.fullDescriptionMaxLength')),
    eventZones: z
      .array(createEventZoneSchema(t))
      .min(1, t('EventSeatsAndPrice.validation.minZonesRequired')),
    socialMedia: z.array(createEventSocialMediaSchema(t)).optional(),
    coverImg: z.string().optional(),
    logoImg: z.string().optional(),
    mainImg: z.string().optional(),
  });

export type CreateEventFormData = z.infer<ReturnType<typeof createEventSchema>>;
