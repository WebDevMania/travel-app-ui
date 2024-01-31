"use client"

import React from 'react'
import {
    AiFillBank,
    AiOutlineHome,
    AiOutlineUser
} from 'react-icons/ai'
import { MdHotel } from 'react-icons/md'
import Widget from '../../components/widgets/Widget'
import Chart from '../../components/chart/Chart'
import BigWidget from '../../components/widgets/BigWidget'
import Layout from '../../layout/AdminLayout'
import { useWidgetHook } from '../../hooks/widget-hook'

const Admin = () => {
    const [
        usersQuery,
        listingsQuery,
        reservationsQuery,
        revenueQuery,
        mostReservedQuery
    ] = useWidgetHook()

    const widgetData = [
        { page: "users", data: usersQuery.data, icon: <AiOutlineUser color="#efefef" /> },
        { page: "listings", data: listingsQuery.data, icon: <MdHotel color="#efefef" /> },
        { page: "reservations", data: reservationsQuery.data, icon: <AiOutlineHome color="#efefef" /> },
        { page: "revenue", data: revenueQuery.data, icon: <AiFillBank color="#efefef" /> }
    ]

    return (
        <Layout>
            <div className="ml-2 w-full h-full flex flex-col col-span-7">
                <div className="grid grid-cols-4 gap-8">
                    {widgetData?.map(({ page, data, icon }) => (
                        <Widget
                            key={page}
                            page={page}
                            data={data}
                            icon={icon}
                        />
                    ))}
                </div>
                <div className="mt-28 grid grid-cols-7 gap-16">
                    <BigWidget
                        listing={mostReservedQuery.data}
                    />
                    <Chart />
                </div>
            </div>
        </Layout>
    )
}

export default Admin