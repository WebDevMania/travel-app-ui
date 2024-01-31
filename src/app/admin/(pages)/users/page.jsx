"use client"

import React from 'react'
import Layout from '../../layout/AdminLayout'
import { getAllUsers } from '../../services/service';
import { useQuery } from '@tanstack/react-query'
import { ClipLoader } from 'react-spinners';
import { DataTable } from './table/Data-table'
import { columns } from './table/Columns'

const Users = () => {

    const { data: allUsers, isPending } = useQuery({
        queryFn: () => getAllUsers(),
        queryKey: ["admin", "users"]
    })

    if (isPending) return <ClipLoader />

    return (
        <Layout>
            <div className="ml-12 h-full w-full">
                <h2 className="text-3xl text-slate-800 font-bold">
                    All users
                </h2>
                <div className="mt-2 h-2/3 w-[50vw]">
                    <DataTable
                        columns={columns}
                        data={allUsers}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Users