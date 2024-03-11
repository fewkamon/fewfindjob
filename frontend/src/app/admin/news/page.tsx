import React, { FormEvent, lazy, useEffect, useState } from 'react'

import { Suspense } from 'react'
import Fallback from './loading';
let Server = lazy(() => import("./server"));
let Add = lazy(() => import("./add"));

export default function Page() {

    return (
        <div>
            <Suspense fallback={<Fallback />}>
                <Add />
            </Suspense>


            <Suspense fallback={<Fallback />}>
                <div className="bg-white mt-4 rounded-lg p-5 py-9">
                    <Server />
                </div>
            </Suspense>

        </div >
    )
}
