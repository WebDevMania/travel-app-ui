"use client"

import React from 'react'
import Layout from '../../layout/AdminLayout'
import { columns } from './table/Columns'
import { useQuery } from '@tanstack/react-query'
import { getAllReviews } from './service'
import { DataTable } from './table/Data-table'
import { ClipLoader } from 'react-spinners'

const Reviews = () => {
    const { data: allReviews, isPending } = useQuery({
        queryFn: () => getAllReviews(),
        queryKey: ["admin", "reviews"]
    })
    
    
    if (isPending) return <ClipLoader />

    return (
        <Layout>
            <div className="ml-12 h-full w-full">
                <h2 className="text-3xl text-slate-800 font-bold whitespace-nowrap">
                    All Reviews
                </h2>
                <div className="mt-2 h-2/3 w-[50vw]">
                    <DataTable
                        columns={columns}
                        data={allReviews}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Reviews