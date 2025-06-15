import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense, lazy } from "react";
import PrintStore from '@/pages/printstore';



// Lazy-load Pages
const Landing = lazy(() => import("@/pages/Landing"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const DemoProfile = lazy(() => import("@/pages/DemoProfile"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Index = lazy(() => import("@/pages/Index"));
const QRGenerator = lazy(() => import("@/pages/QRGenerator"));
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const Profile = lazy(() => import("@/pages/Profile"));
const EditProfile = lazy(() => import("@/pages/EditProfile"));

// Non-lazy Components
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/demo" element={<DemoProfile />} />
                <Route path="/feedback" element={<Feedback />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route path="/home" element={<Index />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/generate" element={<QRGenerator />} />
                  <Route path="/user/:userId" element={<UserProfile />} />
                </Route>

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
                // Inside your Routes
<Route path="/printstore" element={<PrintStore />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
