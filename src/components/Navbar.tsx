import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // ensure this exists
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/home")}>
        QRx Health
      </h1>
      {user ? (
        <div className="flex gap-4 items-center">
          <Link to="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
          <Link to="/edit-profile">
            <Button variant="outline">Edit Profile</Button>
          </Link>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Signup</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
