import React, { Suspense } from 'react'
import { Loading } from './suspense'
let Server = React.lazy(() => import("./suspense"))

export default function page() {
    return (
        <div>
            <div className='p-6'>
                <Suspense fallback={<Loading />}>
                    <Server />
                </Suspense>
            </div>
        </div>
    )
}
