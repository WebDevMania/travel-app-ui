"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Dubai from '../../../../../public/assets/dubai.jpg'
import Image from 'next/image'
import axiosAPI from '@/utils/axiosAPI'
import { toast } from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'
import Link from 'next/link'
import Input from '@/ui/Input'
import Button from '@/ui/Button'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      await axiosAPI.post('/register', data)

      toast.success("Success! Redirecting to login")

      setTimeout(() => {
        router.push('/login')
      }, 2500)

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='relative h-screen w-full'>
      <div className='relative h-full w-full'>
        <Image
          className='brightness-50 h-full w-full object-cover'
          src={Dubai}
          alt=""
        />
        <div className='h-[450px] w-[400px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg'>
          <h2 className='text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500'>
            Create an account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-12 mx-auto flex flex-col items-center'>
            <div className='w-full flex flex-col items-center'>
              <Input
                register={register("username")}
                type="text"
                placeholder="John123"
              />
              <p className='h-10 ml-2 text-red-500 text-center'>
                {errors?.username?.message}
              </p>
            </div>
            <div className='w-full flex flex-col items-center'>
              <Input
                register={register("email")}
                type="email"
                placeholder="John@gmail.com"
              />
              <p className='h-10 ml-2 text-red-500 text-center'>
                {errors?.email?.message}
              </p>
            </div>
            <div className='w-full flex flex-col items-center'>
              <Input
                register={register("password")}
                type="password"
                placeholder="********"
              />
              <p className='h-10 ml-2 text-red-500 text-center'>
                {errors?.password?.message}
              </p>
            </div>
            <Button
              label="Submit"
            />
          </form>
          <Link
            className='block text-center mt-2 py-2 mx-auto text-slate-500 hover:text-slate-700'
            href={'/login'}
          >
            Login
          </Link>
        </div>
      </div >
    </div >
  )
}

export default SignUp