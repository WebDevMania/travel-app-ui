"use client"
import Link from 'next/link'
import React from 'react'

const SuccessPage = () => {
  return (
    <div className="mt-28 h-screen w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="font-bold text-3xl text-slate-700">
          You've successfully booked your order!
        </h2>
        <Link className="font-semibold text-1xl text-slate-500" href='/reservations'>
          Check your reservations here
        </Link>
      </div>
    </div>
  )
}

export default SuccessPage