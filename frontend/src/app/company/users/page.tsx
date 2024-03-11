import React, { useState, Suspense } from 'react'

import { Loading } from './suspense'
let Suspenx = React.lazy(() => import("./suspense"))
export default function page() {


    return (
        <div>
            <p className='text-[25px]  font-semibold'>คนที่สมัครงาน</p>
            <div className="bg-white mt-4 rounded-lg p-5 py-9">
                {/* <div className="grid grid-cols-12 gap-7">
                    <div className="col-span-6">
                        <button onClick={() => setTab(false)} className="w-full text-center transition-all duration-300 bg-[#2255A4] hover:opacity-[0.8] cursor-pointer py-2 rounded-lg px-3 text-white">คนที่สมัครแบบด่วน</button>
                    </div>
                    <div className="col-span-6">
                        <button onClick={() => setTab(true)} className="w-full text-center transition-all duration-300 bg-[#2255A4] hover:opacity-[0.8] cursor-pointer py-2 rounded-lg px-3 text-white">คนที่สมัครแบบไฟล์</button>
                    </div>
                </div> */}

                <div className="mt-4">
                    <Suspense fallback={<Loading />}>
                        <>
                            <Suspenx />
                        </>
                    </Suspense>
                </div>
            </div>


        </div>
    )
}
