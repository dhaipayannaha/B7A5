
import { Order } from "@/lib/ordersType";
import { PaymentStatusBadge } from "../_components/PaymentStatusBadge";
import { RentalStatusSelect } from "../_components/RentalStatusSelect";
import { getAllRentals } from "../_actions/adminRentals";
export default async function AdminRentalsPage() {
    const result = await getAllRentals();
    const rentals: Order[] = result.success ? result.data : [];

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-semibold">Rentals</h1>
                <p className="text-sm text-muted-foreground">
                    {rentals.length} rental{rentals.length !== 1 ? "s" : ""}
                </p>
            </div>

            {rentals.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">No rentals found</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr className="text-left">
                                <th className="p-3 font-medium">Customer</th>
                                <th className="p-3 font-medium">Dates</th>
                                <th className="p-3 font-medium">Amount</th>
                                <th className="p-3 font-medium">Payment</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Placed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rentals.map((rental) => (
                                <tr key={rental.id} className="border-b last:border-0">
                                    <td className="p-3">
                                        <div className="font-medium">{rental.customer.name}</div>
                                        <div className="text-xs text-muted-foreground">{rental.customer.email}</div>
                                    </td>
                                    <td className="p-3 text-muted-foreground">
                                        {new Date(rental.startDate).toLocaleDateString()} —{" "}
                                        {new Date(rental.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 font-medium">৳{rental.totalAmount}</td>
                                    <td className="p-3">
                                        <PaymentStatusBadge status={rental.paymentStatus} />
                                    </td>
                                    <td className="p-3">
                                        <RentalStatusSelect rentalId={rental.id} currentStatus={rental.status} />
                                    </td>
                                    <td className="p-3 text-muted-foreground">
                                        {new Date(rental.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}