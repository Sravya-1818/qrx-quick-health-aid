// Dashboard.tsx
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";  // ✅ Correct
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // 👈 Will redirect to landing, which checks auth
  };

  return (
    <div>
      <h1>Welcome to QRx Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
