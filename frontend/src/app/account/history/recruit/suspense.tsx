import fetchWithToken from '@/utils/fetchUtils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'
import { FaLocationDot, FaUserTag } from 'react-icons/fa6';
import Image from 'next/image';
import getLocation from '@/utils/location';
import { formatDateTimeShort } from '@/utils/formatUtils';
import TableZa from './table';
const BASE_URL = process.env.BACKEND_URL;

async function fetchData() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.getAll()[0] ? cookieStore.getAll()[0].value : ""
    const response = await fetchWithToken("/jobseeker/history/recruit", { method: "GET", cache: "no-store", headers: { Authorization: `Bearer ${token}` } }, 0)
    if (await response.ok) {
      return await response.json();
    } else {
      return null
    }
  } catch (err) {
    return null
  }

}


export default async function Suspense() {
  const data = await fetchData()

  return data ? (
    <div>
      <TableZa data={data} />
    </div>
  ) : (<> <Loading /> </>)
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
