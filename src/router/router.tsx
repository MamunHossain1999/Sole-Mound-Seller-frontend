import DashboardStats from "@/components/dashboard/DashboardStats";
import Dashboard from "@/layouts/dashboard/Dashboard";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    children: [
        {path: '/', element: <DashboardStats/>}
    ],
  },
]);

export default router;