// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext"; // ✅ Make sure this path is correct

// Pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import DemoProfile from "@/pages/DemoProfile";
import Feedback from "@/pages/Feedback";
import NotFound from "@/pages/NotFound";

// Protected Pages
import Index from "@/pages/Index";
import QRGenerator from "@/pages/QRGenerator";
import UserProfile from "@/pages/UserProfile";
import Profile from "@/pages/Profile";
import EditProfile from "@/pages/EditProfile";

// Layout & Auth
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider> {/* ✅ FIX: Wrap everything inside AuthProvider */}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/demo" element={<DemoProfile />} />
              <Route path="/feedback" element={<Feedback />} />

              {/* Protected Routes under layout */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/home" element={<Index />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/generate" element={<QRGenerator />} />
                <Route path="/user/:userId" element={<UserProfile />} />
              </Route>

              {/* Catch-all Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
