import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-purple-100 border">
      {/* Sidebar */}
      <div className="w-[257px] mx-auto">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-auto lg:ml-64">
        {/* Navbar with sidebar toggle handler */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 p-4 bg-purple-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
