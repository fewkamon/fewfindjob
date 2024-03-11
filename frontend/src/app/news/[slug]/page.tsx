import React, { lazy } from 'react'
import { FaLocationDot, FaUserTag, FaMoneyBill } from "react-icons/fa6";
import { Suspense } from 'react'
import { Loading } from './suspense';
let Server = lazy(() => import("./suspense"));

export default function page({ params }: { params: { slug: string } }) {
    return (
        <div className="container mx-auto md:px-20 px-6 mt-12 ">
            <Suspense fallback={<Loading />}>
                <Server id={params.slug} />
            </Suspense>
        </div>
    )
}
