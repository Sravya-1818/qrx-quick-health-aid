import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        onClick={() => navigate("/home")}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        QRx Health
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <Link to="/profile">
              <Button
                variant={isActive("/profile") ? "default" : "outline"}
              >
                Profile
              </Button>
            </Link>
            <Link to="/edit-profile">
              <Button
                variant={isActive("/edit-profile") ? "default" : "outline"}
              >
                Edit Profile
              </Button>
            </Link>
            <span className="text-sm text-gray-600">
              {user.displayName || user.email}
            </span>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant={isActive("/login") ? "default" : "outline"}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant={isActive("/signup") ? "default" : "outline"}>
                Signup
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <button
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col px-6 py-4 md:hidden z-50">
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-2" variant={isActive("/profile") ? "default" : "outline"}>
                  Profile
                </Button>
              </Link>
              <Link to="/edit-profile" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-2" variant={isActive("/edit-profile") ? "default" : "outline"}>
                  Edit Profile
                </Button>
              </Link>
              <span className="text-sm text-gray-600 mb-2 text-center">
                {user.displayName || user.email}
              </span>
              <Button className="w-full" variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-2" variant={isActive("/login") ? "default" : "outline"}>
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" variant={isActive("/signup") ? "default" : "outline"}>
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
