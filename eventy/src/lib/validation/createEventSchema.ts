import { z } from "zod"

export const createEventDateSchema = z.object({
  date: z.string().min(1, "Date is required"),
})

export const createEventSocialMediaSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  link: z.string().min(1, "Link is required"),
})

export const createEventZoneSchema = z.object({
  name: z.string().min(1, "Zone name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  currency: z.string().min(1, "Currency is required"),
  seatCount: z.number().min(1, "Seat count must be at least 1"),
})

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryIds: z.array(z.number()).optional(),
  dates: z.array(createEventDateSchema).min(1, "At least one date is required"),
  country: z.string().optional(),
  state: z.string().optional(),
  street: z.string().optional(),
  buildingNumber: z.string().optional(),
  speakerIds: z.array(z.number()).optional(),
  shortDescription: z.string().min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  eventZones: z.array(createEventZoneSchema).min(1, "At least one zone is required"),
  socialMedia: z.array(createEventSocialMediaSchema).optional(),
  coverImg: z.string().optional(),
  logoImg: z.string().optional(),
  mainImg: z.string().optional(),
})

export type CreateEventFormData = z.infer<typeof createEventSchema>

