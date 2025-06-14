// src/pages/Index.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Welcome to QRx, {user?.displayName || user?.email}!
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button onClick={() => navigate("/generate")} className="w-full">
          📌 Create QR Code
        </Button>

        <Button
          onClick={() => navigate("/demo")}
          variant="outline"
          className="w-full"
        >
          🎓 View Demo Profile
        </Button>

        <Button
          onClick={() => navigate("/profile")}
          variant="secondary"
          className="w-full"
        >
          🙍‍♂️ My Profile
        </Button>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full"
        >
          🚪 Logout
        </Button>
      </div>
    </div>
  );
};

export default Index;
