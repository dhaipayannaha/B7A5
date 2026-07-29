import { ReactNode } from "react";

type EquipmentCondition = "GOOD" | "NEW" | "FAIR" | "POOR"; // adjust based on your actual enum values
type EquipmentStatus = "AVAILABLE" | "UNAVAILABLE" | "RENTED" | "MAINTENANCE"; // adjust based on your actual enum values
type UserRole = "PROVIDER" | "CUSTOMER" | "ADMIN"; // adjust based on your actual enum values
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED"; // adjust based on your actual enum values

interface Provider {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string; // ISO date string; use `Date` if you parse it
    updatedAt: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface Equipment {
    author: any;
    content: ReactNode;
    comments: any;
    _count: any;
    id: string;
    title: string;
    description: string;
    brand: string;
    model: string;
    dailyRate: number;
    quantity: number;
    availableQuantity: number;
    images: string[];
    condition: EquipmentCondition;
    status: EquipmentStatus;
    providerId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    provider: Provider;
    category: Category;
}