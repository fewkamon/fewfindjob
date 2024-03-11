import React, { FormEvent, lazy, useEffect, useState } from 'react'

import { Suspense } from 'react'
import { Loading } from './server'
let Server = lazy(() => import("./server"));

export default function Page() {

    return (
        <div>
            <p className='text-[25px]  font-semibold'>ตรวจสอบหางาน</p>
            <Suspense fallback={<Loading />}>
                <div className="bg-white mt-4 rounded-lg p-5 py-9">
                    <Server />
                </div>
            </Suspense>

        </div >
    )
}
