import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
