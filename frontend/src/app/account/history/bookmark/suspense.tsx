import fetchWithToken from '@/utils/fetchUtils';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'
import { FaLocationDot, FaUserTag } from 'react-icons/fa6';
import Image from 'next/image';
import getLocation from '@/utils/location';
import { formatDateTimeShort } from '@/utils/formatUtils';
const BASE_URL = process.env.BACKEND_URL;

async function fetchData() {

  try {
    const cookieStore = cookies()
    const token = cookieStore.getAll()[0] ? cookieStore.getAll()[0].value : ""
    const response = await fetchWithToken("/bookmark", { method: "GET", cache: "no-store", headers: { Authorization: `Bearer ${token}` } }, 0)
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

  const getLoca = (path: any) => {
    const test: any = getLocation(path)
    return `อ.${test[1].name_th} จ.${test[0].name_th}`
  }
  return data ? (
    <div>
      {
        data.map((item: any, index: any) => (

          <div className="bg-[#F2F7FF] p-5 rounded-md mb-5" key={index}>
            <Link href={`/findjob/${item.job.id}`}>
              <div className="flex justify-between">
                <div className="">
                  <p className='text-[#2255A4] text-[15px] font-semibold'>{(item.job.title)}</p>
                  <p className='text-[#5C5C5C] text-[14px] mt-3'>{(item.job.company.companyname)}</p>

                  <div className="mt-7">
                    <div className='text-[#5C5C5C] font-medium text-[13px]'>

                      <div className="flex">
                        <FaLocationDot className="text-[#2255A4] mr-2" />
                        {getLoca(item.job.company.location)}

                        <div className="ml-[5rem] font-medium">{item.job.salary.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className='text-[#5C5C5C] font-medium text-[13px] mt-2'>
                      <div className="flex">
                        <FaUserTag className="text-[#2255A4] mr-2" />
                        {item.job.jobType}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-self-center">
                  <p className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'>{formatDateTimeShort(item.job.createdAt)}</p>
                  <Image src={`${BASE_URL}/file/${item.job.company.image}`} className=' h-[99px]' height={99} width={99} alt="" />
                </div>
              </div>
            </Link>
          </div>


        ))
      }

    </div>
  ) : (<> <Loading /> </>)
}



export function Loading() {
  return (
    <div>


      <div className="animate-pulse bg-[#F2F7FF] p-5 rounded-md mb-5" >
        <div className="flex justify-between">
          <div className="">
            <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#2255A4] text-[15px] font-semibold'></p>
            <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

            <div className="mt-7">
              <div className='text-[#5C5C5C] font-medium text-[13px]'>

                <div className="flex">
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

                  <div className="ml-[5rem] font-medium">
                    <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                  </div>
                </div>
              </div>

              <div className='text-[#5C5C5C] font-medium text-[13px] mt-2'>
                <div className="flex">
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-self-center">
            <p className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'></p>
            <div className="h-[99px] w-[99px] bg-gray-200"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse bg-[#F2F7FF] p-5 rounded-md mb-5" >
        <div className="flex justify-between">
          <div className="">
            <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#2255A4] text-[15px] font-semibold'></p>
            <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

            <div className="mt-7">
              <div className='text-[#5C5C5C] font-medium text-[13px]'>

                <div className="flex">
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

                  <div className="ml-[5rem] font-medium">
                    <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                  </div>
                </div>
              </div>

              <div className='text-[#5C5C5C] font-medium text-[13px] mt-2'>
                <div className="flex">
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-self-center">
            <p className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'></p>
            <div className="h-[99px] w-[99px] bg-gray-200"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse bg-[#F2F7FF] p-5 rounded-md mb-5" >
        <div className="flex justify-between">
          <div className="">
            <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#2255A4] text-[15px] font-semibold'></p>
            <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

            <div className="mt-7">
              <div className='text-[#5C5C5C] font-medium text-[13px]'>

                <div className="flex">
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

                  <div className="ml-[5rem] font-medium">
                    <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                  </div>
                </div>
              </div>

              <div className='text-[#5C5C5C] font-medium text-[13px] mt-2'>
                <div className="flex">
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-self-center">
            <p className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'></p>
            <div className="h-[99px] w-[99px] bg-gray-200"></div>
          </div>
        </div>
      </div>

      <div className="animate-pulse bg-[#F2F7FF] p-5 rounded-md mb-5" >
        <div className="flex justify-between">
          <div className="">
            <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#2255A4] text-[15px] font-semibold'></p>
            <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

            <div className="mt-7">
              <div className='text-[#5C5C5C] font-medium text-[13px]'>

                <div className="flex">
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>

                  <div className="ml-[5rem] font-medium">
                    <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                  </div>
                </div>
              </div>

              <div className='text-[#5C5C5C] font-medium text-[13px] mt-2'>
                <div className="flex">
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                  <p className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 text-[#5C5C5C] text-[14px] mt-3'></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-self-center">
            <p className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'></p>
            <div className="h-[99px] w-[99px] bg-gray-200"></div>
          </div>
        </div>
      </div>

    </div>
  )
}
