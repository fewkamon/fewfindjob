"use client"
import LoggedIn from "@/components/layouts/LoggedIn"
import Navbar from "@/components/navbar"
import React, { useEffect } from 'react'

type PageProps = {
  children: React.ReactNode,
}

export default function RootLayout({
  children,
}: PageProps) {

  return (
    <LoggedIn role="JOB_SEEKER">
      <main>
        <Navbar />
        {children}
      </main>
    </LoggedIn>
  )
}
