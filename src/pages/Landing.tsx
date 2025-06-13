// src/pages/Landing.tsx
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 text-center p-6">
      <h1 className="text-3xl font-bold">Welcome to QRx 🩺</h1>
      <p className="text-muted-foreground text-lg">Your Quick Health Access Solution</p>
      <div className="space-x-4">
        <Link to="/login">
          <Button>🔐 Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="outline">📝 Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
