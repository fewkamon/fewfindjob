'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/Reducer'
import { useRef } from "react";
import { setInitialData } from '@/store/membersSlice';

function XProvider({
    initialData,
    children,
}: {
    initialData: any;
    children: React.ReactNode;
}) {
    const loaded = useRef(false);
    if (!loaded.current) {
        store.dispatch(setInitialData(initialData));
        loaded.current = true;
    }
    return <Provider store={store}>{children}</Provider>;
}

export default XProvider;