"use client"

import React, { useEffect } from 'react'

type PageProps = {
  role: string,
  children: React.ReactNode,
}

import { AppUseSelector } from '@/store/Reducer';
import { useRouter } from 'next/navigation'

export default function LoggedIn({ role, children }: PageProps) {
  const router = useRouter()
  const data = AppUseSelector((state) => state.member);

  useEffect(() => {
    if (!data.isLoggedIn) {
      router.push("/")
    }
  }, [data.isLoggedIn, router])

  return data.isLoggedIn && data.data.role === role ? (
    <div>
      {children}
    </div >
  ) : (<></>)
}
