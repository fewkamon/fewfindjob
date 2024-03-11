"use client"

import React, { useState } from 'react'
import { FaLocationDot, FaPhoneFlip, FaKey, FaH } from "react-icons/fa6";
import { FaHistory, FaCogs, FaBookmark } from "react-icons/fa";
import Image from 'next/image';
import { LogoutMe } from '@/store/membersSlice';
import Imagefewtest from '@/assets/imagefewtest.png'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux';
import { AppUseSelector, AppDispatch } from '@/store/Reducer';
import toast from 'react-hot-toast';
const BASE_URL = process.env.BACKEND_URL;
import Link from 'next/link';

export default function Steppers() {
    const data = AppUseSelector((state) => state.member);
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()


    const Logout = () => {
        dispatch(LogoutMe())
        router.push("/")
        toast.success("ออกจากระบบเรียบร้อย")
    }


    const locationlist = ["ทำงานบริษัท", "ทำงานที่บ้าน", "ไอบริจ"]
    const typework = ["สหกิจ", "งานประจำ", "งานพาทไทม์", "ฟรีแลนซ์"]

    return (
        <main className='mt-12'>

            <div className="container mx-auto md:px-[20rem] mt-12 ">
                <div className="p-7 rounded-lg">

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">

                            <Image src={
                                data.data.jobseeker.image ? `${BASE_URL}/file/${data.data.jobseeker.image}` : Imagefewtest
                            } className='object-cover w-[70px] h-[70px] rounded-full' width={70} height={70} alt="t" />

                            <div className="ml-9">
                                <p className="text-medium text-[20px]">
                                    {`${data.data.jobseeker.firstName} ${data.data.jobseeker.lastName}`}
                                </p>
                                <p className="text-[#877B7B] text-[16px]">{data.data.email}</p>
                            </div>
                        </div>

                        <div className="md:block hidden">
                            <p className="bg-[#2255A4] px-7 py-2  rounded-lg text-white shadow">คนหางาน</p>
                        </div>
                    </div>


                    <div className="grid grid-cols-12 gap-5 mt-12">

                        <div className="col-span-12">
                            <div className="bg-[#EDEDED]  p-3">
                                <div className="mx-4">
                                    <div className="flex items-center md:justify-center text-[17px]">
                                        <FaPhoneFlip className="-mt-1" />
                                        <p className="ml-5">เบอร์</p>
                                        <p className="md:ml-5 ml-2 mt-[1px] font-medium  text-[15px]">{data.data.jobseeker.phonenumber}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6">
                            <div className="bg-[#EDEDED]  p-3">
                                <div className="mx-4">
                                    <Link href="/account/manage/changepassword">
                                        <div className="flex items-center  text-[17px]">
                                            <FaKey className="-mt-1 " />
                                            <p className="ml-5">เปลี่ยนรหัสผ่าน</p>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6">
                            <div className="bg-[#EDEDED]  p-3">
                                <div className="mx-4">
                                    <Link href="/account/history/recruit">
                                        <div className="flex items-center  text-[17px]">
                                            <FaHistory className="-mt-1 " />
                                            <p className="ml-5">ประวัติงานที่สมัคร</p>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>


                        <div className="col-span-12 md:col-span-6">
                            <div className="bg-[#EDEDED]  p-3">
                                <div className="mx-4">
                                    <Link href="/account/manage">
                                        <div className="flex items-center  text-[17px]">
                                            <FaCogs className="-mt-1 " />
                                            <p className="ml-5">แก้ไขข้อมูลส่วนตัว</p>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6">
                            <div className="bg-[#EDEDED]  p-3">
                                <div className="mx-4">
                                    <Link href="/account/history/bookmark">
                                        <div className="flex items-center  text-[17px]">
                                            <FaBookmark className="-mt-1 " />
                                            <p className="ml-5">โพสต์ที่บันทึกไว้</p>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                        </div>



                    </div>

                    <button onClick={() => Logout()} className='bg-[#F82E2E] font-bold text-white mt-9 rounded-lg px-4 py-3 w-full'>ออกจากระบบ</button>



                </div >
            </div >

        </main >
    )

}
