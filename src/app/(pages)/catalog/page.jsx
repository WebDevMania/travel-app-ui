"use client"

import Card from "@/components/best-hotels/Card"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { ClipLoader } from "react-spinners";
import { optionLocations, optionTypes } from "@/data/data"
import { useForm } from "react-hook-form"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getFilteredListings } from "./service"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { toast } from "react-hot-toast";
import Button from "@/ui/Button";
import Select from "@/ui/Select";
import Input from "@/ui/Input";

const Catalog = () => {
  const searchParams = useSearchParams()

  const city = searchParams.get('city')
  const min_price = searchParams.get('min_price')
  const max_price = searchParams.get('max_price')
  const type = searchParams.get('type')

  const router = useRouter()

  const {
    city: city_name,
    value,
    image
  } = optionLocations.find(
    (location) => location.value === city
  )

  const defaultValues = {
    location: value,
    min_price,
    max_price,
    type
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: {
      errors
    }
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema)
  })

  const queryClient = useQueryClient()
  const { data: listings, isPending } = useQuery({
    queryFn: () => getFilteredListings(getValues()),
    queryKey: ['listings']
  })

  useEffect(() => {
    if (errors) {
      Object.keys((errors)).map((key) => {
        toast.error(errors[key]?.message)
      })
    }

  }, [errors])

  if (isPending) {
    const style = {
      marginTop: "5rem",
      position: 'absolute',
      top: '50%', left: '50%',
      transform: "translate(-50%, -50%)",
      height: "100vh"
    };

    return (
      <div style={style}>
        <ClipLoader color={"#123abc"} />
      </div>
    )
  }

  const onSubmit = async (data) => {
    await getFilteredListings(data)

    queryClient.invalidateQueries(['listings'])

    const newUrl = `/catalog?city=${data.location}&min_price=${data.min_price}&max_price=${data.max_price}&type=${data.type}`

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className='min-h-screen w-full'>
      <div className='relative h-3/5 w-full'>
        <Image
          className='brightness-50 h-screen w-full object-cover'
          src={image}
          alt=""
        />
        <h3 className='absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white'>
          {city_name}
        </h3>
      </div>
      <div className='relative z-20 -mt-12 h-full w-full flex flex-col items-center'>
        {/* selects and button */}
        <form onSubmit={handleSubmit(onSubmit)} className='border w-2/3 h-28 border-slate-500 px-4 py-12 rounded-xl bg-blue-600 text-white flex justify-between items-center'>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>
              City
            </h3>
            <Select
              data={optionLocations}
              register={register("location")}
              className="text-blue-800 p-2 rounded-xl outline-none capitalize"
            />
          </div>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>Price</h3>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                register={register("min_price", { valueAsNumber: true })}
                placeholder="Min. price"
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
              <Input
                type="number"
                register={register("max_price", { valueAsNumber: true })}
                placeholder="Max. price"
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
            </div>
          </div>
          <div className='flex flex-col items-start gap-1'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>
              Type of hotel
            </h3>
            <Select
              data={optionTypes}
              register={register("type")}
              className="text-blue-800 p-2 rounded-xl outline-none"
            />
          </div>
          <Button
            disabled={isPending}
            label="Search"
            className="mt-6 px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"
          />
        </form>
        <div className="w-full mt-36 flex flex-wrap justify-center items-center gap-14">
          {listings?.length > 0 ? listings?.map((place, idx) => (
            <Card
              key={idx}
              place={place}
            />
          )) : (
            <h2 className="text-center mt-12 text-3xl text-slate-700">
              No results with the current filters applied
            </h2>
          )}
        </div>
      </div>
    </div>
  )
}

export default Catalog