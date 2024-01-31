"use client"

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import React, { useEffect, useState } from 'react'

const Client = () => {

    const { data: session } = useSession()
    const [showModal, setShowModal] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        window.onscroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true)
            return () => (window.onscroll = null)
        }
    }, [])

    const toggleModal = () => {
        setShowModal(prev => !prev)
    }

    return (
        <div className={`z-50 h-16 w-full fixed top-0 left-0
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
                            {session?.user?.isAdmin ?
                                <Link href={"/admin/dashboard"} className="font-semibold uppercase bg-red-500 text-white p-2 rounded-lg cursor-pointer transition hover:bg-red-400">
                                    Admin dashboard
                                </Link>
                                : ""
                            }
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

export default Client