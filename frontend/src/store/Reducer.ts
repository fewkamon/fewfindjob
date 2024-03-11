'use client';

import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './membersSlice';
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store:any = configureStore({
  reducer: {
    member: memberReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const AppUseSelector: TypedUseSelectorHook<RootState> = useSelector