"use client"

import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { getUserById, updateUser } from './service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AiOutlineClose } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { schema } from './schema'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import ModalLayout from '@/app/admin/layout/ModalLayout'
import Input from '@/ui/Input'
import Button from '@/ui/Button'

const UserModal = ({
    userId,
    handleHideModal
}) => {

    const { data: user, isPending } = useQuery({
        queryFn: () => getUserById(userId),
        queryKey: ["admin", "users", { userId }],
        onSuccess: () => {
            reset({ username: user.username, email: user.email })
        }
    })

    const queryClient = useQueryClient()
    const { mutate: handleUpdateUser, isPending: isPendingMutation } = useMutation({
        mutationFn: ({ userId, data }) => updateUser({ userId, data }),
        mutationKey: ["admin", "users"],
        onSuccess: () => {
            toast.success("Successfully updated user")
            queryClient.invalidateQueries(["admin", "users"])
        }
    })

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        reset({
            username: user?.username,
            email: user?.email
        })
    }, [user?.username, user?.email])

    const onSubmit = (data) => {
        try {
            handleUpdateUser({ userId, data })
            handleHideModal()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ModalLayout 
          document="User"
          handleHideModal={handleHideModal}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full px-4 py-6 flex flex-col items-center gap-8'
            >
                <Input
                    type="text"
                    placeholder="Username..."
                    register={...register("username")}
                />
                <Input
                    type="email"
                    placeholder="Email..."
                    register={register("email")}
                />
                <Button
                    disabled={isPendingMutation}
                    label="Submit"
                />
            </form>
        </ModalLayout>
    )
}

export default UserModal