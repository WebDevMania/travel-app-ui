import Image from "next/image";
import { format } from 'date-fns'
import { FaPen, FaTrash } from 'react-icons/fa';
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useReservationHook } from "../../../hooks/reservation-hook";

export const columns = [

    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("listing").imageUrls[0]

            return (
                <div>
                    <Image
                        className="rounded-full object-cover"
                        width="35"
                        height="35"
                        src={image}
                        alt=""
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => {

            const value = row.getValue("startDate")
            return (
                <span>
                    {format(value, 'MMM do yyyy')}
                </span>
            )
        }
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => {

            const value = row.getValue("endDate")
            return (
                <span>
                    {format(value, 'MMM do yyyy')}
                </span>
            )
        }
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {

            const { email } = row.getValue("user")
            return (
                <span>
                    {email}
                </span>
            )
        }
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => (
            <button
                className="flex justify-center items-center gap-1"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total Price
                <span className="flex items-center">
                    <AiOutlineArrowUp />
                    <AiOutlineArrowDown />
                </span>
            </button>
        ),
        cell: ({ row }) => {

            const totalPrice = row.getValue("totalPrice")

            return (
                <span className="block text-left">
                    ${totalPrice}
                </span>
            )
        }
    },
    {
        accessorKey: "listing",
        header: "Listing",
        cell: ({ row }) => {

            const { name } = row.getValue("listing")

            return (
                <span>
                    {name}
                </span>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { chargeId, id: reservationId } = row.original

            const {
                handleDeleteReservation,
                isPending
            } = useReservationHook()

            return (
                <>
                    <button
                        onClick={() => handleDeleteReservation({ chargeId, reservationId })}
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaTrash
                            color={`${isPending ? "#bdb2b2" : "#f00"}`}
                        />
                    </button>
                    <button
                        className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                    >
                        <FaPen
                            color="#31b608"
                        />
                    </button>
                </>
            )
        }

    }
]
