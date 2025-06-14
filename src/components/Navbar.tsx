import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center relative z-50">
      {/* Logo */}
      <div
        onClick={() => navigate("/home")}
        className="text-2xl font-bold text-blue-700 cursor-pointer"
      >
        QRx Health
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/profile">
              <Button
                variant={isActive("/profile") ? "default" : "ghost"}
              >
                My Profile
              </Button>
            </Link>
            <Link to="/edit-profile">
              <Button
                variant={isActive("/edit-profile") ? "default" : "ghost"}
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
              <Button variant={isActive("/login") ? "default" : "ghost"}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant={isActive("/signup") ? "default" : "ghost"}>
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t shadow-md flex flex-col px-6 py-4 md:hidden animate-slideDown">
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-2" variant={isActive("/profile") ? "default" : "ghost"}>
                  My Profile
                </Button>
              </Link>
              <Link to="/edit-profile" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full mb-2" variant={isActive("/edit-profile") ? "default" : "ghost"}>
                  Edit Profile
                </Button>
              </Link>
              <span className="text-sm text-gray-600 text-center mb-2">
                {user.displayName || user.email}
              </span>
              <Button className="w-full" variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full mb-2" variant={isActive("/login") ? "default" : "ghost"}>
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" variant={isActive("/signup") ? "default" : "ghost"}>
                  Sign Up
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

