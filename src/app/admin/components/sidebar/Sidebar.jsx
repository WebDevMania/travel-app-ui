"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { MdDashboard, MdHotel } from 'react-icons/md'
import {
    AiFillBell,
    AiFillStar,
    AiOutlineHome,
    AiOutlineLogout,
    AiOutlineUser
} from 'react-icons/ai'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const currentPage = usePathname().split("/")[2]

    const sidebarData = [
        {
            text: "Dashboard",
            icon: MdDashboard,
            href: "/admin/dashboard",
            onClick: () => { },
            isCurrentPage: currentPage === "dashboard",
            isNew: false
        },
        {
            text: "Users",
            icon: AiOutlineUser,
            href: "/admin/users",
            onClick: () => { },
            isCurrentPage: currentPage === "users",
            isNew: false
        },
        {
            text: "Listings",
            icon: MdHotel,
            href: "/admin/listings",
            onClick: () => { },
            isCurrentPage: currentPage === "listings",
            isNew: false
        },
        {
            text: "Reservations",
            icon: AiOutlineHome,
            href: "/admin/reservations",
            onClick: () => { },
            isCurrentPage: currentPage === "reservations",
            isNew: false
        },
        {
            text: "Reviews",
            icon: AiFillStar,
            href: "/admin/reviews",
            onClick: () => { },
            isCurrentPage: currentPage === "reviews",
            isNew: false
        },
    ]

    return (
        <div className="w-full flex flex-col justify-between">
            <div className="h-full w-full flex flex-col gap-10 col-span-1">
                {sidebarData.map((data, idx) => (
                    <Link
                        href={data.href}
                        onClick={() => { data?.onClick() }}
                        className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer ${data.isCurrentPage && "bg-blue-600"}`}
                        key={idx}
                    >
                        <span>
                            {
                                <data.icon
                                    color={data.isCurrentPage ? "#fff" : "#cec7c7"}
                                />
                            }
                        </span>
                        <span
                            className={`${data.isCurrentPage ? "text-white" : "text-[#cec7c7]"}`}
                        >
                            {data.text}
                        </span>
                        {data.isNew && (
                            <span
                                className="py-1 px-2 rounded-2xl text-white text-[12px] bg-[#4681ff]"
                            >
                                New
                            </span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar