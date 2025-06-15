import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // 🧭 Import Sidebar

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar (toggle based on showSidebar or always show on sm+) */}
      <Sidebar visible={showSidebar} onClose={() => setShowSidebar(false)} />

      <div className="flex flex-col flex-1">
        {/* Topbar with 3-dot menu */}
        <header className="p-4 border-b border-border flex justify-between items-center">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <button
            onClick={() => setShowSidebar((prev) => !prev)}
            className="sm:hidden p-2 text-xl"
          >
            ⋮
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
