"use client"

import fetchWithToken from '@/utils/fetchUtils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdFavoriteBorder } from 'react-icons/md'

export default function Favourite({ id, data }: any) {

    const [type, setType] = useState<any>()

    const router = useRouter()


    useEffect(() => {
        setType(data)
    }, [data])

    const handleClick = async () => {
        try {
            if (!type) {
                const response = await fetchWithToken(`/bookmark/${id}`, {
                    method: 'POST',
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }
                toast.success("ถูกใจไปแล้ว")
                await router.refresh()
            } else {
                const response = await fetchWithToken(`/bookmark/${data.id}`, {
                    method: 'DELETE',
                }, 0)
                if (!response.ok) {
                    const test = await response.json()
                    throw new Error(test["message"]);
                }
                toast.success("ยกเลิกถูกใจไปแล้ว")
                await router.refresh()
            }

        } catch (err: any) {

            if (err.message === "Unauthorized") {
                toast.error("ต้องเข้าสู่ระบบก่อน")
            } else {
                toast.error(err.message)
            }
        }

    }

    return (
        <div>
            <button onClick={handleClick}  className={`cursor-pointer rounded-full ${type ? 'border-red-500 text-white bg-red-500 hover:text-gray-200' : 'border-gray-500 hover:border-red-500 text-gray-500 hover:text-red-500'} p-2 border text-[22px]`}>
                <MdFavoriteBorder className="" />
            </button>
        </div>
    )
}