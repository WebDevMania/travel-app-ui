import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import image_1 from '../../../public/assets/AbuDhabi.jpg'
import { format } from 'date-fns'

const Reservation = ({
    reservation,
    mutate
}) => {

    return (
        <div className='flex flex-col' key={1}>
            <Link href={`/details/1`}>
                <Image
                    className='rounded-xl shadow-xl'
                    src={image_1}
                    height="200"
                    width="300"
                />
            </Link>
            <div className='p-2 mt-2 flex flex-col gap-4'>
                <span className='font-semibold text-lg'>
                    dubai
                </span>
                <span>
                   ghahahahah
                </span>
                <div>
                    <span className='text-slate-500'>
                        {format(reservation.startDate, 'MMM do yyyy')}
                    </span>
                    <span className='px-2'>-</span>
                    <span className='text-slate-500'>
                        {format(reservation.endDate, 'MMM do yyyy')}
                    </span>
                </div>
                <div>
                    Total Price: $123
                </div>
                <button
                    className="w-full py-2 bg-red-500 text-white rounded-xl transition-all hover:bg-red-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Reservation