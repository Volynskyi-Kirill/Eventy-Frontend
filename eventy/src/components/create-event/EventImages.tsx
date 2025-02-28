"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { CreateEventFormData } from "@/lib/validation/createEventSchema"

export function EventImages() {
  const { setValue, watch } = useFormContext<CreateEventFormData>()
  const [uploading, setUploading] = useState({
    cover: false,
    logo: false,
    main: false,
  })

  const coverImg = watch("coverImg")
  const logoImg = watch("logoImg")
  const mainImg = watch("mainImg")

  const handleImageUpload = async (type: "coverImg" | "logoImg" | "mainImg") => {
    // In a real implementation, you would use an input file and handle the upload
    // For this example, we'll simulate an upload with a placeholder

    setUploading({ ...uploading, [type.replace("Img", "")]: true })

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set a placeholder image URL
      const imageUrl = `/placeholder.svg?height=400&width=600&text=${type}`
      setValue(type, imageUrl, { shouldValidate: true })
    } catch (error) {
      console.error(`Error uploading ${type}:`, error)
    } finally {
      setUploading({ ...uploading, [type.replace("Img", "")]: false })
    }
  }

  return (
    <div className="relative w-full h-[200px] bg-gray-200 mb-6">
      {/* Cover image */}
      <div className="absolute top-0 right-0 p-4">
        <div className="text-sm font-medium mb-1">Cover</div>
        <Button
          size="sm"
          variant="secondary"
          className="bg-black/70 text-white hover:bg-black/80"
          onClick={() => handleImageUpload("coverImg")}
          disabled={uploading.cover}
        >
          {uploading.cover ? "Uploading..." : coverImg ? "Change cover" : "Add cover"}
        </Button>
      </div>

      {/* Main photo */}
      <div className="absolute left-8 top-8 w-[200px] h-[150px] bg-gray-300 flex items-center justify-center">
        {mainImg ? (
          <Image src={mainImg || "/placeholder.svg"} alt="Main photo" fill className="object-cover" />
        ) : (
          <div className="text-sm text-gray-500">Main photo</div>
        )}
        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white hover:bg-black/80"
          onClick={() => handleImageUpload("mainImg")}
          disabled={uploading.main}
        >
          {uploading.main ? "Uploading..." : mainImg ? "Change main photo" : "Add main photo"}
        </Button>
      </div>

      {/* Logo */}
      <div className="absolute left-[250px] top-8 w-[100px] h-[100px] bg-gray-300 flex items-center justify-center">
        {logoImg ? (
          <Image src={logoImg || "/placeholder.svg"} alt="Logo" fill className="object-cover" />
        ) : (
          <div className="text-sm text-gray-500">Logo</div>
        )}
        <Button
          size="sm"
          variant="secondary"
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white hover:bg-black/80"
          onClick={() => handleImageUpload("logoImg")}
          disabled={uploading.logo}
        >
          {uploading.logo ? "Uploading..." : logoImg ? "Change logo" : "Add logo"}
        </Button>
      </div>
    </div>
  )
}

