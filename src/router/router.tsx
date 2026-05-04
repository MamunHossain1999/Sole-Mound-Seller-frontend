import BannerPage from "@/components/bannerCreatePage/BannerPage";
import CreateBannerPage from "@/components/bannerCreatePage/CreateBannerPage";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CategoryDetails from "@/features/categoryManagement/CategoryDetails";
import CategoryManagement from "@/features/categoryManagement/CategoryManagement";
import ConversationsDashboard from "@/features/ConversationsDashboard/ConversationsDashboard";
import CustomarDetailsPage from "@/features/customarManagement/CustomarDetailsPage";
import CustomarManagement from "@/features/customarManagement/CustomarManagement";
import EarningsDashboard from "@/features/earnings/EarningsDashboard";
import OrderDashboard from "@/features/orders/pages/OrderDashboard";
import OrderDetailsPage from "@/features/orders/pages/OrderDetailsPage ";
import OrderListPage from "@/features/orders/pages/OrderListPage";
import ProductForm from "@/features/Products/ProductForm/ProductForm";
import ProductDetail from "@/features/Products/ProductPage/ProductDetail";
import ProductsListPage from "@/features/Products/ProductsListPage/ProductsListPage";
import ProductUpdatePage from "@/features/Products/updateProduct/ProductUpdatePage";
import ProfileSettings from "@/features/ProfileSettings/ProfileSettings";
import ReviewTable from "@/features/ReviewTable/ReviewTable";
import StoreSettings from "@/features/StoreSettings/StoreSettings";
import SupportFAQ from "@/features/SupportFAQ/SupportFAQ";
import TransactionDashboard from "@/features/TransactionDashboard/TransactionDashboard";
import TransactionDetails from "@/features/TransactionDashboard/TransactionDetails";
import Dashboard from "@/layouts/dashboard/Dashboard";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "/", element: <DashboardStats /> },
      { path: "/orders", element: <OrderDashboard /> },
      { path: "/orders-list", element: <OrderListPage /> },
      { path: "/orders-details-page/:id", element: <OrderDetailsPage /> },
      { path: "/products-list", element: <ProductsListPage /> },
      { path: "/product-details/:id", element: <ProductDetail /> },
      { path: "/products-form", element: <ProductForm /> },
      { path: "/products-update/:id", element: <ProductUpdatePage /> },
      { path: "/transactions", element: <TransactionDashboard /> },
      { path: "/customers", element: <CustomarManagement /> },
      { path: "/customers-details-page/:id", element: <CustomarDetailsPage /> },
      { path: "/categories", element: <CategoryManagement /> },
      { path: "/category/:name", element: <CategoryDetails /> },
      { path: "/earnings", element: <EarningsDashboard /> },
      { path: "/conversations", element: <ConversationsDashboard /> },
      { path: "/transaction-details-page/:id", element: <TransactionDetails/>},
      { path: "/store-settings", element: <StoreSettings /> },
      { path: "/profile-settings", element: <ProfileSettings /> },
      { path: "/review-table", element: <ReviewTable /> },
      { path: "/support", element: <SupportFAQ /> },
      { path: "/banner-create", element: <CreateBannerPage /> },
      { path: "/banner-page", element: <BannerPage /> },
    ],
  },
]);

export default router;
