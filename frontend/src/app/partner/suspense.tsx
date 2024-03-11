import fetchWithToken from '@/utils/fetchUtils';
import React, { FormEvent, useState } from 'react'
const BASE_URL = process.env.BACKEND_URL;
import Image from 'next/image';
import Link from 'next/link';
import { Filter } from './filter';

async function fetchData() {
    try {
        const response = await fetchWithToken("/company", { method: "GET" }, 60)
        if (await response.ok) {
            return await response.json();
        } else {
            return null
        }
    } catch {
        return null
    }
}


export default async function suspense() {
    let data = await fetchData()

    return (
        <div>
            <Filter data1={data} />
        </div >
    )
}



export function Loading() {
    return (
        <>
            <div>
                <div className="flex items-center justify-center min-h-screen p-5 min-w-screen">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </>
    )
}