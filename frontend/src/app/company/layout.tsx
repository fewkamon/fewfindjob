"use client"

import React, { useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import Image from 'next/image'

import { AppUseSelector, AppDispatch } from '@/store/Reducer';
import { usePathname, useRouter } from 'next/navigation';
import Art from '@/assets/imagefewtest.png'
import LoggedIn from '@/components/layouts/LoggedIn';
const BASE_URL = process.env.BACKEND_URL;


type PageProps = {
    children: React.ReactNode,
}
export default function Layout({ children }: PageProps) {
    const data = AppUseSelector((state) => state.member);
    const pathname = usePathname();
    const router = useRouter();


    return (
        <LoggedIn role="COMPANY">
            <div>
                {!data.isLoggedIn ? (<></>) : (
                    <Sidebar>
                        <div className="container mx-auto md:pr-5">

                            <div className="bg-white rounded-lg px-5 py-3 flex items-center">
                                <div className="flex items-center">
                                    <Image src={
                                        data.data.company.image ? data.data.company.image : Art
                                    } className='object-cover w-[65px] h-[65px] border rounded-full' width={65} height={65} alt="t" />


                                    <div className="">

                                        <p className='ml-3 font-semibold text-[#565656]'>ฟิวจำกัดมหาชน</p>
                                        <p className='ml-3 text-[#C5C5C5] text-[15px]'>บริษัท</p>
                                    </div>
                                </div>


                            </div>

                            <div className="mt-7 ">

                                {data.data.company.status === "CHECK" ? (
                                    <>
                                        <div className="bg-teal-100 mb-5 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                                            <div className="flex">
                                                <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                                                <div>
                                                    <p className="font-bold">รอแอดมินตรวจสอบข้อมูล</p>
                                                    <p className="text-sm">ตรวจสอบให้แน่ใจว่าท่านได้กรอกข้อมูลบริษัทครบท้วนแล้ว.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {pathname === "/company" ? (<>{children}</>) : (<></>)}
                                    </>
                                ) : data.data.company.status === "DISAPPROVAL" ? (
                                    <>
                                        <div className="bg-red-100 mb-5 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
                                            <div className="flex">
                                                <div className="py-1"><svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                                                <div>
                                                    <p className="font-bold">ไม่ผ่านการตรวจสอบจากแอดมิน</p>
                                                    <p className="text-sm">ตรวจสอบให้แน่ใจว่าท่านได้กรอกข้อมูลบริษัทถูกต้องไหม.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {pathname === "/company" ? (<>{children}</>) : (<></>)}
                                    </>
                                ) : data.data.company.status === "PENDING" ? (
                                    <>
                                        <div className="bg-gray-400 mb-5 border-t-4 border-gray-500 rounded-b text-gray-100 px-4 py-3 shadow-md" role="alert">
                                            <div className="flex">
                                                <div className="py-1"><svg className="fill-current h-6 w-6 text-gray-100 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                                                <div>
                                                    <p className="font-bold">กรุณากรอกข้อมูลบริษัท</p>
                                                    <p className="text-sm">ตรวจสอบให้แน่ใจว่าท่านได้กรอกข้อมูลบริษัทครบท้วนแล้ว.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {pathname === "/company" ? (<>{children}</>) : (<></>)}
                                    </>
                                ) : (
                                    <>
                                        {children}
                                    </>
                                )}

                            </div>
                        </div>
                    </Sidebar>
                )}

            </div>
        </LoggedIn>

    )
}
