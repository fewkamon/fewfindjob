import React, { Suspense } from 'react'

import { Loading } from './suspense'
let Server = React.lazy(() => import("./suspense"))

export default function page() {
    return (
        <div>
            <div className="bg-white mt-4 rounded-lg p-5 py-9">
                <Suspense fallback={<Loading />}>
                    <Server />
                </Suspense>
            </div>

        </div>
    )
}
