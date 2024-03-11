import fetchWithToken from '@/utils/fetchUtils';
import React from 'react'
import Image from 'next/image';
const BASE_URL = process.env.BACKEND_URL;
import Link from 'next/link';
import { AiFillClockCircle, AiFillEye } from "react-icons/ai";
import { formatDateTime, formatNumber, formatString } from '@/utils/formatUtils';



async function fetchData(id: string) {
    try {
        const response = await fetchWithToken(`/news/${id}`, { method: "GET" }, 60)
        if (await response.ok) {
            return await response.json();
        } else {
            return {}
        }
    } catch {
        return {}
    }
}


export default async function Server({ id }: { id: string }) {
    const { data, top } = await fetchData(id)
    return data ? (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-12  gap-x-6 gap-y-8 mt-6" >
                <div className="col-span-7">
                    <p className='mb-5 text-[20px]'>{data.topic}</p>
                    <Image src={
                        `${BASE_URL}/file/${data.image}`
                    } className='transition-all duration-300 shadow-md hover:shadow-lg rounded-lg mx-auto' width={900} height={1000} alt="t" />
                    <div className="mt-4">
                        <div className="flex mt-2 justify-between text-[14px] text-gray-800">

                            <div className="flex items-center ">
                                <AiFillClockCircle />
                                <p className='ml-1'>
                                    {formatDateTime(data.createdAt)}
                                </p>
                            </div>

                            <div className="flex items-center">
                                <AiFillEye />
                                <p className='ml-1'>

                                    {formatNumber(~~data.view)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8' dangerouslySetInnerHTML={{ __html: data.detail }}>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="border-r border-gray-300 h-full"></div>

                </div>
                <div className="col-span-4">
                    <div className="ml-2">

                        <p className='text-[20px] mb-5'>ประกาศเด่น</p>

                        {
                            top.map((item: any, i: any) => (
                                <Link href={`/news/${item.id}`} key={i}>
                                    <div className="grid grid-cols-1 my-4 md:grid-cols-12 gap-3 transition-all duration-300 hover:opacity-[0.8]"  >
                                        <div className="col-span-6">
                                            <Image src={
                                                `${BASE_URL}/file/${item.image}`
                                            } className='object-cover rounded-lg' width={1000} height={1000} alt="t" />
                                        </div>

                                        <div className="col-span-6">
                                            <div className="">
                                                <p className='mt-4 mb-3'>
                                                    {formatString(item.topic, 50)}

                                                </p>
                                                <div className="flex items-center text-[13px]">
                                                    <AiFillClockCircle />
                                                    <p className='ml-1'>
                                                        {formatDateTime(item.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {i !== top.length - 1 ? (
                                        <hr />
                                    ) : (<></>)}
                                </Link>
                            ))
                        }
                    </div>

                </div>

            </div >
        </div >

    ) : (<>
        <Loading />
    </>)
}




export function Loading() {
    return (
        <div className='animate-pulse'>

            <div className="grid grid-cols-1 md:grid-cols-12  gap-x-6 gap-y-8 mt-6" >
                <div className="col-span-7">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-5"></div>
                    <div className="bg-gray-300 w-full h-[400px] shadow-md hover:shadow-lg rounded-lg mx-auto"></div>
                    <div className="mt-4">
                        <div className="flex mt-2 justify-between text-[14px] text-gray-800">

                            <div className="flex items-center ">
                                <div className="ml-1 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                            </div>

                            <div className="flex items-center">
                                <div className="ml-1 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                            </div>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-4"></div>
                    </div>
                </div >

                <div className="col-span-1">
                    <div className="border-r border-gray-300 h-full"></div>

                </div>
                <div className="col-span-4">
                    <div className="ml-2">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-5"></div>

                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>


                    </div>

                </div>

            </div >



        </div>
    )
}
