import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  QrCode,
  User,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navLinks = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    { name: "Generate", path: "/generate", icon: <QrCode size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Feedback", path: "/feedback", icon: <MessageCircle size={20} /> },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 ease-in-out min-h-screen bg-white shadow-md border-r border-gray-200 p-4 hidden sm:flex flex-col justify-between`}
    >
      {/* Top section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h2 className="text-xl font-bold text-red-600 whitespace-nowrap">
              🩺 Quick Health
            </h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-red-500 transition"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-red-100 text-red-600 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    isActive ? "bg-red-600 text-white" : "text-red-600 group-hover:bg-red-200"
                  }`}
                >
                  {link.icon}
                </div>
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer section */}
      {!collapsed && (
        <p className="text-xs text-gray-400 text-center mt-10">
          &copy; 2025 Quick Health
        </p>
      )}
    </aside>
  );
};

export default Sidebar;
