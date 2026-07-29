import { Navbar } from '@/components/shared/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getMe } from '@/services/getMe'
import React from 'react'
// import DashboardSidebar from './_components/DashBoardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await getMe()
    return (
        <div>
            <Navbar user={user} />
            <SidebarProvider>
                <div className="flex flex-1">
                    {/* <DashboardSidebar user={user} /> */}
                    <main className="flex-1 min-w-0">{children}</main>
                </div>
            </SidebarProvider>
        </div>
    )
}