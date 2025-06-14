import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Index from "./pages/Index"; // 👈 QR Generator homepage after login
import QRGenerator from "./pages/QRGenerator";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import DemoProfile from "./pages/DemoProfile";
import Landing from "./pages/Landing"; // ✅ Properly imported
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>

            {/* ✅ Landing Page - checks login and redirects if already logged in */}
            <Route path="/" element={<Landing />} />

            {/* 🔓 Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/demo" element={<DemoProfile />} />

            {/* ✅ Homepage (QR Generator) after login */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />

            {/* 🔐 Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            {/* 📌 QR-related Extras */}
            <Route path="/generate" element={<QRGenerator />} />
            <Route path="/user/:userId" element={<UserProfile />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
