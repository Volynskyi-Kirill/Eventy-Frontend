"use client"

import Image from "next/image"
import { MapPin, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CreateEventFormData } from "@/lib/validation/createEventSchema"
import { formatDate } from "@/lib/utils"

interface EventPreviewProps {
  formValues: Partial<CreateEventFormData>
}

export function EventPreview({ formValues }: EventPreviewProps) {
  const { title, dates, country, state, eventZones, mainImg } = formValues

  const location = [country, state].filter(Boolean).join(", ")
  const hasPrice = eventZones && eventZones.length > 0
  const lowestPrice = hasPrice ? Math.min(...eventZones.map((zone) => zone.price)) : 0
  const highestPrice = hasPrice ? Math.max(...eventZones.map((zone) => zone.price)) : 0
  const currency = hasPrice && eventZones[0]?.currency ? eventZones[0].currency : ""

  const priceDisplay =
    lowestPrice === 0
      ? "Free"
      : lowestPrice === highestPrice
        ? `${lowestPrice} ${currency}`
        : `${lowestPrice} - ${highestPrice} ${currency}`

  return (
    <div className="sticky top-6">
      <Card className="overflow-hidden">
        <div className="relative h-64 w-full bg-gray-200">
          {mainImg ? (
            <Image src={mainImg || "/placeholder.svg"} alt={title || "Event"} fill className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">Main photo</div>
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{title || "TITLE"}</h2>

          {location && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          )}

          {dates && dates.length > 0 && dates[0].date && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(dates[0].date)}</span>
            </div>
          )}

          <div className="mt-4">
            <div className="text-lg font-semibold">PRICE</div>
            <div className="text-md">{priceDisplay}</div>
          </div>

          <div className="mt-4 space-y-2">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Save and preview</Button>
            <Button variant="outline" className="w-full">
              Seats and price
            </Button>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

