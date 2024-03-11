"use client"

import React, { useState } from 'react'
import Logo from '../assets/image.png'
import Image from 'next/image';
import { BiBuildings, BiSolidUser } from "react-icons/bi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { RiDashboardFill } from "react-icons/ri";
import { BsCardChecklist } from "react-icons/bs";

import { MdAnnouncement } from "react-icons/md";
import { usePathname } from 'next/navigation';

import Link from 'next/link'

type PageProps = {
    children: React.ReactNode,
}

type sidebarList = {
    name: string,
    link: string,
    icon: any
}

import toast from 'react-hot-toast';
import { AppDispatch } from '@/store/Reducer';
import { useDispatch } from 'react-redux';
import { LogoutMe } from '@/store/membersSlice';

import { useRouter } from 'next/navigation'

export default function SideBar({ children }: PageProps) {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    const Logout = () => {
        dispatch(LogoutMe())
        router.push("/")
        toast.success("ออกจากระบบเรียบร้อย")
    }

    const pathname = usePathname();

    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [sidebarlist, setSidebarlist] = useState<sidebarList[]>(
        [
            { name: "แดชบอร์ด", link: "/admin", icon: <RiDashboardFill className="text-[24px]" /> },
            { name: "ประกาศงาน", link: "/admin/news", icon: <MdAnnouncement className="text-[24px]" /> },
            { name: "ยูสเซอร์หางาน", link: "/admin/jobseeker", icon: <BiSolidUser className="text-[24px]" /> },
            { name: "ยูสเซอร์บริษัท", link: "/admin/company", icon: <BiSolidUser className="text-[24px]" /> },
            { name: "คำร้องที่ส่งมา", link: "/admin/ticket", icon: <BsCardChecklist className="text-[24px]" /> },
            { name: "ตรวจสอบโพสต์", link: "/admin/recruitment", icon: <BsCardChecklist className="text-[24px]" /> },
        ]
    )

    return (
        <div>

            <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="fixed right-2 inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden bg-gray-100 border  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>

                <HiMiniBars3BottomLeft className="w-6 h-6 " />
            </button>

            <aside id="default-sidebar" className={`fixed p-4 top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${isSidebarOpen ? 'translate-x-0' : ''} `}>
                <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg relative">
                    <button onClick={() => Logout()} className='absolute bg-[#F82E2E] font-bold text-white rounded-lg px-4 py-3  bottom-0 right-0 left-0'>ออกจากระบบ</button>

                    <div className="flex items-end justify-center" >
                        <Image
                            src={Logo}
                            alt=""
                            width={50}
                            height={50}
                        >
                        </Image>
                        <p className="ml-3 text-[#2255A4] text-[25px] font-bold text-center">FindJob</p>
                    </div>
                    <ul className="space-y-2 mt-16 font-medium">
                        {sidebarlist.map((item, index) => (
                            <Link href={item.link} className='' key={index}>
                                <li key={index} className={`mt-2 py-3 hover:bg-[#CEE8FF] hover:text-[#1B5BC2] rounded-lg ${pathname === item.link ? 'bg-[#CEE8FF] text-[#1B5BC2] ' : 'text-[#999999]'}`}>
                                    <div className="flex items-start justify-center text-[16px]">
                                        {item.icon}
                                        <p className='ml-3 font-medium'>
                                            {item.name}
                                        </p>
                                    </div>
                                </li>
                            </Link>

                        ))}

                    </ul>

                </div>

            </aside>

            <div className="p-4 sm:ml-64">
                {children}

            </div>



        </div >
    )
}
