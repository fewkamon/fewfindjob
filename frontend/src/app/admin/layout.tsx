"use client"
import React from 'react'
import Sidebar from '@/components/sidebaradmin'

import Image from 'next/image'
import { AppUseSelector, AppDispatch } from '@/store/Reducer';
import LoggedIn from '@/components/layouts/LoggedIn';

type PageProps = {
    children: React.ReactNode,
}
export default function layout({ children }: PageProps) {
    const data = AppUseSelector((state) => state.member);


    return (
        <LoggedIn role="ADMIN">
            <div>
                <Sidebar>
                    <div className="container mx-auto md:pr-5">

                        <div className="bg-white rounded-lg px-5 py-3 flex items-center">

                        </div>

                        <div className="mt-7 ">
                            {children}
                        </div>
                    </div>
                </Sidebar>
            </div>
        </LoggedIn>

    )
}
