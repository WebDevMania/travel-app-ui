"use client"

import Image from "next/image";
import bianco from '../../../../../../public/assets/bianco_2.png'
import { format } from 'timeago.js'
import { FaPen, FaTrash } from 'react-icons/fa';
import { useUserHook } from "../../../hooks/user-hook";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useState } from "react";
import UserModal from "@/app/admin/components/modals/user-modal/UserModal";


export const columns = [
    {
        accessorKey: "profilePhoto",
        header: "Profile Photo",
        cell: ({ row }) => {
            return (
                <Image
                    className="h-10 w-10 rounded-full object-cover"
                    height="40"
                    width="50"
                    src={bianco}
                    alt=""
                />
            )
        }
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: "reservations",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Reservations
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("reservations").length

            return (
                <div>
                    {value} reservations
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created at",
        cell: ({ row }) => {
            const value = row.getValue("createdAt")

            return (
                <div>
                    {format(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { id: userId } = row.original
            const [showModal, setShowModal] = useState(false)
            
            const handleHideModal = () => setShowModal(prev => false)
            const handleShowModal = () => setShowModal(prev => true)

            const { handleDeleteUser, isPending } = useUserHook()

            return (
                <>
                    <button
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                        disabled={isPending}
                        onClick={() => handleDeleteUser(userId)}
                    >
                        <FaTrash
                            color={`${isPending ? "#bdb2b2" : "#f00"}`}
                        />
                    </button>
                    <button
                        onClick={handleShowModal}
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaPen
                            color="#31b608"
                        />
                    </button>
                    {showModal && (
                        <UserModal
                            userId={userId}
                            handleHideModal={handleHideModal}
                        />
                    )}
                </>
            )
        }
    }
]

