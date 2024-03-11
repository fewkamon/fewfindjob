import React, { lazy } from 'react'
import { FaLocationDot, FaUserTag, FaMoneyBill } from "react-icons/fa6";
import { Suspense } from 'react'

export default function page({ params }: { params: { slug: string } }) {
    return (
        <main className='mt-12'>
            <div className="container mx-auto md:px-20 mt-12 ">
                <div className="flex justify-center">
                    <div className="">

                        <p className='text-[21px] '>ส่งไฟล์ประวัติ</p>

                    </div>
                </div>
                {JSON.stringify(params)}
            </div>
        </main>
    )
}
