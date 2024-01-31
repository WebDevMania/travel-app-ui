"use client"

import React from 'react'
import Layout from '../../layout/AdminLayout'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from './table/Data-table'
import { columns } from './table/Columns'
import { ClipLoader } from 'react-spinners'
import { getAllListings } from '../../services/service'

const Listings = () => {
  const { data: allListings, isLoading } = useQuery({
    queryFn: () => getAllListings(),
    queryKey: ["admin", "listings"]
  })

  if (isLoading) return <ClipLoader />

  return (
    <Layout>
      <div className="ml-12 h-full w-full">
        <h2 className="text-3xl text-slate-800 font-bold whitespace-nowrap">
          All Listings
        </h2>
        <div className="mt-2 h-2/3 w-[50vw]">
          <DataTable
            columns={columns}
            data={allListings}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Listings