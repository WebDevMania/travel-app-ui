"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { getListingById, postImages, updateListing } from './service'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { optionLocations, optionTypes } from '@/data/data'
import { schema } from './schema'
import ModalLayout from '@/app/admin/layout/ModalLayout'
import Select from '@/ui/Select'
import Input from '@/ui/Input'
import Button from '@/ui/Button'

const ListingModal = ({
    handleHideModal,
    listingId
}) => {

    const CLOUD_NAME = "doojo83ea"
    const UPLOAD_PRESET = "hotel_app"

    const [images, setImages] = useState([])
    const router = useRouter()

    const { data: listing } = useQuery({
        queryFn: () => getListingById(listingId),
        queryKey: ["admin", "listings", { listingId }]
    })

    const { mutateAsync, isPending: isPendingMutation } = useMutation({
        mutationFn: ({ listingId, body }) => updateListing({ listingId, body }),
        mutationKey: ["admin", "listings"]
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        if (Object.keys(errors)?.length > 0) {
            Object.keys(errors)?.map((key) => {
                toast.error(errors[key]?.message)
            })
        }
    }, [errors])

    useEffect(() => {
        reset({
            ...listing
        })
    }, [
        listing?.name,
        listing?.desc,
        listing?.beds,
        listing?.type,
        listing?.hasFreeWifi,
        listing?.location,
        listing?.pricePerNight
    ])

    const handleImage = (e) => {
        setImages(prev => {
            return [...prev, e.target.files[0]]
        })
    }

    const uploadImage = async (image, idx) => {
        if (!image) return
        const toastId = toast.loading(`Image ${idx + 1} is being uploaded`)

        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const imageUrl = await postImages(CLOUD_NAME, formData)
            toast.success(`Successfully uploaded image ${idx + 1}`)
            toast.dismiss(toastId)
            return imageUrl
        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error?.message)
        }

    }

    const onSubmit = async (data) => {

        const imageUrls = await Promise.all(images.map((image, idx) => {
            const imageUrl = uploadImage(image, idx)
            return imageUrl
        }))

        const body = data
        if (imageUrls?.length > 0) body.imageUrls = imageUrls
        else body.imageUrls = listing.imageUrls

        const updatedListing = await mutateAsync({ listingId, body })
        toast.success(`Redirecting to listing...`)
        router.push(`/details/${updatedListing.id}`)
    }


    return (
        <ModalLayout
            document="listing"
            handleHideModal={handleHideModal}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='w-full px-4 py-6 flex flex-col items-center gap-8'>
                <Input
                    type="text"
                    placeholder="Grand Hotel"
                    register={register("name")}
                />
                <Input
                    type="text"
                    placeholder="desc"
                    register={register("The best hotel in the world")}
                />

                <Select
                    register={register("location")}
                    data={optionLocations}
                />

                <Select
                    register={register("type")}
                    data={optionTypes}
                />

                <Input
                    type="number"
                    placeholder="$249.00"
                    register={register("pricePerNight", { valueAsNumber: true })}
                    step={0.01}
                />

                <Input
                    type="number"
                    placeholder="5 beds"
                    register={register("beds", { valueAsNumber: true })}
                />

                <div className='text-slate-400 rounded-md ml-4 w-2/3 flex gap-4'>
                    <label htmlFor='freeWifi'>
                        Free Wifi
                    </label>
                    <Input
                        type="checkbox"
                        placeholder="5 beds"
                        register={register("hasFreeWifi")}
                        id="freeWifi"
                    />
                </div>
                <label className="text-slate-400 rounded-md w-2/3 ml-4" htmlFor="images">
                    Upload Images
                </label>
                <input
                    onChange={handleImage}
                    className="text-slate-400"
                    style={{ display: "none" }}
                    id="images"
                    type="file"
                    placeholder="Upload Hotel's Images"
                />
                <Button
                    disabled={isPendingMutation}
                    label="Submit"
                />
            </form>
        </ModalLayout>
    )
}

export default ListingModal