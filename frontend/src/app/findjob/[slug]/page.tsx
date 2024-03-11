import React, { lazy } from 'react'
import { FaLocationDot, FaUserTag, FaMoneyBill } from "react-icons/fa6";
import { Suspense } from 'react'
import Fallback from './fallback';
let Server = lazy(() => import("./server"));

export default function page({ params }: { params: { slug: string } }) {
    return (
        <div>
            <Suspense fallback={<Fallback />}>
                <Server id={params.slug} />
            </Suspense>
        </div>
    )
}
