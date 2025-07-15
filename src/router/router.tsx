import DashboardStats from "@/components/dashboard/DashboardStats";
import OrderDashboard from "@/features/orders/pages/OrderDashboard";
import OrderDetailsPage from "@/features/orders/pages/OrderDetailsPage";
import Dashboard from "@/layouts/dashboard/Dashboard";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <DashboardStats /> },
      { path: "/orders", element: <OrderDashboard /> },
      { path: "/orders-details", element: <OrderDetailsPage /> },
    ],
  },
]);

export default router;
