import React, { Suspense } from 'react'
import { Loading } from './suspense'
let Server = React.lazy(() => import('./suspense'))
export default function page({ params }: { params: { slug: string } }) {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Server id={params.slug.toString()} />
            </Suspense>

        </>
    )
}
