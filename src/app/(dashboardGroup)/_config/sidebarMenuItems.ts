import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, FileText, User, Settings, Users, Podcast } from "lucide-react";

export const sidebarMenuItems: Record<string, ISidebarItem[]> = {
    CUSTOMER: [
        {
            label: "My Profile",
            href: "/dashboard/my-profile",
            icon: User,
        },
        {
            label: "Settings",
            href: "/dashboard/settings",
            icon: Settings,
        },
    ],
    PROVIDER: [
        {
            label: "Dashboard",
            href: "/dashboard/provider",
            icon: LayoutDashboard,
        },
        {
            label: "My Gear",
            href: "/dashboard/provider/gear",
            icon: FileText,
        },
        {
            label: "My Orders",
            href: "/dashboard/provider/orders",
            icon: FileText,
        },
        {
            label: "My Profile",
            href: "/dashboard/provider/my-profile",
            icon: User,
        },
    ],
    ADMIN: [
        {
            label: "Dashboard",
            href: "/dashboard/admin",
            icon: LayoutDashboard,
        },
        {
            label: "All Users",
            href: "/dashboard/admin/users",
            icon: Users,
        },
        {
            label: "All Gear",
            href: "/dashboard/admin/gear",
            icon: FileText,
        },
        {
            label: "All Rented",
            href: "/dashboard/admin/rented",
            icon: Users,
        },
    ],
};