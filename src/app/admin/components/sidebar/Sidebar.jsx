"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { MdDashboard, MdHotel } from 'react-icons/md'
import {
    AiFillBell,
    AiOutlineHome,
    AiOutlineLogout,
    AiOutlineUser
} from 'react-icons/ai'

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(0)

    const sidebarData = [
        {
            text: "Dashboard",
            icon: MdDashboard,
            href: "/admin",
            onClick: () => { },
            isNew: false
        },
        {
            text: "Users",
            icon: AiOutlineUser,
            href: "/admin/users",
            onClick: () => { },
            isNew: false
        },
        {
            text: "Listings",
            icon: MdHotel,
            href: "/admin/listings",
            onClick: () => { },
            isNew: false
        },
        {
            text: "Reservations",
            icon: AiOutlineHome,
            href: "/admin/reservations",
            onClick: () => { },
            isNew: false
        },
        {
            text: "Notifications",
            icon: AiFillBell,
            href: "/admin/notifications",
            onClick: () => { },
            isNew: true
        },
        {
            text: "Logout",
            icon: AiOutlineLogout,
            href: "/admin/logout",
            onClick: () => { signOut() },
            isNew: false
        },
    ]

    return (
        <div className="w-full flex flex-col justify-between">
            <div className="h-full flex flex-col gap-10 col-span-1">
                {sidebarData.map((data, idx) => (
                    <Link
                        href={data.href}
                        onClick={() => { setActiveTab(idx); data.onClick() }}
                        className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer ${activeTab === idx && "bg-blue-600"}`}
                        key={idx}
                    >
                        <span>
                            {
                                <data.icon
                                    color={activeTab === idx ? "#fff" : "#cec7c7"}
                                />
                            }
                        </span>
                        <span
                            className={`${activeTab === idx ? "text-white" : "text-[#cec7c7]"}`}
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
            <div
                className="h-10 w-36 p-2 rounded-xl bg-[#f00]"
            >
                <h3 className="text-[#efefef] text-center text-[14px] font-bold">
                    Admin Dashboard
                </h3>
            </div>
        </div>
    )
}

export default Sidebar