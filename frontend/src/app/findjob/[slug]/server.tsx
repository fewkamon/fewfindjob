import React from 'react'
import { FaLocationDot, FaUserTag, FaMoneyBill } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import Image from 'next/image';
import fetchWithToken from '@/utils/fetchUtils';
import getLocation from '@/utils/location';
import { Modal } from 'antd';
import Modal1 from './modal'
import Fallback from './fallback';
import { cookies } from 'next/headers';
import Link from 'next/link';
let Favourite = React.lazy(() => import('./favourite'))

const BASE_URL = process.env.BACKEND_URL;

async function fetchData(id: string) {
    try {
        const response = await fetchWithToken(`/job/id/${id}`, { method: "GET" }, 60)
        if (await response.ok) {
            return await response.json();
        } else {
            return null
        }
    } catch {
        return null
    }
}

async function fetchBookmark(id: string) {
    try {
        const cookieStore = cookies()
        const token = cookieStore.getAll()[0] ? cookieStore.getAll()[0].value : ""
        const response = await fetchWithToken(`/bookmark/${id}`, { method: "GET", cache: "no-store", headers: { Authorization: `Bearer ${token}` } }, 0)
        if (await response.ok) {
            return await response.json();
        } else {
            return null
        }
    } catch {
        return null
    }
}

type ServerProps = {
    id: string;
}

export default async function page({ id }: ServerProps) {
    const { data, more } = await fetchData(id)
    const bookmark = await fetchBookmark(id)

    let test = await data

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

    return test ? (
        <div className='mt-12'>
            <div className="container mx-auto md:px-20 mt-12 ">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <Image src={`${BASE_URL}/file/${test.company.image}`} className=' h-[99px]' height={99} width={99} alt="" />
                        <div className="ml-5">
                            <div className="">
                                <p className="">{test.company.companyname}</p>
                                <p className='mt-2 text-[#2255A4] text-[15px]'>
                                    <Link href={`/partner/${test.companyId}`}>
                                        ดูรายละเอียดบริษัท
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center ">
                        <Favourite id={id} data={bookmark} />
                    </div>
                </div>

                <div className="mt-5">

                    <div className="shadow bg-[#F2F7FF] relative p-5 rounded-md mb-5">
                        <div className=" flex justify-between">
                            <div className="">
                                <p className='text-[#2255A4] text-[15px] font-semibold'>{test.title}</p>
                                <p className='text-[#5C5C5C] text-[14px] mt-3'>{test.company.companyname}</p>

                                <div className="mt-7">
                                    <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                        <div className="flex items-center">
                                            <FaLocationDot className="mr-3" />
                                            <p className='font-medium text-[#000000]'>สถานที่ปฏิบัติงาน</p>
                                            <div className="ml-[7rem] font-medium">
                                                {getLoca(test.company.location)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                        <div className="flex items-center">
                                            <FaMoneyBill className="mr-3" />
                                            <p className='font-medium text-[#000000]'>เงินเดือน</p>
                                            <div className="ml-[9.6rem] font-medium">{test.salary.toLocaleString()} ++</div>
                                        </div>
                                    </div>


                                    <div className='text-[#5C5C5C] font-medium text-[13px] mb-2'>
                                        <div className="flex items-center">
                                            <FaUserTag className="mr-3" />
                                            <p className='font-medium text-[#000000]'>อัตรา</p>
                                            <div className="ml-[10.8rem] font-medium">{test.amount.toLocaleString()}</div>
                                        </div>
                                    </div>


                                </div>



                            </div>
                            <div className="flex flex-col justify-self-center">
                                <p className='text-[#5C5C5C] text-[14px] mb-2 ml-auto'>{getDatex(test.createdAt)}</p>
                            </div>
                        </div>
                        <Modal1 id={id} />

                    </div>
                </div>


                <div className="mt-16">

                    <div className="grid grid-cols-1 md:grid-cols-12 space-y-5 md:space-y-0 md:gap-4">
                        <div className="col-span-7">
                            <div className="bg-white shadow p-6">
                                <p className='text-[#2255A4] text-[17px] font-medium mb-3'>รายละเอียดงาน </p>
                                <p className='text-[#4B4B4B] text-[15px]' dangerouslySetInnerHTML={{ __html: test.detail.replace(/\n/g, '<br/>') }}>
                                </p>
                            </div>

                            <div className="bg-white shadow p-6 mt-5">
                                <p className='text-[#2255A4] text-[17px] font-medium mb-3'>คุณสมบัติผู้สมัคร </p>
                                <p className='text-[#4B4B4B] text-[15px]' dangerouslySetInnerHTML={{ __html: test.qualification.replace(/\n/g, '<br/>') }}>
                                </p>
                            </div>
                        </div>

                        <div className="col-span-5">
                            <div className="bg-white shadow p-6">
                                <p className='text-[#2255A4] text-[17px] font-medium mb-3'>วิธีการสมัคร </p>
                                <p className='text-[#4B4B4B] text-[15px]' dangerouslySetInnerHTML={{ __html: test.how_to_apply.replace(/\n/g, '<br/>') }}>
                                </p>
                            </div>

                            <div className="bg-white shadow p-6 mt-5">
                                <p className='text-[#2255A4] text-[17px] font-medium mb-3'>ติดต่อ </p>
                                <p className='text-[#4B4B4B] text-[15px]' dangerouslySetInnerHTML={{ __html: test.contact.replace(/\n/g, '<br/>') }}>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 mb-12">

                    <p className='text-[#2255A4] font-semibold  text-[20px] mb-5'>งานอื่น ๆ ของบริษัทนี้</p>
                    <div className="grid grid-cols-1 md:grid-cols-12  md:space-y-0 md:gap-6">
                        {more.map((item: any, i: number) => (
                            <div className="col-span-3" key={i}>
                                <Link href={`/findjob/${item.id}`}>
                                    <div className="bg-[#ECECEC] rounded-md border border-[#C1C1C1] p-5">
                                        <div className="max-w-sm ">
                                            <div className="mb-4">  {JSON.stringify(item.title)}</div>
                                            <div className="text-[15px] text-gray-700 flex items-center">
                                                <FaLocationDot className="mr-3" />
                                                <div className=" font-medium">
                                                    {getLoca(test.company.location)}
                                                </div>
                                            </div>
                                            <div className="text-[15px] text-gray-700 flex mt-3 items-center">
                                                <FaMoneyBill className="mr-3" />
                                                <div className=" font-medium">{test.salary.toLocaleString()} ++</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        ))}


                    </div>
                </div>
            </div>
        </div>
    ) : (<>
        <Fallback />
    </>)
}
