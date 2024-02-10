"use client"
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
    const [showModal, setShowModal] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleModal = () => {
        setShowModal(prev => !prev)
    }

    useEffect(() => {
        window.onscroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true)
            return () => (window.onscroll = null)
        }
    }, [])

    return (
        <div className={`z-20 h-16 w-full fixed top-0 left-0
         ${isScrolled ? "shadow-md backdrop-blur" : ""}
        `}>
            <div className="h-full w-2/3 mx-auto flex items-center justify-between">
                <Link href='/' className='flex items-center gap-2 transition-all'>
                    <h1 className={`${isScrolled ? "text-blue-600" : "text-[#cec7c7]"} text-2xl font-bold`}>
                        TravelGod
                    </h1>
                    <AiOutlineHome
                        size={25}
                        color={`${isScrolled ? "rgba(37 99 235)" : "#cec7c7"}`}
                    />
                </Link>
                <div>
                    <div
                        onClick={toggleModal}
                        className='cursor-pointer'
                    >
                        <AiOutlineUser
                            size={30}
                            color={`${isScrolled ? "rgba(37 99 235)" : "#cec7c7"}`}
                        />
                    </div>
                    {showModal && (
                        <div onClick={toggleModal} className='absolute top-16 right-[270px] shadow-md flex flex-col gap-4 p-4 bg-white rounded-xl '>    
                            <Link href={"/reservations"} className='text-slate-500 text-center'>
                                Reservations
                            </Link>
                            <button onClick={() => signOut()} className='text-slate-500 text-center'>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar