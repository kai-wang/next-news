'use client'
import { ThemeProvider } from 'next-themes'
import React from 'react'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true}>{children}</ThemeProvider>
  )
}

export default Providers