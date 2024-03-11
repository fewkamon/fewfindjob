"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaLocationDot, FaUserTag } from "react-icons/fa6";
import Image from 'next/image';
import fetchWithToken from '@/utils/fetchUtils';
import toast from 'react-hot-toast';
import CheckboxGroup from '@/components/CheckboxGroup';
import getLocation from '@/utils/location';
import Link from 'next/link';
const BASE_URL = process.env.BACKEND_URL;

export default function Steppers() {

    const [tlist, setTlist] = useState<string[]>()
    const [keyword, setKeyword] = useState<string>("")
    const [result, setResult] = useState<any>([])

    const typelist = [
        { name: 'เต็มเวลา', value: "FULL_TIME" },
        { name: 'ฝึกงาน', value: "INTERNSHIP" },
        { name: 'งานพาทไทม์', value: "PART_TIME" },
        { name: 'ฟรีแลนซ์', value: "FREELANCE" },
    ];

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const typet = !tlist || tlist?.length === 0 ? "all" : tlist?.join(",")
            const response = await fetchWithToken(`/job/filter?keyword=${keyword}&type=${typet}`, {
                method: 'GET',
            }, 0)
            if (!response.ok) {
                const test = await response.json()
                console.log(test["message"]);

                throw new Error(test["message"]);
            }
            const test = await response.json()
            console.log(test);

            await setResult(test)
        } catch (err: any) {
            toast.error(err.message)
        }
    };

    const handleTypeChange = (selectedOptions: string[]) => {
        setTlist(selectedOptions);
    };

    const getLoca = (path: any) => {
        const test:any = getLocation(path)
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

    return (
        <main className='mt-12'>

            <div className="container mx-auto md:px-20 mt-12 ">
                <div className="grid grid-cols-1 md:grid-cols-12 space-y-5 md:space-y-0 md:gap-4">
                    <div className="col-span-4">

                        <div className="shadow bg-white p-7 rounded-lg">
                            <p className="text-[#2255A4] font-semibold text-[19px] text-center">คำที่ต้องการค้นหา</p>
                            <div className="mt-7">

                                <form onSubmit={handleSubmit}>

                                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                            </svg>
                                        </div>
                                        <input type="text" id="first_name" onChange={(e) => setKeyword(e.target.value)} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10" placeholder="ระบุตำแหน่งงาน หรือชื่อบริษัท" required />
                                    </div>


                                    <p className='text-[15px] mt-5 font-semibold'>ประเภทงาน</p>
                                    <div className="mt-3 mb-5 text-[14px]">
                                        <CheckboxGroup options={typelist} onChange={handleTypeChange} checked={[]} />
                                    </div>

                                    <button type="submit" className="w-full text-white bg-[#2255A4] hover:bg-[#244E8F] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ค้นหา</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-8">
                        <div className="shadow bg-white p-7 rounded-lg">
                            <p className="text-[#2255A4] font-semibold text-[19px]">พบ {result.length} ตำแหน่งงาน</p>
                            <hr className='mt-3 mb-7' />

                            {result.map((item: any, index: any) => (

                                <div className="bg-[#F2F7FF] p-5 rounded-md mb-5" key={index}>
                                    <Link href={`/findjob/${item.id}`}>
                                        <div className="flex justify-between">
                                            <div className="">
                                                <p className='text-[#2255A4] text-[15px] font-semibold'>{item.title}</p>
                                                <p className='text-[#5C5C5C] text-[14px] mt-3'>{item.company.companyname}</p>

                                                <div className="mt-7">
                                                    <div className='text-[#5C5C5C] font-medium text-[13px]'>

                                                        <div className="flex">
                                                            <FaLocationDot className="text-[#2255A4] mr-2" />
                                                            {getLoca(item.company.location)}
                                                            <div className="ml-[5rem] font-medium">{item.salary.toLocaleString()}</div>
                                                        </div>
                                                    </div>

                                                    <div className='text-[#5C5C5C] font-medium text-[13px] mt-2'>
                                                        <div className="flex">
                                                            <FaUserTag className="text-[#2255A4] mr-2" />
                                                            {item.jobType}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-self-center">
                                                <p className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'>{getDatex(item.createdAt)}</p>
                                                <Image src={`${BASE_URL}/file/${item.company.image}`} className=' h-[99px]' height={99} width={99} alt="" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}



                        </div>
                    </div>

                </div>
            </div >

        </main >
    )

}
