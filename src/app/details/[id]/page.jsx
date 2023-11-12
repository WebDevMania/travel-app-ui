"use client"
import { format } from 'currency-formatter'
import hotel_image_1 from '../../../../public/assets/hr_1.jpg'
import hotel_image_2 from '../../../../public/assets/hr_2.jpg'
import bianco from '../../../../public/assets/bianco_2.png'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { FaBed, FaWifi } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'
import BookModal from '@/components/book-modal/BookModal'
import { register } from 'swiper/element/bundle'

register();

const HotelDetails = (ctx) => {
    const id = ctx.params.id
    const [selectedStar, setSelectedStar] = useState(5)
    const [showModal, setShowModal] = useState(false)
    const swiperElRef = useRef(null)

    const handleShowModal = () => setShowModal(prev => true)
    const handleHideModal = () => setShowModal(prev => false)

    useEffect(() => {
        swiperElRef.current.addEventListener('swiperprogress', (e) => {
            const [swiper, progress] = e.detail;
            console.log(progress);
        });

        swiperElRef.current.addEventListener('swiperslidechange', (e) => {
            console.log('slide changed');
        });
    }, [])

    return (
        <div className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}>
            {showModal && (
                <BookModal
                    handleHideModal={handleHideModal}
                />
            )}
            <div className='h-full w-3/4 mx-auto'>
                <div>
                    <div className='w-full h-[750px] overflow-hidden mx-auto'>
                        <div className='w-full h-full'>
                            <swiper-container
                                ref={swiperElRef}
                                slides-per-view="1"
                                navigation="true"
                            >
                                <swiper-slide>
                                    <Image
                                        src={hotel_image_1}
                                        className='h-[750px] w-full object-cover rounded-lg'
                                    />
                                </swiper-slide>
                                <swiper-slide>
                                    <Image
                                        src={hotel_image_2}
                                        className='h-[750px] w-full object-cover rounded-lg'
                                    />
                                </swiper-slide>
                            </swiper-container>
                        </div>
                    </div>
                    <div className='mt-12 px-6 w-full flex items-center justify-between'>
                        <h2 className='font-bold text-4xl'>
                            Arabian Paradise
                        </h2>

                        <div>
                            <span className='p-2 px-4 text-[22px] rounded-full bg-blue-600 text-white flex items-center gap-2'>
                                <AiFillStar color="white" />
                                <span className='text-white'>
                                    4.7
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='mt-16 px-6 flex items-center gap-8'>
                        <span className='flex items-center gap-2'><CiLocationOn /> Dubai, UAE</span>
                        <span className='flex items-center gap-2'>{format(325.50, { locale: 'en-us' })}/night</span>
                        <span className='flex items-center gap-2'>2 <FaBed /></span>
                        <span className='flex items-center gap-2'>Free <FaWifi /></span>
                    </div>
                    <div className='mt-16 px-6 w-full flex items-end justify-between'>
                        <p className='text-xl max-w-xl text-slate-700'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolores error, ipsam earum inventore illum veritatis nulla aperiam.
                            Vitae excepturi alias earum esse incidunt, quibusdam cum,
                            temporibus sint aliquam inventore voluptas?
                        </p>
                        <button
                            onClick={handleShowModal}
                            className='cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500'
                        >
                            Book
                        </button>
                    </div>
                </div>
                <div className='border-t-2 border-white-800 px-6 mt-16 mx-auto'>
                    <h1 className='mt-16 text-3xl font-bold'>
                        Reviews
                    </h1>
                    <div className='mt-8 flex items-center gap-6'>
                        {Array.from(Array(5).keys()).map((number) => (
                            <span
                                onClick={() => setSelectedStar(number + 1)}
                                className={`${selectedStar === number + 1 ? "scale-125" : ""}
                                 cursor-pointer flex items-center gap-2 transition-all`}
                            >
                                {number + 1}
                                <AiFillStar
                                    size={22}
                                    color="rgb(59, 130, 246)"
                                />
                            </span>
                        ))}

                    </div>
                    <div className='mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max'>
                        <input className='outline-none' type="text" placeholder='Leave your opinion...' />
                        <button className='cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500'
                        >
                            Post
                        </button>
                    </div>
                    {/* review section section */}
                    <div className='mt-16 flex flex-col gap-24 w-1/3'>
                        <div className='w-full flex gap-4'>
                            <div className='w-14 h-14'>
                                <Image
                                    className='w-full h-full object-cover rounded-full'
                                    src={bianco}
                                    alt=""
                                />
                            </div>
                            <div>
                                <h3 className='font-semibold text-[20px]'>
                                    Bianco Biancov
                                </h3>
                                <span className='text-slate-700'>
                                    2 minutes ago
                                </span>
                                <div className='mt-4 text-slate-800'>
                                    Best Hotel In Dubai!
                                </div>
                            </div>
                            <span className="ml-auto flex items-start gap-2">
                                5
                                <AiFillStar
                                    size={22}
                                    color="rgb(59, 130, 246)"
                                />
                            </span>
                        </div>
                        <div className='w-full flex gap-4'>
                            <div className='w-14 h-14'>
                                <Image
                                    className='w-full h-full object-cover rounded-full'
                                    src={bianco}
                                    alt=""
                                />
                            </div>
                            <div>
                                <h3 className='font-semibold text-[20px]'>
                                    Bianco Biancov
                                </h3>
                                <span className='text-slate-700'>
                                    2 minutes ago
                                </span>
                                <div className='mt-4 text-slate-800'>
                                    Best Hotel In Dubai!
                                </div>
                            </div>
                            <span className="ml-auto flex items-start gap-2">
                                5
                                <AiFillStar
                                    size={22}
                                    color="rgb(59, 130, 246)"
                                />
                            </span>
                        </div>
                        <div className='w-full flex gap-4'>
                            <div className='w-14 h-14'>
                                <Image
                                    className='w-full h-full object-cover rounded-full'
                                    src={bianco}
                                    alt=""
                                />
                            </div>
                            <div>
                                <h3 className='font-semibold text-[20px]'>
                                    Bianco Biancov
                                </h3>
                                <span className='text-slate-700'>
                                    2 minutes ago
                                </span>
                                <div className='mt-4 text-slate-800'>
                                    Best Hotel In Dubai!
                                </div>
                            </div>
                            <span className="ml-auto flex items-start gap-2">
                                5
                                <AiFillStar
                                    size={22}
                                    color="rgb(59, 130, 246)"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelDetails