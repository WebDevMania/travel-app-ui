import { format } from 'currency-formatter'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const BookModal = ({
    handleHideModal
}) => {

    return (
        <div className='z-30 fixed backdrop-blur top-0 left-0 min-h-full w-full shadow-lg'>
            <div className='bg-slate-100 w-1/4 rounded-lg absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pb-8'>
                <div className='p-4 border-b border-slate-500 flex items-center justify-between'>
                    <h3 className='font-semibold text-2xl'>
                        Book your hotel
                    </h3>
                    <AiOutlineClose
                        onClick={handleHideModal}
                        className='cursor-pointer'
                        size={20}
                    />
                </div>
                <div className='p-4 flex items-center justify-between'>
                    <h2 className='font-semibold text-[20px]'>
                        Arabian Paradise
                    </h2>
                    <span className='text-slate-800'>
                        {format(325.50, { locale: 'en-us' })}
                        /night
                    </span>
                </div>
                <form className='p-4 flex flex-col gap-4'>
                    <input
                        className='outline-none p-2 rounded-lg'
                        type="text"
                        placeholder="John"
                    />
                    <input
                        className='outline-none p-2 rounded-lg'
                        type="text"
                        placeholder="Doe"
                    />
                    <input
                        className='outline-none p-2 rounded-lg'
                        type="date"
                        placeholder="Start Date"
                    />
                    <input
                        className='outline-none p-2 rounded-lg'
                        type="date"
                        placeholder="End Date"
                    />
                </form>
                <div className='p-4 border-t border-slate-500 flex items-end justify-between'>
                    <div className='text-slate-700 flex items-center gap-2'>
                        <span>
                            {format(325.50, { locale: 'en-us' })}
                        </span>
                        <span>x</span>
                        <span>5 nights</span>
                    </div>
                    <div className='text-slate-700 mt-4'>
                        Total Price: {format(325.50 * 5, { locale: 'en-us' })}
                    </div>
                </div>
                <div className='w-full flex items-center mt-6'>
                    <button
                        className='w-3/4 mx-auto cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookModal