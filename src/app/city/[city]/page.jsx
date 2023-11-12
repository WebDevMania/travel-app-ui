import Card from "@/components/best-hotels/Card"
import Dubai from "../../../../public/assets/dubai.jpg"
import image_1 from '../../../../public/assets/hr_1.jpg'
import image_2 from '../../../../public/assets/hr_2.jpg'
import image_3 from '../../../../public/assets/hr_3.jpg'
import image_4 from '../../../../public/assets/hr_4.jpg'
import image_5 from '../../../../public/assets/hr_5.jpg'
import image_6 from '../../../../public/assets/hr_6.jpg'
import image_7 from '../../../../public/assets/hr_7.jpg'
import Image from 'next/image'
import React from 'react'

const CatalogPage = (ctx) => {
  const city = ctx.params.city

  const data = [
    {
      name: "Arabian Paradise",
      image: image_1,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_2,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_3,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_4,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_5,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_6,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
    {
      name: "Arabian Paradise",
      image: image_7,
      price: 324.50,
      category: "Luxury",
      reviews: 4.7,
      location: "Dubai, UAE"
    },
  ]

  return (
    <div className='min-h-screen w-full'>
      <div className='relative h-3/5 w-full'>
        <Image className='brightness-50 h-full w-full object-cover' src={Dubai} alt="" />
        <h3 className='absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 right-0 top-0 text-white'>
          {city}
        </h3>
      </div>
      <div className='relative z-20 -mt-12 h-full w-full flex flex-col items-center'>
        {/* selects and button */}
        <div className='border w-2/3 h-20 border-slate-500 px-4 py-12 rounded-xl bg-blue-600 text-white flex justify-between items-center'>
          <div className='flex flex-col items-start gap-2'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>City</h3>
            <select className='text-blue-800 p-2 rounded-xl outline-none'>
              <option value='all'>All</option>
              <option value='new-york'>New York</option>
              <option value='berlin'>Berlin</option>
              <option value='paris'>Paris</option>
              <option value='delhi'>Delhi</option>
            </select>
          </div>
          <div className='flex flex-col items-start gap-2'>
            <h3 className='ml-1 text-[#efefef] font-semibold'>Type of hotel</h3>
            <select className='text-blue-800 p-2 rounded-xl outline-none'>
              <option value="all">All</option>
              <option value="luxury">Luxury</option>
              <option value="budget">Budget</option>
              <option value="3-stars">3 Stars</option>
              <option value="4-stars">4 Stars</option>
              <option value="5-stars">5 Stars</option>
            </select>
          </div>
          <button className='px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl'>
            Search
          </button>
        </div>
        <div className="w-full mt-36 flex flex-wrap justify-center items-center gap-14">
          {data.map((place, idx) => (
            <Card
              key={idx}
              place={place}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CatalogPage