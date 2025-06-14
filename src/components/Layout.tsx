import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // 🧭 Import Sidebar component

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* 🔹 Sidebar for navigation */}
      <Sidebar />

      {/* 🔹 Right side: Topbar + Main content */}
      <div className="flex flex-col flex-1">
        {/* Optional top navbar/header */}
        <header className="p-4 border-b border-border flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        {/* 🔹 Main content rendered via React Router's <Outlet /> */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
