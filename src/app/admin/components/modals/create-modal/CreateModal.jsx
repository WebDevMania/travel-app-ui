"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineClose } from 'react-icons/ai'
import { createNewListing, postImages } from './service'
import { optionLocations, optionTypes } from '@/data/data'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import ModalLayout from '@/app/admin/layout/ModalLayout'
import Input from '@/ui/Input'
import Select from '@/ui/Select'
import Button from '@/ui/Button'

const CreateModal = ({
    handleHideModal
}) => {

    const CLOUD_NAME = "doojo83ea"
    const UPLOAD_PRESET = "hotel_app"
    const defaultValues = {
        name: "",
        desc: "",
        beds: 5,
        hasFreeWifi: false,
        type: "luxury",
        location: "dubai",
        pricePerNight: null
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (data, imageUrls) => createNewListing(data, imageUrls),
        mutationKey: ["admin", "listings"]
    })
    const [images, setImages] = useState([])
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues
    })

    useEffect(() => {
        if (Object.keys(errors)?.length > 0) {
            Object.keys(errors)?.map((key) => {
                toast.error(errors[key]?.message)
            })
        }
    }, [errors])

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

        if (!images?.length) {
            toast.error("You must publish an image!")
            return
        }

        const imageUrls = await Promise.all(images.map((image, idx) => {
            const imageUrl = uploadImage(image, idx)
            return imageUrl
        }))

        const newListing = await mutateAsync({ data, imageUrls })
        toast.success(`Redirecting to listing...`)
        router.push(`/details/${newListing.id}`)
    }

    return (
        <ModalLayout
            isCreating
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
                    placeholder="The best hotel in the world"
                    register={register("desc")}
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
                    register={register("pricePerNight", { valueAsNumber: true })}
                    type="number"
                    placeholder="$249.00"
                    step={0.01}
                />
                <Input
                    register={register("beds", { valueAsNumber: true })}
                    type="number"
                    placeholder="5 beds"
                />
                <div className='text-slate-400 rounded-md ml-4 w-2/3 flex gap-4'>
                    <label htmlFor='freeWifi'>
                        Free Wifi
                    </label>
                    <Input
                        register={register("hasFreeWifi")}
                        type="checkbox"
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
                    disabled={isPending}
                    label="Submit"
                />
            </form>
        </ModalLayout>
    )

}

export default CreateModal