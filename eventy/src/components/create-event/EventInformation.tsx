"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { CreateEventFormData } from "@/lib/validation/createEventSchema"

// Mock categories for demonstration
const CATEGORIES = [
  { id: 1, name: "Fun" },
  { id: 2, name: "Education" },
  { id: 3, name: "Business" },
  { id: 4, name: "Technology" },
  { id: 5, name: "Art" },
]

export function EventInformation() {
  const { control, register, setValue, watch } = useFormContext<CreateEventFormData>()

  const {
    fields: dateFields,
    append: appendDate,
    remove: removeDate,
  } = useFieldArray({
    control,
    name: "dates",
  })

  const {
    fields: speakerFields,
    append: appendSpeaker,
    remove: removeSpeaker,
  } = useFieldArray({
    control,
    name: "speakerIds",
  })

  const selectedCategories = watch("categoryIds") || []

  const handleCategorySelect = (categoryId: number) => {
    const currentCategories = [...selectedCategories]
    const index = currentCategories.indexOf(categoryId)

    if (index === -1) {
      setValue("categoryIds", [...currentCategories, categoryId], { shouldValidate: true })
    }
  }

  const handleRemoveCategory = (categoryId: number) => {
    const newCategories = selectedCategories.filter((id) => id !== categoryId)
    setValue("categoryIds", newCategories, { shouldValidate: true })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Event Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Event title</Label>
          <Input id="title" {...register("title")} placeholder="Event title" />
        </div>

        {/* Event Categories */}
        <div className="space-y-2">
          <Label>Event categories</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedCategories.map((categoryId) => {
              const category = CATEGORIES.find((c) => c.id === categoryId)
              return category ? (
                <Badge key={categoryId} className="bg-emerald-500 hover:bg-emerald-600">
                  #{category.name}
                  <button type="button" className="ml-1" onClick={() => handleRemoveCategory(categoryId)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null
            })}
          </div>
          <Select onValueChange={(value) => handleCategorySelect(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id.toString()}
                  disabled={selectedCategories.includes(category.id)}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date and Time */}
        <div className="space-y-4">
          <Label>Select date and time</Label>
          {dateFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`dates.${index}.date`}>Select date</Label>
                <Input
                  id={`dates.${index}.date`}
                  type="date"
                  {...register(`dates.${index}.date`)}
                  placeholder="12 September 2025"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor={`dates.${index}.time`}>Select time</Label>
                  <Input id={`dates.${index}.time`} type="time" placeholder="12:30" />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="mb-0.5"
                    onClick={() => removeDate(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
            onClick={() => appendDate({ date: "" })}
          >
            Add more date
          </Button>
        </div>

        {/* Place */}
        <div className="space-y-2">
          <Label>Place</Label>
          <div className="grid grid-cols-2 gap-4">
            <Input {...register("country")} placeholder="Country" />
            <Input {...register("state")} placeholder="City" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Input {...register("street")} placeholder="Street" />
            <Input {...register("buildingNumber")} placeholder="Building number" />
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600 mt-2"
          >
            Select location
          </Button>
        </div>

        {/* Speakers */}
        <div className="space-y-2">
          <Label>Speakers</Label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="@ Username" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Doe</SelectItem>
                  <SelectItem value="2">Jane Smith</SelectItem>
                  <SelectItem value="3">Alex Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600 mt-2"
          >
            Add speaker
          </Button>
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Event Short description</Label>
          <Textarea
            id="shortDescription"
            {...register("shortDescription")}
            placeholder="Short description"
            className="min-h-[100px]"
          />
        </div>

        {/* Full Description */}
        <div className="space-y-2">
          <Label htmlFor="fullDescription">Event full description</Label>
          <Textarea
            id="fullDescription"
            {...register("fullDescription")}
            placeholder="Full description"
            className="min-h-[200px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}

