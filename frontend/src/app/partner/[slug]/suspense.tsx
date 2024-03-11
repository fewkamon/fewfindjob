import fetchWithToken from '@/utils/fetchUtils';
import React from 'react'
const BASE_URL = process.env.BACKEND_URL;
import Image from 'next/image';
import Link from 'next/link';
import getLocation from '@/utils/location';
import { FaLocationDot, FaUserTag, FaMoneyBill } from "react-icons/fa6";

async function fetchData(id: string) {
    try {
        const response = await fetchWithToken(`/company/${id}`, { method: "GET" }, 60)
        if (await response.ok) {
            return await response.json();
        } else {
            return null
        }
    } catch {
        return null
    }
}

export default async function suspend({ id }: { id: string }) {
    const data = await fetchData(id)

    const getLoca = (path: any) => {
        const test: any = getLocation(path)
        return `อ.${test[1].name_th} จ.${test[0].name_th}`
    }

    const getDatex = (datse: any) => {
        const date = new Date(datse);
        const day = date.getDate();
        const monthNames = [
            'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
            'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ];
        const monthIndex = date.getMonth();
        const year = date.getFullYear() + 543; // Convert to Thai year

        const thaiDate = `${day} ${monthNames[monthIndex]} ${year}`;
        return thaiDate
    }


    return data ? (
        <div>
            <div className='mt-12'>
                <div className="container mx-auto md:px-20 mt-12 ">
                    <div className="flex items-center">
                        <div className='w-[99px] h-[99px] bg-gray-200 rounded-md'>
                            <Image src={
                                `${BASE_URL}/file/${data.image}`
                            } className='object-cover mx-auto rounded-lg' width={99} height={99} alt="t" />
                        </div>
                        <div className="ml-5">
                            <div className="">{(data.companyname)}</div>
                            <div className='mt-2 text-[#2255A4] text-[15px]'></div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <p className='text-[18px]'>
                            {data.description}
                        </p>

                    </div>


                    <div className="mt-8">
                        <p className='text-[19px] mb-2 font-semibold'>สวัสดิการ</p>
                        {data.benefits.map((item: any, i: number) => (
                            <div key={i}>
                                <p className='text-[17px]'>- {(item)}</p>
                            </div>
                        ))}
                    </div>



                    <div className="mt-16 mb-12">
                        <div className="flex justify-between">

                            <div className='text-[#2255A4] font-semibold  text-[20px] '>  <p className='text-[19px] mb-2 font-semibold'>งานทั้งหมด</p></div>
                            <div className='text-gray-600 font-semibold  text-[17px] '>{data.Job.length} ตำแหน่ง</div>
                        </div>
                        <div className=" md:px-8 mt-3 ">

                            {data.Job.map((item: any, i: number) => (
                                <Link href={`/findjob/${item.id}`} key={i}>
                                    <div className="shadow bg-[#F2F7FF] relative p-5 rounded-md mb-5">
                                        <div className=" flex justify-between">
                                            <div className="">
                                                <div className='text-[#2255A4] text-[15px] font-semibold'>{item.title}</div>
                                                <div className='text-[#5C5C5C] text-[14px] mt-3'>{data.companyname}</div>

                                                <div className="mt-7">
                                                    <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                        <div className="flex items-center">
                                                            <FaLocationDot className="mr-3" />
                                                            <p className='font-medium text-[#000000]'>สถานที่ปฏิบัติงาน</p>
                                                            <div className="ml-[7rem] font-medium">
                                                                {getLoca(data.location)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                        <div className="flex items-center">
                                                            <FaMoneyBill className="mr-3" />
                                                            <p className='font-medium text-[#000000]'>เงินเดือน</p>
                                                            <div className="ml-[9.6rem] font-medium">{item.salary.toLocaleString()} ++</div>
                                                        </div>
                                                    </div>

                                                    <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                        <div className="flex items-center">
                                                            <FaUserTag className="mr-3" />
                                                            <p className='font-medium text-[#000000]'>อัตรา</p>
                                                            <div className="ml-[10.8rem] font-medium">{item.amount.toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-self-center">
                                                <p className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'>{getDatex(item.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                       
                        </div>




                    </div>
                </div>
            </div>
        </div>
    ) : (<><Loading /></>)
}


export function Loading() {
    return (
        <div>
            <div className='mt-12'>
                <div className="container mx-auto md:px-20 mt-12 animate-pulse ">
                    <div className="flex items-center">
                        <div className='w-[99px] h-[99px] bg-gray-200 rounded-md'> </div>
                        <div className="ml-5">
                            <div className=""><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div></div>
                            <div className='mt-2 text-[#2255A4] text-[15px]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div></div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-4"></div></div>

                    </div>


                    <div className="mt-12">
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div></div>
                        <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-4"></div></div>

                    </div>



                    <div className="mt-16 mb-12">

                        <div className='text-[#2255A4] font-semibold  text-[20px] mb-5'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-4"></div></div>
                        <div className='text-[#2255A4] font-semibold  text-[20px] mb-5 float-right'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-4"></div></div>
                        <div className=" md:p-8 ">

                            <div className="shadow bg-[#F2F7FF] relative p-5 rounded-md mb-5">
                                <div className=" flex justify-between">
                                    <div className="">
                                        <div className='text-[#2255A4] text-[15px] font-semibold'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div></div>
                                        <div className='text-[#5C5C5C] text-[14px] mt-3'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-4"></div></div>

                                        <div className="mt-7">
                                            <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                <div className="flex items-center">
                                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4 mr-3"></div>
                                                    <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div></div>
                                                    <div className="ml-[7rem] font-medium"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div></div>
                                                </div>
                                            </div>

                                            <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                <div className="flex items-center">
                                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4  mr-3"></div>
                                                    <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div></div>
                                                    <div className="ml-[9.6rem] font-medium"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div></div>
                                                </div>
                                            </div>


                                            <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                <div className="flex items-center">
                                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4 mr-3"></div>
                                                    <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div></div>
                                                    <div className="ml-[10.8rem] font-medium"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div></div>
                                                </div>
                                            </div>


                                        </div>



                                    </div>
                                    <div className="flex flex-col justify-self-center">
                                        <div className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-4"></div></div>
                                    </div>
                                </div>
                            </div>

                            <div className="shadow bg-[#F2F7FF] relative p-5 rounded-md mb-5">
                                <div className=" flex justify-between">
                                    <div className="">
                                        <div className='text-[#2255A4] text-[15px] font-semibold'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div></div>
                                        <div className='text-[#5C5C5C] text-[14px] mt-3'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-4"></div></div>

                                        <div className="mt-7">
                                            <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                <div className="flex items-center">
                                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4 mr-3"></div>
                                                    <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div></div>
                                                    <div className="ml-[7rem] font-medium"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div></div>
                                                </div>
                                            </div>

                                            <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                <div className="flex items-center">
                                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4  mr-3"></div>
                                                    <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div></div>
                                                    <div className="ml-[9.6rem] font-medium"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div></div>
                                                </div>
                                            </div>


                                            <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                                <div className="flex items-center">
                                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4 mr-3"></div>
                                                    <div className='font-medium text-[#000000]'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-4"></div></div>
                                                    <div className="ml-[10.8rem] font-medium"><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div></div>
                                                </div>
                                            </div>


                                        </div>



                                    </div>
                                    <div className="flex flex-col justify-self-center">
                                        <div className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'><div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-4"></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    )
}
