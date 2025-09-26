"use client"
import { SidebarInset } from '@/components/ui/sidebar'
import React from 'react'
import { AuthProvider } from './AuthProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from './components/app-sidebar'
import { SiteHeader } from './components/site-header'
import { usePathname } from 'next/navigation'

export default function LayoutWrapper({children}: {children: React.ReactNode}) {
    const hideSidebar = usePathname().startsWith("/login")
  return (
    <>
    
    {hideSidebar ? (
          children
        ) : (
          <AuthProvider>
            <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }>
              <AppSidebar variant="sidebar"/>
              <SidebarInset>
                <SiteHeader/>
              <main className="@container/main p-4">
                {children}
              </main>
              </SidebarInset>
            </SidebarProvider>
          </AuthProvider>
        )}</>
  )
}
