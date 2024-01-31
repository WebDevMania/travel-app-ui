import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

const Layout = ({
    children
}) => {
    return (
        <div className="h-screen w-screen overflow-hidden bg-slate-100">
            <div className="h-full w-full px-10 py-6">
                <Navbar />
                <div className="h-full w-full mt-8 mx-auto grid grid-cols-8 gap-12">
                    <Sidebar />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout