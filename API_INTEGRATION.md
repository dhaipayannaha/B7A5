# API Integration & Documentation

This document maps the Next.js frontend Server Actions and Services to the backend API endpoints they consume. It verifies that all required backend endpoints are successfully integrated into the frontend application.

## 1. Authentication & User Profile
These endpoints handle user sessions, registration, and profile retrieval.

| Backend Endpoint | Frontend Service / Action | Description |
| :--- | :--- | :--- |
| `POST /api/auth/login` | `src/app/(authgroup)/_actions/authAction.ts` | Authenticates the user and sets cookies. |
| `POST /api/user/register` | `src/app/(authgroup)/_actions/registationAction.ts` | Registers a new user account. |
| `POST /api/auth/refresh-token` | `src/services/refreshToken.ts` | Silently refreshes the access token when expired. |
| `GET /api/user/me` | `src/services/getMe.ts` | Fetches the current authenticated user's profile. |

## 2. Public Gear & Browsing
These endpoints power the public-facing gear catalog, search, and detail pages.

| Backend Endpoint | Frontend Service / Action | Description |
| :--- | :--- | :--- |
| `GET /api/gear` | `src/app/(publicGroup)/_actions/getGear.ts` | Fetches the gear catalog with search/filter queries. |
| `GET /api/gear/:id` | `src/app/(publicGroup)/_actions/getGearById.ts` | Fetches comprehensive details for a specific gear item. |

## 3. Customer Actions (Rentals, Reviews, Payments)
These endpoints manage the checkout flow, order tracking, and post-rental interactions.

| Backend Endpoint | Frontend Service / Action | Description |
| :--- | :--- | :--- |
| `POST /api/rentals` | `src/app/(publicGroup)/_actions/handlePayment.ts` | Creates a new rental order. |
| `POST /api/payments/create` | `src/app/(publicGroup)/_actions/handlePayment.ts`<br>`src/app/(dashboardGroup)/_actions/payment.ts` | Initiates a Stripe/SSLCommerz payment session. |
| `POST /api/payments/confirm` | `src/app/(publicGroup)/_actions/confirmPayment.ts` | Verifies and confirms a completed payment. |
| `GET /api/rentals/me` | `src/app/(dashboardGroup)/_actions/getMyRentals.ts` | Fetches the customer's personal rental history. |
| `POST /api/reviews` | `src/app/(dashboardGroup)/_actions/submitReviewAction.ts` | Submits a star rating and comment for returned gear. |

## 4. Provider Dashboard (Inventory & Orders)
These endpoints allow providers to manage their specific gear inventory and incoming customer orders.

| Backend Endpoint | Frontend Service / Action | Description |
| :--- | :--- | :--- |
| `GET /api/provider/gear` | `src/app/(dashboardGroup)/_actions/myPostAction.ts` | Retrieves all gear listed by the current provider. |
| `POST /api/provider/gear` | `src/app/(dashboardGroup)/_actions/myPostAction.ts` | Creates a new gear listing. |
| `PUT /api/provider/gear/:id` | `src/app/(dashboardGroup)/_actions/myPostAction.ts` | Edits an existing gear listing. |
| `DELETE /api/provider/gear/:id` | `src/app/(dashboardGroup)/_actions/myPostAction.ts` | Removes a gear listing from the platform. |
| `GET /api/provider/orders` | `src/app/(dashboardGroup)/_actions/providerOrders.ts` | Fetches all incoming rental orders for the provider. |
| `PUT /api/provider/orders/:id` | `src/app/(dashboardGroup)/dashboard/provider/_actions/updateOrderStatus.ts` | Updates an order status (e.g., Confirmed, Picked Up). |

## 5. Admin Dashboard (Global Moderation)
These endpoints give administrators full oversight over users, platform-wide rentals, and global gear listings.

| Backend Endpoint | Frontend Service / Action | Description |
| :--- | :--- | :--- |
| `GET /api/admin/users` | `src/app/(dashboardGroup)/dashboard/admin/_actions/getAllUsers.ts` | Fetches all users registered on the platform. |
| `PUT /api/admin/users/:id` | `src/app/(dashboardGroup)/dashboard/admin/_actions/UpdateUserStatus.ts` | Suspends or activates a user account. |
| `PUT /api/admin/users/:id/role` | `src/app/(dashboardGroup)/dashboard/admin/_actions/updateUser.ts` | Promotes/demotes a user's role (e.g., to Provider). |
| `GET /api/admin/rentals` | `src/app/(dashboardGroup)/dashboard/admin/_actions/getAllRentals.ts` | Fetches every rental order across the entire platform. |
| `PUT /api/admin/rentals/:id` | `src/app/(dashboardGroup)/dashboard/admin/_actions/updateRentalStatus.ts` | Moderates/overrides a rental order status. |
| `GET /api/gear` | `src/app/(dashboardGroup)/dashboard/admin/_actions/getAllGear.ts` | Fetches all platform gear for the admin overview. |
| `PUT /api/gear/:id` | `src/app/(dashboardGroup)/dashboard/admin/_actions/updateGearAvailability.ts` | Moderates/removes inappropriate gear listings. |

---

> [!NOTE]
> All endpoints are successfully integrated and are being called from within Next.js Server Actions using the `process.env.BACKEND_API_URL` environment variable for seamless deployment portability.
