'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/image.png'
import ImageFewtest from '../assets/imagefewtest.png'
import { AppUseSelector, AppDispatch } from '@/store/Reducer';
import { usePathname, useRouter } from 'next/navigation';
const BASE_URL = process.env.BACKEND_URL;
import { GoSignIn, GoPlusCircle, GoPlus } from "react-icons/go";

export default function NavBar() {
    const data = AppUseSelector((state) => state.member);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {

        if (data.isLoggedIn && data.data.role === "JOB_SEEKER" && !data.data.jobseeker.image) {
            if (!pathname.includes("steppers")) {
                router.push("/account/steppers/1")
            }
        }

    }, [data, router, pathname])

    const navbarlist = [
        {
            name: "หน้าแรก",
            link: "/"
        },
        {
            name: "หางาน",
            link: "/findjob"
        },

        {
            name: "บริษัทที่เข้าร่วม",
            link: "/partner"
        },

        {
            name: "เกี่ยวกับเรา",
            link: "/about"
        },
        {
            name: "ติดต่อเรา",
            link: "/contact"
        }
    ]

    return (data.isLoggedIn && data.data.role === "JOB_SEEKER" && !data.data.jobseeker.image) ? (<></>) : (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow print:hidden">
                <div className="max-w-screen-xl relative flex flex-wrap items-end mx-auto p-4">
                    <div className="flex items-end">
                        <Image
                            src={Logo}
                            alt="My Image"
                            width={40}
                            height={40}
                        />
                        <span className="text-2xl font-semibold leading-6 ml-3 text-[#2255A4] dark:text-white">FindJob</span>
                    </div>

                    <button onClick={toggleSidebar} data-collapse-toggle="navbar-default" type="button" className="absolute top-4 right-3 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isSidebarOpen ? '' : 'hidden'} mr-auto md:ml-9 w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium   flex flex-col p-4  md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {navbarlist.map((item, index) => (
                                <li key={index}>
                                    <Link href={item.link} className="block py-2 pl-3 pr-4 rounded font-normal md:text-[#5B6076] md:p-0 dark:text-white " aria-current="page">{item.name}</Link>
                                </li>
                            ))}

                            <li className='py-2'>
                                <Link href={"/account"} className="md:hidden py-2 pl-3 pr-4 rounded font-normal md:text-[#5B6076] md:p-0 dark:text-white " aria-current="page">บัญชีผู้ใช้</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={`${isSidebarOpen ? '' : 'hidden'} ml-auto w-full md:block md:w-auto`} id="navbar-default">


                        {
                            data.isLoggedIn ? (
                                <ul className="-mt-8">
                                    <li>

                                        <Link href={`${data.data.role === "COMPANY" ? "/company" : data.data.role === "JOB_SEEKER" ? "/account" : "/admin"}`}>


                                            {data.data.role === "JOB_SEEKER" ? (
                                                <>
                                                    <div className='md:block hidden'>
                                                        <Image src={
                                                            data.data.jobseeker.image ? `${BASE_URL}/file/${data.data.jobseeker.image}` : ImageFewtest
                                                        } className='object-cover w-[40px] h-[40px] rounded-full' width={40} height={40} alt="t" />
                                                    </div>

                                                </>
                                            ) : data.data.role === "COMPANY" ? (
                                                <>
                                                    <Image src={
                                                        data.data.company.image ? `${BASE_URL}/file/${data.data.company.image}` : ImageFewtest
                                                    } className='object-cover w-[40px] h-[40px] border rounded-full' width={40} height={40} alt="t" />
                                                </>
                                            ) : (
                                                <>
                                                    <Image src={
                                                        ImageFewtest
                                                    } className='object-cover w-[40px] h-[40px] border rounded-full' width={40} height={40} alt="t" />
                                                </>
                                            )}



                                        </Link>
                                    </li>

                                </ul>
                            ) : (
                                <div>
                                    <ul className="font-medium   flex md:flex-row justify-center p-4  md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 space-x-3 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                        <li>
                                            <Link href="/login">
                                                <button className="transition-all duration-300 text-[#2357A5] border-[#2357A5] hover:bg-[#2357A5] hover:text-white border border-1 py-1 px-4  rounded-md">
                                                    <div className="flex items-center">
                                                        <div className="mr-1">
                                                            <GoSignIn />
                                                        </div>
                                                        <div className="">เข้าสู่ระบบ</div>
                                                    </div>
                                                </button>
                                            </Link>
                                        </li>

                                        {/* <li>
                                            <Link href="/login">
                                                <button className="transition-all duration-300 text-[#2357A5] border-[#2357A5] hover:bg-[#2357A5] hover:text-white border py-1 px-4  rounded-md">
                                                    <div className="flex items-center">
                                                        <div className="mr-1">
                                                            <GoSignIn />
                                                        </div>
                                                        <div className="">เข้าสู่ระบบ</div>
                                                    </div>
                                                </button>
                                            </Link>
                                        </li> */}

                                        {/* <li>
                                            <Link href="/register">

                                                <button className="text-white border-[#2357A5] bg-[#2357A5] hover:bg-[#103d7f] border py-1 px-4 rounded-md">
                                                    <div className="flex items-center">
                                                        <div className="mr-1">
                                                            <GoPlus />
                                                        </div>
                                                        <div className="">สมัครสมาชิก</div>
                                                    </div>
                                                </button>
                                            </Link>
                                        </li> */}

                                    </ul>
                                </div>
                            )
                        }

                    </div>
                </div>
            </nav>
        </div>
    )
}
