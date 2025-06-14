import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Index from "./pages/Index";
import QRGenerator from "./pages/QRGenerator";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import DemoProfile from "./pages/DemoProfile";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Feedback from "@/pages/Feedback";


// Shared Layout and Auth
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            {/* 🔓 Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/demo" element={<DemoProfile />} />

            {/* ✅ Protected Layout Pages with Navbar */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/home" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/generate" element={<QRGenerator />} />
              <Route path="/user/:userId" element={<UserProfile />} />
            </Route>

            {/* ❌ 404 Fallback */}
            <Route path="*" element={<NotFound />} />
<<<<<<< HEAD

// inside <Routes>
<Route path="/feedback" element={<Feedback />} />

=======
>>>>>>> 8528bf5 (✨ Added Navbar with Logout/Profile, fixed DemoProfile page)
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
