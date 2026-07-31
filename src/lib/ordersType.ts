type UserRole = "PROVIDER" | "CUSTOMER" | "ADMIN"; // add other roles as needed
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED"; // adjust based on your actual enum
type OrderStatus = "PLACED" | "CONFIRMED" | "CANCELLED" | "COMPLETED"; // adjust based on your actual enum
type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED"; // adjust based on your actual enum

interface Customer {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    image: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

interface OrderCount {
    reviews: number;
}

interface Order {
    id: string;
    customerId: string;
    gearItemId: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    customer: Customer;
    _count: OrderCount;
}

interface OrdersResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Order[];
}

export type { Order }