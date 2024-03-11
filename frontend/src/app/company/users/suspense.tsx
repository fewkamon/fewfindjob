import fetchWithToken from '@/utils/fetchUtils';
import { cookies } from 'next/headers';
import React from 'react'
import Table1 from './table1';
import Table2 from './table2';

async function fetchData() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.getAll()[0] ? cookieStore.getAll()[0].value : ""

    const response = await fetchWithToken("/job/company/recruit/urgent", { method: "GET", cache: "no-store", headers: { Authorization: `Bearer ${token}` } }, 0)
    if (await response.ok) {
      return await response.json();
    } else {

      return null
    }
  } catch (err: any) {

    return null
  }
}


async function fetchData1() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.getAll()[0] ? cookieStore.getAll()[0].value : ""
    const response = await fetchWithToken("/job/company/recruit/file", { method: "GET", cache: "no-store", headers: { Authorization: `Bearer ${token}` } }, 0)
    if (await response.ok) {
      return await response.json();
    } else {
      return null
    }
  } catch (err: any) {

    return null
  }
}

export default async function Suspend() {
  const test = await fetchData()
  const test1 = await fetchData1()
  return test ? (
    <div>
      <Table1 data={test} />
      <Table2 data={test1} />
    </div>
  ) : (<Loading />)
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