"use client"

import { createSlice } from '@reduxjs/toolkit';
import fetchWithToken from '@/utils/fetchUtils';
import { removeTokenFromCookie } from '@/utils/cookieUtils';
export interface CounterState {
    data: object,
    isLoggedIn: boolean
}

const initialState: CounterState = {
    data: {},
    isLoggedIn: false
}

export const counterSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        increment: (state, action) => {
            if (action.payload.id) {
                state.isLoggedIn = true
                state.data = action.payload
            }
        },
        setInitialData: (state, action) => {
            if (action.payload.test.id) {
                state.isLoggedIn = true
                state.data = action.payload.test
            }
        },
        logout: (state) => {
            console.log("logout");
            
            state.isLoggedIn = false
            state.data = {}
        }
    }
})

export const { increment, setInitialData, logout } = counterSlice.actions;

export const fetchDataMe = () => {
    return async (dispatch: any) => {
        const response = await fetchWithToken("/auth/me", { method: "GET" }, 0)
        if (await response.ok) {
            dispatch(increment(await response.json()));
            return;
        } else {
            dispatch(increment({}));
            return;
        }
    };
};


export const LogoutMe = () => {
    return async (dispatch: any) => {
        removeTokenFromCookie()
        dispatch(logout());
    };
};

export default counterSlice.reducer;