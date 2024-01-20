import { register } from 'swiper/element/bundle'
import Image from 'next/image'
import React from 'react'

register()

const BigWidget = ({
    listing
}) => {

    return (
        <div className="h-[525px] mt-auto col-span-2 rounded-xl transition-all shadow-lg hover:shadow-xl">
            <div className="flex flex-col gap-4">
                <h3 className="p-6 text-slate-700 text-center font-bold text-2xl">
                    #1 Reserved listing
                </h3>
                <div>
                    <swiper-container
                        slides-per-view="1"
                        navigation="true"
                    >
                        {listing?.imageUrls?.map((imageUrl) => (
                            <swiper-slide key={imageUrl}>
                                <Image
                                    src={imageUrl}
                                    className='object-cover'
                                    width="420"
                                    height="300"
                                />
                            </swiper-slide>
                        ))}
                    </swiper-container>
                    <div className="p-6 flex flex-col gap-8">
                        <h3 className="mt-4 font-bold text-slate-700 text-2xl">
                            {listing?.name}
                        </h3>
                        <span className="flex items-center font-semibold gap-2">
                            <h3 className="text-slate-500">Total reservations:</h3>
                            <span className="text-slate-500">
                                {listing?.reservations?.length} reservations
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigWidget