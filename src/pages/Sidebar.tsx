import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Generate", path: "/generate", icon: "🔍" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Edit Profile", path: "/edit-profile", icon: "✏️" },
    { name: "Feedback", path: "/feedback", icon: "💬" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border p-4 hidden sm:block">
      <h2 className="text-xl font-bold mb-6">Quick Health</h2>
      <nav className="space-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center px-4 py-2 rounded hover:bg-sidebar-accent transition ${
              pathname === link.path
                ? "bg-sidebar-accent font-semibold"
                : "text-sidebar-foreground"
            }`}
          >
            <span className="mr-2">{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
