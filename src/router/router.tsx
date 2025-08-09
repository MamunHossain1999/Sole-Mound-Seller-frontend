import DashboardStats from "@/components/dashboard/DashboardStats";
import CategoryManagement from "@/features/categoryManagement/CategoryManagement";
import ConversationsDashboard from "@/features/ConversationsDashboard/ConversationsDashboard";
import CustomarDetailsPage from "@/features/customarManagement/CustomarDetailsPage";
import CustomarManagement from "@/features/customarManagement/CustomarManagement";
import EarningsDashboard from "@/features/earnings/EarningsDashboard";
import OrderDashboard from "@/features/orders/pages/OrderDashboard";
import OrderDetails from "@/features/orders/pages/OrderDetails";
import OrderDetailsPage from "@/features/orders/pages/OrderDetailsPage";
import ProductForm from "@/features/Products/ProductForm/ProductForm";
import ProductPage from "@/features/Products/ProductPage/ProductPage";
import ProductsListPage from "@/features/Products/ProductsListPage/ProductsListPage";
import ProfileSettings from "@/features/ProfileSettings/ProfileSettings";
import ProductDetails from "@/features/ReviewTable/ProductDetails";
import ReviewTable from "@/features/ReviewTable/ReviewTable";
import StoreSettings from "@/features/StoreSettings/StoreSettings";
import SupportFAQ from "@/features/SupportFAQ/SupportFAQ";
import TransactionDashboard from "@/features/TransactionDashboard/TransactionDashboard";
import Dashboard from "@/layouts/dashboard/Dashboard";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <DashboardStats /> },
      { path: "/orders", element: <OrderDashboard /> },
      { path: "/orders-list", element: <OrderDetailsPage /> },
      { path: "/orders-details", element: <OrderDetails /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/products-list", element: <ProductsListPage/> },
      { path: "/products-form", element: <ProductForm/> },
      { path: "/transactions", element: <TransactionDashboard/> },
      { path: "/customers", element: <CustomarManagement/> },
      { path: "/customers-details-page", element: <CustomarDetailsPage/> },
      { path: "/categories", element: <CategoryManagement /> },
      { path: "/earnings", element: <EarningsDashboard /> },
      { path: "/conversations", element: <ConversationsDashboard/> },
      { path: "/store-settings", element: <StoreSettings/> },
      { path: "/profile-settings", element: <ProfileSettings/> },
      { path: "/review-table", element: <ReviewTable/> },
      { path: "/product-details", element: <ProductDetails/> },
      { path: "/support", element: < SupportFAQ/> },
    ],
  },
]);

export default router;
