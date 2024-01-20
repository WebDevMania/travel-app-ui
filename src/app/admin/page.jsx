"use client"

import React from 'react'
import {
    AiFillBank,
    AiOutlineHome,
    AiOutlineUser
} from 'react-icons/ai'
import { MdHotel } from 'react-icons/md'
import Widget from './components/widgets/Widget'
import Chart from './components/chart/Chart'
import BigWidget from './components/widgets/BigWidget'
import Layout from './layout/Layout'
import { useQuery } from '@tanstack/react-query'
import {
    getAllListings,
    getAllReservations,
    getAllRevenue,
    getAllUsers,
    getMostReservedListing
} from './services/adminApi'

const Admin = () => {
    const { data: allUsers } = useQuery({
        queryFn: () => getAllUsers(),
        queryKey: ["users"]
    })

    const { data: allListings } = useQuery({
        queryFn: () => getAllListings(),
        queryKey: ["listings"]
    })

    const { data: allReservations } = useQuery({
        queryFn: () => getAllReservations(),
        queryKey: ["reservations"]
    })

    const { data: allRevenue } = useQuery({
        queryFn: () => getAllRevenue(),
        queryKey: ["revenue"]
    })

    const {
        data: mostReservedListing,
        isLoading: isMostReservedListingLoading
    } = useQuery({
        queryFn: () => getMostReservedListing(),
        queryKey: ["most-reserved-listing"]
    })

    if (isMostReservedListingLoading) {
        return <p>Loading...</p>
    }

    return (
        <Layout>
            <div className="ml-2 w-full h-full flex flex-col col-span-7">
                <div className="grid grid-cols-4 gap-8">
                    <Widget
                        page={"users"}
                        data={allUsers}
                        icon={<AiOutlineUser color="#efefef" />}
                    />
                    <Widget
                        page={"listings"}
                        data={allListings}
                        icon={<MdHotel color="#efefef" />}
                    />
                    <Widget
                        page={"reservations"}
                        data={allReservations}
                        icon={<AiOutlineHome color="#efefef" />}
                    />
                    <Widget
                        page={"revenue"}
                        data={allRevenue}
                        icon={<AiFillBank color="#efefef" />}
                    />
                </div>
                <div className="mt-28 grid grid-cols-7 gap-16">
                    <BigWidget
                        listing={mostReservedListing}
                    />
                    <Chart />
                </div>
            </div>
        </Layout>
    )
}

export default Admin