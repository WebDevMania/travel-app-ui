import Link from 'next/link'
import React from 'react'
import { AiFillBell, AiOutlineHome } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'

const NavbarAdmin = () => {
    return (
        <div className="flex justify-between items-center">
            <Link href='/' className="flex items-center gap-2 transition-all">
                <h1 className="text-blue-600 text-2xl font-bold">
                    TravelGod
                </h1>
                <AiOutlineHome
                    size={25}
                    color="rgba(37 99 235)"
                />
            </Link>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <AiFillBell
                        size={22}
                        color="rgba(255 0 0)"
                    />
                    <div
                        className="flex justify-center items-center text-[10px] absolute h-4 w-4 bg-[#2563eb] text-white rounded-full bottom-3 left-2 z-10"
                    >
                        2
                    </div>
                </div>
                <FaUser
                    size={22}
                    color="rgba(37 99 235)"
                />
            </div>
        </div>
    )
}

export default NavbarAdmin