
import React from 'react'
import fetchWithToken from '@/utils/fetchUtils';
import { cookies } from 'next/headers';
import Table from './table'

async function fetchData() {
    const cookieStore = cookies()
    
    const token = cookieStore.getAll()[0] ? cookieStore.getAll()[0].value : ""
    const response = await fetchWithToken("/admin/news", { method: "GET", cache: "no-store", headers: { Authorization: `Bearer ${token}` } }, 0)
    if (await response.ok) {
        return await response.json();
    } else {
        const test = await response.json()
        return test["message"]
    }

    
}

export default async function table() {
    const data = await fetchData()

    console.log(data);
    

    return (
        <div>
            <Table
                data={data}
            />
        </div>
    )
}
