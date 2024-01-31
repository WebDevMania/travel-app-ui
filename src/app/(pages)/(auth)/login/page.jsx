"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Paris from '../../../../../public/assets/paris.jpg'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import { ClipLoader } from 'react-spinners'
import Link from 'next/link'
import Input from '@/ui/Input'
import Button from '@/ui/Button'


const Login = () => {

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(schema)
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    if (Object.keys(errors)?.length > 0) {
      toast.error("Enter valid data")
      return
    }

    setIsLoading(true)

    try {
      const res = await signIn("credentials", { ...data, redirect: false })

      if (res?.error == null) {
        router.push('/')
      } else {
        toast.error('Email or password is invalid')
      }
    } catch (error) {
      console.log(error)
    }

    setIsLoading(false)
  }

  return (
    <div className='relative h-screen w-full'>
      <div className='relative h-full w-full'>
        <Image
          className='brightness-50 h-full w-full object-cover'
          src={Paris}
          alt=""
        />
        <div className='h-[350px] w-[350px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
          <h2 className='text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500'>
            Log into your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-8 mx-auto flex flex-col items-center'>
            <div className='w-full flex flex-col items-center'>
              <Input
                type="email"
                register={register("email")}
                placeholder='John@gmail.com'
              />
              <p className='h-10 ml-2 text-red-500 text-center'>
                {errors?.email?.message}
              </p>
            </div>
            <div className='w-full flex flex-col items-center'>
              <Input
                type="password"
                register={register("password")}
                placeholder='*****'
              />
              <p className='h-10 ml-2 text-red-500 text-center'>
                {errors?.password?.message}
              </p>
            </div>
            <Button
              disabled={isLoading}
              label="Submit"
            />
          </form>
          <Link
            className='block text-center mt-1 py-2 text-slate-500 hover:text-slate-700'
            href={'/register'}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login