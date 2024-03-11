
import React from 'react'
import fetchWithToken from '@/utils/fetchUtils';
import { cookies } from 'next/headers';
import Table from './table'

async function fetchData() {
    const cookieStore = cookies()
    const token = cookieStore.getAll()[0] ? cookieStore.getAll()[0].value : ""
    const response = await fetchWithToken("/admin/jobseeker", { method: "GET", cache: "no-store", headers: { Authorization: `Bearer ${token}` } }, 0)
    if (await response.ok) {
        return await response.json();
    } else {
        const test = await response.json()
        return test["message"]
    }
}

export default async function table() {
    const data = await fetchData()

    return (
        <div>
            <Table
                data1={data}
            />
        </div>
    )
}


export function Loading() {

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen p-5 min-w-screen">
                <div className="flex space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}
