"use client"
import Navbar from "@/components/navbar"
import React, { useEffect } from 'react'

type PageProps = {
  children: React.ReactNode,
}

export default function RootLayout({
  children,
}: PageProps) {

  return (
      <main>
        <Navbar />
        {children}
      </main>
  )
}
