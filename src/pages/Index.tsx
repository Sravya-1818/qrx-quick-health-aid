// src/pages/Index.tsx
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, QrCode, Eye, LogOut } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-blue-50 to-green-100">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-900">Welcome to QRx 👋</h1>
        <p className="text-lg text-gray-700 mt-2">
          Your personal emergency health ID in a QR code.
        </p>
        <p className="text-md text-gray-600 mt-1">
          Logged in as <span className="font-medium text-black">{user?.email}</span>
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
        <Card
          onClick={() => navigate("/generate")}
          className="hover:shadow-xl transition cursor-pointer"
        >
          <CardHeader className="flex flex-row items-center gap-4">
            <QrCode className="text-blue-600" />
            <CardTitle>Generate QR Code</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create your emergency health card and get a downloadable QR.</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => navigate("/demo")}
          className="hover:shadow-xl transition cursor-pointer"
        >
          <CardHeader className="flex flex-row items-center gap-4">
            <Eye className="text-green-600" />
            <CardTitle>View Demo Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Preview a sample profile to see how your QR data appears.</p>
          </CardContent>
        </Card>

        <Card
          onClick={() => navigate("/profile")}
          className="hover:shadow-xl transition cursor-pointer"
        >
          <CardHeader className="flex flex-row items-center gap-4">
            <User className="text-purple-600" />
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View your account details and Firebase UID.</p>
          </CardContent>
        </Card>

                <Card
          onClick={handleLogout}
          className="hover:shadow-xl transition cursor-pointer border border-red-200 bg-red-50"
        >
          <CardHeader className="flex flex-row items-center gap-4">
            <LogOut className="text-red-600" />
            <CardTitle>Logout</CardTitle>
          </CardHeader>
          <CardContent>
            <p>End session and return to login screen.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
