import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Generate", path: "/generate", icon: "🔍" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Feedback", path: "/feedback", icon: "💬" },
     { name: "Print Store", path: "/printstore" },
    
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 shadow-md hidden sm:block">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-3xl">💊</span>
        <h2 className="text-2xl font-extrabold text-red-600 tracking-wide">Quick Health</h2>
      </div>

      <nav className="space-y-3">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-red-100 text-red-700 font-semibold shadow-inner"
                  : "text-gray-700 hover:bg-gray-100 hover:text-red-600"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Quick Health
      </div>
    </aside>
  );
};

export default Sidebar;
