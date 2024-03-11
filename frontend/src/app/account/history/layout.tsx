"use client"
import LoggedIn from "@/components/layouts/LoggedIn"
import Navbar from "@/components/navbar"
import Link from "next/link"
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

type PageProps = {
    children: React.ReactNode,
}

export default function RootLayout({
    children,
}: PageProps) {

    const pathnamex = usePathname()

    return (
        <main>
            <div className="container mx-auto md:px-[8rem] mt-12  ">
                <div className="flex flex-col md:flex-row items-center justify-center print:hidden">
                    <Link href={"/account/history/recruit"}>
                        <div className={`bg-[#5581C3] text-center w-80 py-2 px-16 text-white ${pathnamex === "/account/history/recruit" ? 'underline' : ''}`}>งานที่สมัคร</div>
                    </Link>
                    <Link href={"/account/history/bookmark"}>
                        <div className={`bg-[#2357A5] text-center w-80 py-2 px-16 text-white ${pathnamex === "/account/history/bookmark" ? 'underline' : ''}`}>งานที่สนใจ</div>
                    </Link>
                </div>
                <div className="bg-white min-h-screen">
                    {children}
                </div>
            </div>
        </main>
    )
}
