// inside any component (e.g. Navbar.tsx)
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

const handleLogout = async () => {
  await signOut(auth);
  navigate("/"); // goes back to Landing
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
