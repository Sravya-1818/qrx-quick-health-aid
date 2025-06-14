import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout"; // Reusable layout wrapper

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
          👋 Welcome to QRx Dashboard
        </h1>
        <p className="text-gray-600 max-w-md">
          Manage your emergency health QR cards and profile with ease.
        </p>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
