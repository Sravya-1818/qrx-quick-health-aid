import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Persistent Navbar on all routes inside Layout */}
      <Navbar />

      {/* 🔹 Render the matched child route inside this layout */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
