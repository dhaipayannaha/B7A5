"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";

// const navItems = [
//   {
//     label: "My Posts",
//     href: "/dashboard/my-posts",
//     icon: Podcast,
//   },
//   {
//     label: "My Profile",
//     href: "/dashboard/my-profile",
//     icon: Podcast,
//   },
// ];

export default function DashboardSidebar({ user }: NavbarProps) {
    const pathname = usePathname();

    // const navItems = sidebarMenuItems.USER;

    let navItems: ISidebarItem[] = [];

    if (user.data.profile.role === "CUSTOMER") {
        navItems = sidebarMenuItems.CUSTOMER
    } else if (user.data.profile.role === "PROVIDER") {
        navItems = sidebarMenuItems.PROVIDER;
    } else if (user.data.profile.role === "ADMIN") {
        navItems = sidebarMenuItems.ADMIN;
    }

    return (
        <Sidebar
            collapsible="none"
            className="h-[calc(100svh-0rem)] border-r border-[#041334]/20 bg-[#041334] text-white"
        >
            <SidebarContent className="bg-[#041334] pt-4">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            render={<Link href={item.href} />}
                                            isActive={isActive}
                                            className={`transition-all duration-300 ease-in-out transform hover:translate-x-1 ${
                                                isActive 
                                                ? "bg-[#92a417] text-white hover:bg-[#92a417]/90 font-medium shadow-md" 
                                                : "text-white/80 hover:bg-[#041334]/50 hover:text-white"
                                            }`}
                                        >
                                            <item.icon className={isActive ? "text-white" : "text-white/80"} />
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}