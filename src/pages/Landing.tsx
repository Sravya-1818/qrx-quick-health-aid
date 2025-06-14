// src/pages/Landing.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button"; // optional if you're using shadcn
import { FcGoogle } from "react-icons/fc"; // optional icon

const Landing = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/home");
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google sign-in failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">Welcome to QRx</h1>
        <p className="text-center text-gray-500 mb-6">
          Your quick health info in a QR code
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => navigate(isLoginMode ? "/login" : "/signup")}
            className="w-full"
          >
            {isLoginMode ? "Login with Email" : "Sign Up with Email"}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>
        </div>

        <p className="text-sm text-center mt-6 text-gray-600">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isLoginMode ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Landing;
