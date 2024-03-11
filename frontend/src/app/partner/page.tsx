import React, { Suspense } from 'react'
import { Loading } from './suspense'
let Server = React.lazy(() => import('./suspense'))

export default function page() {
    return (
        <div className="container mx-auto md:px-20 mt-12  ">
            <Suspense fallback={<Loading />}>
                <Server />
            </Suspense>
        </div>
    )
}
