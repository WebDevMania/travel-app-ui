"use client"

import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import { getAllUsers } from '../services/adminApi'
import { useQuery } from '@tanstack/react-query'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Layout from '../layout/Layout'

const Users = () => {

  const { data: allUsers, isLoading } = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ["users"]
  })

  const columnDefs = [
    { headerName: 'Username', field: 'username', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    { headerName: 'isAdmin', field: 'isAdmin', sortable: true, filter: true }
  ]

  const paginationPageSize = 10; // Number of rows per page
  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  if (isLoading) return <p>Loading...</p>

  return (
    <Layout>
      <div>
        <h2 className="text-2xl text-slate-800 font-bold my-2">
          All users
        </h2>
        <div className="ag-theme-alpine" style={{ height: '500px', width: '615px' }}>
          <AgGridReact
            paginationAutoPageSize={paginationPageSize}
            columnDefs={columnDefs}
            rowData={allUsers}
            pagination={true}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Users